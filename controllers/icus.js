const { Icus } = require("../models");
(asyncHandler = require("../middleware/async")),
  (ErrorResponse = require("../utils/errorResponse"));
require("dotenv").config();

// @desc    Get All Icus
// @route   GET /api/v1/icus
// @access  Public
exports.getIcus = asyncHandler(async (req, res, next) => {
  const icus = await Icus.findAll({
    include: ["hospital"],
    order: [["id", "DESC"]],
  });
  if (!icus) return next(new ErrorResponse("icus not found", 404));
  if (icus) return res.status(200).json(icus);
  next(new ErrorResponse());
});

// @desc    Get Single Icu
// @route   GET /api/v1/icus/:id
// @access  Public
exports.getIcu = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const icu = await Icus.findOne({
    where: { id },
    include: ["hospital"],
  });
  if (!icu) return next(new ErrorResponse("icu not found", 404));
  if (icu) return res.status(200).json(icu);
  next(new ErrorResponse());
});

// @desc    Create Icu
// @route   POST /api/v1/icus
// @access  Private
exports.createIcu = asyncHandler(async (req, res, next) => {
  const { hospitalId, name, status, price } = req.body;
  // validatation
  if (!hospitalId)
    return next(new ErrorResponse("please add the hospital id", 400));
  if (!name) return next(new ErrorResponse("please enter the icu name", 400));
  if (!status) return next(new ErrorResponse("please icu status", 400));
  if (!price) return next(new ErrorResponse("please add icu price", 400));
  const icus = await Icus.create({
    hospitalId,
    name,
    status,
    price,
  });
  if (!icus) return next(new ErrorResponse("unable to create icu", 404));
  if (icus)
    return res.status(200).json({ success: true, message: "icu created" });
  next(new ErrorResponse());
});

// @desc    Update Icu
// @route   PUT /api/v1/icus/:id
// @access  Private
exports.updateIcu = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const icu = await Icus.findOne({ where: { id } });
  if (!icu) return next(new ErrorResponse("icu not found", 404));
  if (await Icus.update(req.body, { where: { id } }))
    return res.status(203).json({ success: true, message: `icu updated` });
  next(new ErrorResponse());
});

// @desc    Delete Icu
// @route   DELETE /api/v1/icus/:id
// @access  Private
exports.deleteIcu = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const icu = Icus.findOne({ where: { id } });
  if (!icu) return next(new ErrorResponse("icu not found", 404));
  if (await Icus.destroy({ where: { id } }))
    return res.status(200).json({ success: true, message: `icu deleted` });
  next(new ErrorResponse());
});
