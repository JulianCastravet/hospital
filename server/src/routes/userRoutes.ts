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
import { requireRole } from "../middleware/roleMiddleware";
import { getUserMessages } from "./messagesRoutes";

const router = express.Router();
router.post("/login", authenticateUser);
router.post("/register", addUser);

router.use(authMiddleware);

router.post("/", requireRole(["admin", "doctor"]), addUser);
router.get("/getAllUsers", requireRole(["admin", "doctor"]), getAllUsers);
router.get("/getPatients", requireRole(["admin", "doctor"]), getPatients);
router.get("/:id", getSingleUser);
router.delete("/:id", requireRole("admin"), deleteUser);
router.put("/:id", updateUser);
router.get("/:id/messages", getUserMessages);
router.post("/:id/avatar", upload.single("userAvatar"), updateUserAvatar);
router.delete("/:id/avatar", deleteUserAvatar);
router.post("/:id/diagnose", requireRole("doctor"), addUserDiagnose);
router.post("/:id/appointments", requireRole("doctor"), addUserAppointment);
router.post(
  "/:id/documents",
  upload.single("file"),
  requireRole(["doctor", "patient"]),
  addUserDocument
);
router.delete(
  "/:userId/documents/:docId",
  requireRole("admin"),
  deleteUserDocument
);

export default router;
