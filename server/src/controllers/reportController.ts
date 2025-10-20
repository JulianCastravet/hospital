import { Report } from "../models/Reports";
import { Request, Response } from "express";

export const getAllReports = async (req: Request, res: Response) => {
  try {
    const reports = await Report.find();

    res.status(200).json(reports);
  } catch (error) {
    res.status(500).send({ message: error });
  }
};

export const addReport = async (req: Request, res: Response) => {
  try {
    const {
      signed,
      result,
      status,
      collBy,
      handling,
      cost,
      priority,
      lab,
      test,
      number,
    } = req.body;

    const document = new Report({
      signed,
      result,
      status,
      collBy,
      handling,
      cost,
      priority,
      lab,
      test,
      number,
    });

    await document.save();

    const reports = await Report.find();

    res.status(200).json(reports);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const updateReport = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const existing = await Report.findById(id);
    if (!existing) {
      return res.status(404).json({
        success: false,
        message: "Report not found",
      });
    }

    await Report.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    const allReports = await Report.find();

    return res.status(200).json(allReports);
  } catch (error: any) {
    console.error("Error updating report:", error);
    return res.status(500).json({
      success: false,
      message: "Server error updating report",
      error: error.message,
    });
  }
};

export const deleteReport = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    await Report.findByIdAndDelete(id);

    const reports = await Report.find();

    return res.status(200).json(reports);
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
};
