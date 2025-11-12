"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteReport = exports.updateReport = exports.addReport = exports.getAllReports = void 0;
const Reports_1 = require("../models/Reports");
const getAllReports = async (req, res) => {
    try {
        const reports = await Reports_1.Report.find();
        res.status(200).json(reports);
    }
    catch (error) {
        res.status(500).send({ message: error });
    }
};
exports.getAllReports = getAllReports;
const addReport = async (req, res) => {
    try {
        const { signed, result, status, collBy, handling, cost, priority, lab, test, number, } = req.body;
        const document = new Reports_1.Report({
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
        const reports = await Reports_1.Report.find();
        res.status(200).json(reports);
    }
    catch (error) {
        res.status(500).json(error);
    }
};
exports.addReport = addReport;
const updateReport = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;
        const existing = await Reports_1.Report.findById(id);
        if (!existing) {
            return res.status(404).json({
                success: false,
                message: "Report not found",
            });
        }
        await Reports_1.Report.findByIdAndUpdate(id, updateData, {
            new: true,
            runValidators: true,
        });
        const allReports = await Reports_1.Report.find();
        return res.status(200).json(allReports);
    }
    catch (error) {
        console.error("Error updating report:", error);
        return res.status(500).json({
            success: false,
            message: "Server error updating report",
            error: error.message,
        });
    }
};
exports.updateReport = updateReport;
const deleteReport = async (req, res) => {
    try {
        const id = req.params.id;
        await Reports_1.Report.findByIdAndDelete(id);
        const reports = await Reports_1.Report.find();
        return res.status(200).json(reports);
    }
    catch (error) {
        return res.status(500).json({
            message: error,
        });
    }
};
exports.deleteReport = deleteReport;
