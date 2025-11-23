import { NextFunction, Request, Response } from "express";
import { User } from "../models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import CloudinaryService from "../services/CloudinaryUpload";
import { v4 as uuid } from "uuid";
import environment from "../environment";
import {
  createUserSchema,
  loginSchema,
  updateUserSchema,
  diseaseSchema,
  userAppointmentSchema,
  userDocumentSchema,
} from "../validation/schemas";
import { AppError } from "../errors/AppError";

export const getAllUsers = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

export const getSingleUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      throw new AppError("User not found", 404);
    }
    return res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

const calculateUserAge = (date: string): number => {
  const today = new Date().getFullYear();
  const yearofB = new Date(date).getFullYear();
  return today - yearofB;
};

export const addUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const parsed = createUserSchema.safeParse(req.body);

    if (!parsed.success) {
      const details = parsed.error.flatten().fieldErrors;
      throw new AppError("Invalid user data", 400, details);
    }

    // one-time data migration:
    // map legacy `type` field to the new `role` field
    await User.updateMany(
      { role: { $exists: false }, type: "guest" },
      { $set: { role: "patient" } }
    );
    await User.updateMany(
      { role: { $exists: false }, type: "patient" },
      { $set: { role: "patient" } }
    );
    await User.updateMany(
      { role: { $exists: false }, type: "doctor" },
      { $set: { role: "doctor" } }
    );
    await User.updateMany(
      { role: { $exists: false }, type: "admin" },
      { $set: { role: "admin" } }
    );
    await User.updateMany(
      { userSettings: { $exists: false } },
      { $set: { userSettings: [] } }
    );

    const {
      name,
      email,
      password,
      phone,
      dateOfBirth,
      role,
      specialization = "",
      formattedAddress,
      gender,
    } = parsed.data;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new AppError("User already exists", 400);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      phone,
      dateOfBirth,
      role,
      specialization,
      age: calculateUserAge(dateOfBirth),
      formattedAddress,
      gender,
    });

    await newUser.save();

    return res.status(200).json(newUser);
  } catch (error) {
    next(error);
  }
};

export const authenticateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const parsed = loginSchema.safeParse(req.body);

    if (!parsed.success) {
      const details = parsed.error.flatten().fieldErrors;
      throw new AppError("Invalid credentials payload", 400, details);
    }

    const { mail, password } = parsed.data;

    const user = await User.findOne({ email: mail });
    if (!user) {
      throw new AppError("User not found", 401);
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new AppError("Invalid credentials", 401);
    }

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      environment.JWT_SECRET,
      { expiresIn: "1W" }
    );

    res.status(200).json({
      success: true,
      token,
      user,
    });
  } catch (error) {
    next(error);
  }
};

export const getPatients = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { page, pageSize } = req.query;
  const Npage = Number(page);
  const NpageSize = Number(pageSize);

  const skippedDocs = (Npage - 1) * NpageSize;

  try {
    const allPatientsCount = (await User.find({ role: "patient" })).length;

    const patients = await User.find({ role: "patient" })
      .skip(skippedDocs)
      .limit(NpageSize);

    res.status(200).json({ users: patients, totalPatients: allPatientsCount });
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const parsed = updateUserSchema.safeParse(req.body);

    if (!parsed.success) {
      throw new AppError("Invalid user data", 400, parsed.error.flatten());
    }

    const data = parsed.data;

    await User.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });

    const user = await User.findById(id);

    return res.status(200).json(user);
  } catch (error) {
    return next(error);
  }
};

export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    await User.findByIdAndDelete(id);

    const users = await User.find();

    return res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

export const updateUserAvatar = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.params.id;

    if (!req.file) {
      throw new AppError("No file uploaded", 400);
    }

    const { name, avatarUrl } = await User.findById(userId);

    if (avatarUrl) {
      await CloudinaryService.deleteFile(name.replace(" ", ""));
    }
    const imageObj = await CloudinaryService.uploadImage(
      req.file.buffer,
      name.replace(" ", "")
    );

    const user = await User.findByIdAndUpdate(
      userId,
      {
        avatarUrl: imageObj.secure_url,
      },
      { new: true }
    );

    res.json(user);
  } catch (err) {
    next(err);
  }
};

export const deleteUserAvatar = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.params.id;

    const user = await User.findById(userId);

    if (user.avatarUrl) {
      const userPublicID = `avatars/${user.name.replace(" ", "")}`;
      const data = await CloudinaryService.deleteFile(userPublicID);
      if (data.result === "ok") {
        const user = await User.findByIdAndUpdate(
          userId,
          {
            avatarUrl: "",
          },
          { new: true }
        );
        res.json(user);
      } else {
        throw new AppError("Failed to delete avatar", 500);
      }
    }
  } catch (err) {
    next(err);
  }
};
export const addUserDiagnose = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    const parsed = diseaseSchema.safeParse(req.body);

    if (!parsed.success) {
      const details = parsed.error.flatten().fieldErrors;
      throw new AppError("Invalid diagnose data", 400, details);
    }

    const user = await User.findByIdAndUpdate(
      id,
      { $push: { "medicalInfo.medicalHistory": parsed.data } },
      { new: true }
    );

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export const addUserAppointment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    const parsed = userAppointmentSchema.safeParse(req.body);

    if (!parsed.success) {
      const details = parsed.error.flatten().fieldErrors;
      throw new AppError("Invalid appointment data", 400, details);
    }

    const user = await User.findByIdAndUpdate(
      id,
      { $push: { "medicalInfo.appointments": parsed.data } },
      { new: true }
    );

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export const addUserDocument = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);
    const parsed = userDocumentSchema.safeParse(req.body);

    if (!parsed.success) {
      const details = parsed.error.flatten().fieldErrors;
      throw new AppError("Invalid document data", 400, details);
    }

    const { title, date } = parsed.data;

    const builtName = `${
      user.name.replaceAll(" ", "_") +
      "_" +
      title.replaceAll(" ", "_") +
      "_" +
      date
    }`;

    const PdfFile = await CloudinaryService.uploadPdf(
      req.file.buffer,
      builtName
    );

    user.medicalInfo.documents.push({
      id: uuid(),
      title: title,
      date: date,
      url: PdfFile.secure_url,
      uploadedAt: new Date(),
      cloudinaryId: PdfFile.public_id,
    });
    user.save();

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export const deleteUserDocument = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId, docId } = req.params;
    const user = await User.findById(userId);

    const document = user.medicalInfo.documents.find((doc) => doc.id === docId);
    const data = await CloudinaryService.deleteFile(document.cloudinaryId);
    if (data.result === "ok") {
      user.medicalInfo.documents = user.medicalInfo.documents.filter(
        (doc) => doc.id !== docId
      );
      await user.save();
    } else {
      throw new AppError("Failed to delete document", 500);
    }
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};
