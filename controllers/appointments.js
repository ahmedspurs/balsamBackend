const { Appointments } = require("../models");
(asyncHandler = require("../middleware/async")),
  (ErrorResponse = require("../utils/errorResponse"));
require("dotenv").config();

// @desc    Get All Appointments
// @route   GET /api/v1/appointments
// @access  Public
exports.getAppointments = asyncHandler(async (req, res, next) => {
  const appointments = await Appointments.findAll({
    include: ["user", "hospital"],
    order: [["id", "DESC"]],
  });
  if (!appointments)
    return next(new ErrorResponse("appointments not found", 404));
  if (appointments) return res.status(200).json(appointments);
  next(new ErrorResponse());
});

// @desc    Get Single Appointment
// @route   GET /api/v1/appointments/:id
// @access  Public
exports.getAppointment = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const appointment = await Appointments.findOne({
    where: { id },
    include: ["user", "hospital"],
  });
  if (!appointment)
    return next(new ErrorResponse("appointment not found", 404));
  if (appointment) return res.status(200).json(appointment);
  next(new ErrorResponse());
});

// @desc    Create Appointment
// @route   POST /api/v1/appointments
// @access  Private
exports.createAppointment = asyncHandler(async (req, res, next) => {
  const { hospitalId, clinicId, userId, phone, address } = req.body;
  // validatation
  if (!hospitalId)
    return next(new ErrorResponse("please add the hospital id", 400));
  if (!clinicId) return next(new ErrorResponse("please enter the icu id", 400));
  if (!userId) return next(new ErrorResponse("please add a user id", 400));
  if (!phone) return next(new ErrorResponse("please add a phone number", 400));
  if (!address) return next(new ErrorResponse("please add a address", 400));
  const appointment = await Appointments.create({
    hospitalId,
    clinicId,
    userId,
    phone,
    address,
  });
  if (!appointment)
    return next(new ErrorResponse("unable to create appointment", 404));
  if (appointment)
    return res
      .status(200)
      .json({ success: true, message: "appointment created" });
  next(new ErrorResponse());
});

// @desc    Update Appointment
// @route   PUT /api/v1/appointments/:id
// @access  Private
exports.updateAppointment = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const appointment = await Appointments.findOne({ where: { id } });
  if (!appointment)
    return next(new ErrorResponse("appointment not found", 404));
  if (await Appointments.update(req.body, { where: { id } }))
    return res
      .status(203)
      .json({ success: true, message: `appointment updated` });
  next(new ErrorResponse());
});

// @desc    Delete Appointment
// @route   DELETE /api/v1/appointments/:id
// @access  Private
exports.deleteAppointment = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const appointment = Appointments.findOne({ where: { id } });
  if (!appointment)
    return next(new ErrorResponse("appointment not found", 404));
  if (await Appointments.destroy({ where: { id } }))
    return res
      .status(200)
      .json({ success: true, message: `appointment deleted` });
  next(new ErrorResponse());
});
