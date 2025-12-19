import { Request, Response, NextFunction } from "express";
import { UserRole } from "../models/User";

export const requireRole = (roles: UserRole | UserRole[]) => {
  const allowedRoles = Array.isArray(roles) ? roles : [roles];

  return (req: Request, res: Response, next: NextFunction) => {
    const user: any = (req as any).user;

    if (!user || !user.role || !allowedRoles.includes(user.role)) {
      return res
        .status(403)
        .json({ message: "Your role doesn't allow this operation." });
    }

    return next();
  };
};
