import { Request, Response } from "express";
import { User } from "../models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

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
    });

    await newUser.save();

    const users = await User.find();

    return res.status(200).json(users);
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
      user: { id: user._id, email: user.email, name: user.name },
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

    const imageURL = `/uploads/${req.file.filename}`;

    const user = await User.findByIdAndUpdate(
      userId,
      {
        avatarUrl: imageURL,
      },
      { new: true }
    );

    console.log("user", user);

    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Upload failed" });
  }
};
