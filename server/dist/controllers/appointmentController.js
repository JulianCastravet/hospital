"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAppointment = exports.updateAppointment = exports.addAppointment = exports.getAllAppointments = void 0;
const Appointment_1 = require("../models/Appointment");
const getAllAppointments = async (req, res) => {
    try {
        const appts = await Appointment_1.Appointment.find();
        res.status(200).json(appts);
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching appointments" });
    }
};
exports.getAllAppointments = getAllAppointments;
const addAppointment = async (req, res) => {
    try {
        const appt = new Appointment_1.Appointment(req.body);
        await appt.save();
        const appts = await Appointment_1.Appointment.find();
        res.status(200).json(appts);
    }
    catch (error) {
        res.status(500).json(error);
    }
};
exports.addAppointment = addAppointment;
const updateAppointment = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedBody = req.body;
        await Appointment_1.Appointment.findByIdAndUpdate(id, updatedBody, { new: true });
        const appts = await Appointment_1.Appointment.find();
        res.status(200).json(appts);
    }
    catch (error) {
        res.status(500).json(error);
    }
};
exports.updateAppointment = updateAppointment;
const deleteAppointment = async (req, res) => {
    try {
        const { id } = req.params;
        await Appointment_1.Appointment.findByIdAndDelete(id);
        const appts = await Appointment_1.Appointment.find();
        res.status(200).json(appts);
    }
    catch (error) {
        res.status(500).json(error);
    }
};
exports.deleteAppointment = deleteAppointment;
