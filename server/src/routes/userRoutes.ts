import express from "express";
import {
  getAllUsers,
  getSingleUser,
  addUser,
  authenticateUser,
  getPatients,
  deleteUser,
  updateUser,
  updateUserAvatar,
  getUserAvatar,
} from "../controllers/userController";
import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({ storage });

const router = express.Router();
router.post("/login", authenticateUser);
router.get("/getAllUsers", getAllUsers);
router.get("/getPatients", getPatients);
router.get("/:id", getSingleUser);
router.post("/", addUser);
router.delete("/:id", deleteUser);
router.put("/:id", updateUser);
router.post("/:id/avatar", upload.single("userAvatar"), updateUserAvatar);
router.get("/:id/avatar", getUserAvatar);

export default router;
