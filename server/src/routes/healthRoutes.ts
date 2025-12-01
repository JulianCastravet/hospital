import { Router } from "express";
import { userHealthParams } from "../controllers/healthController";

const router = Router();

router.get("/healthParams", userHealthParams);

export default router;
