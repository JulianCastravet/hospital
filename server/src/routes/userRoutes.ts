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
  // getUserAvatar,
} from "../controllers/userController";
import { upload } from "../multerConfig";

const router = express.Router();
router.post("/login", authenticateUser);
router.get("/getAllUsers", getAllUsers);
router.get("/getPatients", getPatients);
router.get("/:id", getSingleUser);
router.post("/", addUser);
router.delete("/:id", deleteUser);
router.put("/:id", updateUser);
router.post("/:id/avatar", upload.single("userAvatar"), updateUserAvatar);
// router.get("/:id/avatar", getUserAvatar);

export default router;
