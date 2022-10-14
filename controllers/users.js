const { Users } = require("../models");
(asyncHandler = require("../middleware/async")),
  (ErrorResponse = require("../utils/errorResponse"));
require("dotenv").config();

// @desc    Get All Users
// @route   GET /api/v1/users
// @access  Public
exports.getUsers = asyncHandler(async (req, res, next) => {
  const users = await Users.findAll({
    include: ["bookings"],
    order: [["id", "DESC"]],
  });
  if (!users) return next(new ErrorResponse("users not found", 404));
  if (users) return res.status(200).json(users);
  next(new ErrorResponse());
});

// @desc    Get Single User
// @route   GET /api/v1/users/:id
// @access  Public
exports.getUser = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const user = await Users.findOne({
    where: { id },
    include: ["bookings"],
  });
  if (!user) return next(new ErrorResponse("user not found", 404));
  if (user) return res.status(200).json(user);
  next(new ErrorResponse());
});
// @desc    Update User
// @route   PUT /api/v1/users/:id
// @access  Private
exports.updateUser = asyncHandler(async (req, res, next) => {
  // const { name, email, phone, address } = req.body;
  const id = req.params.id;
  const user = await Users.findOne({ where: { id } });
  if (!user) return next(new ErrorResponse("user not found", 404));
  if (await Users.update(req.body, { where: { id } }))
    return res.status(203).json({ success: true, message: `user updated` });
  next(new ErrorResponse());
});

// @desc    Delete User
// @route   DELETE /api/v1/users/:id
// @access  Private
exports.deleteUser = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const user = Users.findOne({ where: { id } });
  if (!user) return next(new ErrorResponse("user not found", 404));
  if (await Users.destroy({ where: { id } }))
    return res.status(200).json({ success: true, message: `user deleted` });
  next(new ErrorResponse());
});
