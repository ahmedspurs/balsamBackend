const { Clinics } = require("../models");
(asyncHandler = require("../middleware/async")),
  (ErrorResponse = require("../utils/errorResponse"));
require("dotenv").config();

// @desc    Get All \Clinics
// @route   GET /api/v1/\clinics
// @access  Public
exports.getClinics = asyncHandler(async (req, res, next) => {
  const clinics = await Clinics.findAll({
    include: ["hospital"],
    order: [["id", "DESC"]],
  });
  if (!clinics) return next(new ErrorResponse("clinics not found", 404));
  if (clinics) return res.status(200).json(clinics);
  next(new ErrorResponse());
});

// @desc    Get Single linic
// @route   GET /api/v1/clinics/:id
// @access  Public
exports.getClinic = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const clinic = await Clinics.findOne({
    where: { id },
    include: ["hospital"],
  });
  if (!clinic) return next(new ErrorResponse("clinic not found", 404));
  if (clinic) return res.status(200).json(clinic);
  next(new ErrorResponse());
});

// @desc    Create Clinic
// @route   POST /api/v1/clinics
// @access  Private
exports.createClinic = asyncHandler(async (req, res, next) => {
  const { hospitalId, name, domain, resume, attend, price, phone } = req.body;
  // validatation
  if (!hospitalId)
    return next(new ErrorResponse("please add the hospital id", 400));
  if (!name)
    return next(new ErrorResponse("please enter the doctor name", 400));
  if (!domain) return next(new ErrorResponse("please add a domain", 400));
  if (!resume) return next(new ErrorResponse("please add a resume", 400));
  if (!attend) return next(new ErrorResponse("please add the attend", 400));
  if (!price) return next(new ErrorResponse("please add icu price", 400));
  if (!phone) return next(new ErrorResponse("please add phone number", 400));
  const clinic = await Clinics.create({
    hospitalId,
    name,
    domain,
    resume,
    attend,
    price,
    phone,
  });
  if (!clinic) return next(new ErrorResponse("unable to create clinic", 404));
  if (clinic)
    return res.status(200).json({ success: true, message: "clinic created" });
  next(new ErrorResponse());
});

// @desc    Update Clinic
// @route   PUT /api/v1/clinics/:id
// @access  Private
exports.updateClinic = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const clinic = await Clinics.findOne({ where: { id } });
  if (!clinic) return next(new ErrorResponse("clinic not found", 404));
  if (await Clinics.update(req.body, { where: { id } }))
    return res.status(203).json({ success: true, message: `clinic updated` });
  next(new ErrorResponse());
});

// @desc    Delete Clinic
// @route   DELETE /api/v1/clinics/:id
// @access  Private
exports.deleteClinic = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const clinic = Clinics.findOne({ where: { id } });
  if (!clinic) return next(new ErrorResponse("clinic not found", 404));
  if (await Clinics.destroy({ where: { id } }))
    return res.status(200).json({ success: true, message: `clinic deleted` });
  next(new ErrorResponse());
});
