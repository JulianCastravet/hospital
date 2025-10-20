import express from "express";
import {
  getAllUsers,
  getSingleUser,
  addUser,
  authenticateUser,
  getPatients,
  deleteUser,
  updateUser,
} from "../controllers/userController";

const router = express.Router();
router.post("/login", authenticateUser);
router.get("/getAllUsers", getAllUsers);
router.get("/getPatients", getPatients);
router.get("/:id", getSingleUser);
router.post("/", addUser);
router.delete("/:id", deleteUser);
router.put("/:id", updateUser);

export default router;
