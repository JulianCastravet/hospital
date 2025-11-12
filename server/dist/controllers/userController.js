"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.getPatients = exports.authenticateUser = exports.addUser = exports.getSingleUser = exports.getAllUsers = void 0;
const User_1 = require("../models/User");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const getAllUsers = async (_req, res) => {
    try {
        const users = await User_1.User.find();
        res.status(200).json(users);
    }
    catch (error) {
        res.status(500).json({ message: "Error getting users" });
    }
};
exports.getAllUsers = getAllUsers;
const getSingleUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User_1.User.findById(id);
        if (!user)
            return res.status(404).json({ message: "User not found" });
        res.status(200).json(user);
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching user" });
    }
};
exports.getSingleUser = getSingleUser;
const addUser = async (req, res) => {
    try {
        const { name, email, password, phone, dateOfBirth, type, specialization = "", } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password required" });
        }
        const existingUser = await User_1.User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        const hashedPassword = await bcryptjs_1.default.hash(password, 10);
        const newUser = new User_1.User({
            name,
            email,
            password: hashedPassword,
            phone,
            dateOfBirth,
            type,
            specialization,
        });
        await newUser.save();
        const users = await User_1.User.find();
        return res.status(200).json(users);
    }
    catch (error) {
        console.error("Add user error:", error);
        res.status(500).json({ message: "Error adding user" });
    }
};
exports.addUser = addUser;
const authenticateUser = async (req, res) => {
    try {
        const { mail, password } = req.body;
        const user = await User_1.User.findOne({ email: mail });
        if (!user) {
            return res
                .status(401)
                .json({ success: false, message: "User not found" });
        }
        const isMatch = await bcryptjs_1.default.compare(password, user.password);
        if (!isMatch) {
            return res
                .status(401)
                .json({ success: false, message: "Invalid credentials" });
        }
        const token = jsonwebtoken_1.default.sign({ userId: user._id }, process.env.JWT_SECRET || "secret", { expiresIn: "1h" });
        res.status(200).json({
            success: true,
            token,
            user: { id: user._id, email: user.email, name: user.name },
        });
    }
    catch (error) {
        res.status(500).json({ success: false, message: "Server error" });
    }
};
exports.authenticateUser = authenticateUser;
const getPatients = async (req, res) => {
    try {
        const patients = await User_1.User.find({ type: "guest" });
        res.status(200).json(patients);
    }
    catch (error) {
        res.status(500).json({ message: "something went wrong" });
    }
};
exports.getPatients = getPatients;
const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;
        await User_1.User.findByIdAndUpdate(id, data, {
            new: true,
            runValidators: true,
        });
        const users = await User_1.User.find();
        return res.status(200).json(users);
    }
    catch (error) {
        return res.status(500).json(error);
    }
};
exports.updateUser = updateUser;
const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        await User_1.User.findByIdAndDelete(id);
        const users = await User_1.User.find();
        return res.status(200).json(users);
    }
    catch (error) {
        res.status(500).json({ message: error });
    }
};
exports.deleteUser = deleteUser;
