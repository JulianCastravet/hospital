import { VercelRequest, VercelResponse } from "@vercel/node";
import app from "../src/index";

export default function handler(req: VercelRequest, res: VercelResponse) {
  // Remove /api prefix so Express sees /users, /reports, etc.
  req.url = req.url.replace(/^\/api/, "");

  app(req as any, res as any);
}
