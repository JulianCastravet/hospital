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
  deleteUserAvatar,
  addUserDocument,
  deleteUserDocument,
} from "../controllers/userController";
import { upload } from "../multerConfig";
import { authMiddleware } from "../middleware/authMiddleware";

const router = express.Router();
router.post("/login", authenticateUser);
router.post("/register", addUser);


router.use(authMiddleware);
router.post("/", addUser);
router.get("/getAllUsers", getAllUsers);
router.get("/getPatients", getPatients);
router.get("/:id", getSingleUser);
router.delete("/:id", deleteUser);
router.put("/:id", updateUser);
router.post("/:id/avatar", upload.single("userAvatar"), updateUserAvatar);
router.delete("/:id/avatar", deleteUserAvatar);
router.post("/:id/diagnose", addUserDiagnose);
router.post("/:id/appointments", addUserAppointment);
router.post("/:id/documents", upload.single("file"), addUserDocument);
router.delete("/:userId/documents/:docId", deleteUserDocument);

export default router;
