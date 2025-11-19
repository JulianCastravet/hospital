import { Request, Response } from "express";
import { User } from "../models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import CloudinaryService from "../services/CloudinaryUpload";

export const getAllUsers = async (_req: Request, res: Response) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error getting users" });
  }
};

export const getSingleUser = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const calculateUserAge = (date: string): number => {
  const today = new Date().getFullYear();
  const yearofB = new Date(date).getFullYear();
  return today - yearofB;
};

export const addUser = async (req: Request, res: Response) => {
  try {
    const {
      name,
      email,
      password,
      phone,
      dateOfBirth,
      type,
      specialization = "",
      formattedAddress,
      gender,
    } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      phone,
      dateOfBirth,
      type,
      specialization,
      age: calculateUserAge(dateOfBirth),
      formattedAddress,
      gender,
    });

    await newUser.save();

    return res.status(200).json(newUser);
  } catch (error) {
    console.error("Add user error:", error);
    res.status(500).json({ message: "Error adding user" });
  }
};

export const authenticateUser = async (req: Request, res: Response) => {
  try {
    const { mail, password } = req.body;

    const user = await User.findOne({ email: mail });
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET || "secret",
      { expiresIn: "1h" }
    );

    res.status(200).json({
      success: true,
      token,
      user,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const getPatients = async (req: Request, res: Response) => {
  try {
    const patients = await User.find({ type: "guest" });
    res.status(200).json(patients);
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = req.body;
    console.log(id, data);

    await User.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });

    const user = await User.findById(id);

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await User.findByIdAndDelete(id);

    const users = await User.find();

    return res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const updateUserAvatar = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;

    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "No file uploaded" });
    }

    const { name, avatarUrl } = await User.findById(userId);

    if (avatarUrl) {
      await CloudinaryService.deleteImage(name.replace(" ", ""));
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
    console.error(err);
    res.status(500).json({ success: false, message: "Upload failed" });
  }
};

export const deleteUserAvatar = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;

    const user = await User.findById(userId);

    if (user.avatarUrl) {
      const userPublicID = `avatars/${user.name.replace(" ", "")}`;
      const data = await CloudinaryService.deleteImage(userPublicID);
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
        res.status(500).json(user);
      }
    }
  } catch (err) {
    res.status(500).json({ success: false, message: "Delete failed" });
  }
};
export const addUserDiagnose = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const user = await User.findByIdAndUpdate(
      id,
      { $push: { "medicalInfo.medicalHistory": req.body } },
      { new: true }
    );

    res.status(200).json(user);
  } catch (error) {
    res.status(500).send({ message: error });
  }
};

export const addUserAppointment = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const user = await User.findByIdAndUpdate(
      id,
      { $push: { "medicalInfo.appointments": req.body } },
      { new: true }
    );

    res.status(200).json(user);
  } catch (error) {
    res.status(500).send({ message: error });
  }
};
