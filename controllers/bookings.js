const { Bookings } = require("../models");
(asyncHandler = require("../middleware/async")),
  (ErrorResponse = require("../utils/errorResponse"));
require("dotenv").config();

// @desc    Get All Bookings
// @route   GET /api/v1/bookings
// @access  Public
exports.getBookings = asyncHandler(async (req, res, next) => {
  const bookings = await Bookings.findAll({
    include: ["user", "hospital"],
    order: [["id", "DESC"]],
  });
  if (!bookings) return next(new ErrorResponse("bookings not found", 404));
  if (bookings) return res.status(200).json(bookings);
  next(new ErrorResponse());
});

// @desc    Get Single Booking
// @route   GET /api/v1/bookings/:id
// @access  Public
exports.getBooking = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const booking = await Bookings.findOne({
    where: { id },
    include: ["user", "hospital"],
  });
  if (!booking) return next(new ErrorResponse("booking not found", 404));
  if (booking) return res.status(200).json(booking);
  next(new ErrorResponse());
});

// @desc    Create Booking
// @route   POST /api/v1/bookings
// @access  Private
exports.createBooking = asyncHandler(async (req, res, next) => {
  const { hospitalId, icuId, userId, phone, address, status } = req.body;
  // validatation
  if (!hospitalId)
    return next(new ErrorResponse("please add the hospital id", 400));
  if (!icuId) return next(new ErrorResponse("please enter the icu id", 400));
  if (!userId) return next(new ErrorResponse("please add a user id", 400));
  if (!phone) return next(new ErrorResponse("please add a phone number", 400));
  if (!address) return next(new ErrorResponse("please add a address", 400));
  const booking = await Bookings.create({
    hospitalId,
    icuId,
    userId,
    phone,
    address,
  });
  if (!booking) return next(new ErrorResponse("unable to create booking", 404));
  if (booking)
    return res.status(200).json({ success: true, message: "booking created" });
  next(new ErrorResponse());
});

// @desc    Update Booking
// @route   PUT /api/v1/bookings/:id
// @access  Private
exports.updateBooking = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const booking = await Bookings.findOne({ where: { id } });
  if (!booking) return next(new ErrorResponse("booking not found", 404));
  if (await Bookings.update(req.body, { where: { id } }))
    return res.status(203).json({ success: true, message: `booking updated` });
  next(new ErrorResponse());
});

// @desc    Delete Booking
// @route   DELETE /api/v1/bookings/:id
// @access  Private
exports.deleteBooking = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const booking = Bookings.findOne({ where: { id } });
  if (!booking) return next(new ErrorResponse("booking not found", 404));
  if (await Bookings.destroy({ where: { id } }))
    return res.status(200).json({ success: true, message: `booking deleted` });
  next(new ErrorResponse());
});
