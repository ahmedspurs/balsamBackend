const { Hospitals } = require("../models");
(asyncHandler = require("../middleware/async")),
  (ErrorResponse = require("../utils/errorResponse"));
require("dotenv").config();

// @desc    Get All Hospitals
// @route   GET /api/v1/hospitals
// @access  Public
exports.getHospitals = asyncHandler(async (req, res, next) => {
  const hospitals = await Hospitals.findAll({
    include: ["icus", "clinics"],
    order: [["id", "DESC"]],
  });
  if (!hospitals) return next(new ErrorResponse("hospitals not found", 404));
  if (hospitals) return res.status(200).json(hospitals);
  next(new ErrorResponse());
});

// @desc    Get Single Hospital
// @route   GET /api/v1/hospitals/:id
// @access  Public
exports.getHospital = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const hospital = await Hospitals.findOne({
    where: { id },
    include: ["icus", "clinics"],
  });
  if (!hospital) return next(new ErrorResponse("hospital not found", 404));
  if (hospital) return res.status(200).json(hospital);
  next(new ErrorResponse());
});

// @desc    Update Hospital
// @route   PUT /api/v1/hospitals/:id
// @access  Private
exports.updateHospital = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const hospital = await Hospitals.findOne({ where: { id } });
  if (!hospital) return next(new ErrorResponse("hospital not found", 404));
  if (await Hospitals.update(req.body, { where: { id } }))
    return res.status(203).json({ success: true, message: `hospital updated` });
  next(new ErrorResponse());
});

// @desc    Delete Hospital
// @route   DELETE /api/v1/hospitals/:id
// @access  Private
exports.deleteHospital = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const hospital = Hospitals.findOne({ where: { id } });
  if (!hospital) return next(new ErrorResponse("hospital not found", 404));
  if (await Hospitals.destroy({ where: { id } }))
    return res.status(200).json({ success: true, message: `hospital deleted` });
  next(new ErrorResponse());
});
