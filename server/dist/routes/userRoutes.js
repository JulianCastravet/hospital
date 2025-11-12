"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const router = express_1.default.Router();
router.post("/login", userController_1.authenticateUser);
router.get("/getAllUsers", userController_1.getAllUsers);
router.get("/getPatients", userController_1.getPatients);
router.get("/:id", userController_1.getSingleUser);
router.post("/", userController_1.addUser);
router.delete("/:id", userController_1.deleteUser);
router.put("/:id", userController_1.updateUser);
exports.default = router;
