import { Report } from "../models/Reports";
import { NextFunction, Request, Response } from "express";
import { reportSchema } from "../validation/schemas";
import { AppError } from "../errors/AppError";

export const getAllReports = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { page, pageSize } = req.query;

    const pageN = Number(page);
    const pageSizeN = Number(pageSize);

    const skip = (pageN - 1) * pageSizeN;

    const reportsQty = (await Report.find()).length;

    const reports = await Report.find().skip(skip).limit(pageSizeN);

    res.status(200).json({ reports, reportsQty });
  } catch (error) {
    next(error);
  }
};

export const addReport = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const parsed = reportSchema.safeParse(req.body);

    if (!parsed.success) {
      const details = parsed.error.flatten().fieldErrors;
      throw new AppError("Invalid report data", 400, details);
    }

    const document = new Report(parsed.data);

    await document.save();

    const reports = await Report.find();

    res.status(200).json(reports);
  } catch (error) {
    next(error);
  }
};

export const updateReport = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const existing = await Report.findById(id);
    if (!existing) {
      throw new AppError("Report not found", 404);
    }

    await Report.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    const allReports = await Report.find();

    return res.status(200).json(allReports);
  } catch (error: any) {
    console.error("Error updating report:", error);
    return next(error);
  }
};

export const deleteReport = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;

    await Report.findByIdAndDelete(id);

    const reports = await Report.find();

    return res.status(200).json(reports);
  } catch (error) {
    return next(error);
  }
};
