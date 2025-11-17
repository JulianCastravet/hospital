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
  addUserDiagnose,
  addUserAppointment,
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
router.post("/:id/diagnose", addUserDiagnose);
router.post("/:id/appointments", addUserAppointment);

export default router;
