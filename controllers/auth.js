"use strict";
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Users, Hospitals } = require("../models");
const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/errorResponse");
require("dotenv").config();

// @desc    Register user
// @route   POST /api/v1/auth/register
// @access  Public
exports.register = asyncHandler(async (req, res, next) => {
  const { name, email, password, phone, address } = req.body;
  console.log(req.body);
  if (!name) return next(new ErrorResponse("please add a name", 400));
  if (!email) return next(new ErrorResponse("please add an email", 400));
  if (!password) return next(new ErrorResponse("please add a password", 400));
  if (!address) return next(new ErrorResponse("please add an address", 400));
  if (!phone) return next(new ErrorResponse("please add a phone number", 400));
  const oldUser = await Users.findOne({ where: { email } });
  if (oldUser)
    return next(new ErrorResponse("user with this email, already exist", 400));
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const user = await Users.create({
    name,
    email,
    password: hashedPassword,
    phone,
    address,
  });
  if (!user) return next(new ErrorResponse("unable to create user", 500));
  if (user) return res.status(200).json({ success: true, user });
  next(new ErrorResponse());
});

// @desc    Register hospital
// @route   POST /api/v1/auth/registerhospital
// @access  Public
exports.registerHospital = asyncHandler(async (req, res, next) => {
  const { name, email, password, phone, address, license, type } = req.body;
  console.log(req.body);
  if (!name) return next(new ErrorResponse("please add a name", 400));
  if (!email) return next(new ErrorResponse("please add an email", 400));
  if (!password) return next(new ErrorResponse("please add a password", 400));
  if (!address) return next(new ErrorResponse("please add an address", 400));
  if (!phone) return next(new ErrorResponse("please add a phone number", 400));
  if (!license)
    return next(new ErrorResponse("please add a license number", 400));
  if (!type) return next(new ErrorResponse("please add a phone number", 400));
  const oldHospital = await Hospitals.findOne({ where: { email } });
  if (oldHospital)
    return next(
      new ErrorResponse("hospital with this email, already exist", 400)
    );
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const hospital = await Hospitals.create({
    name,
    email,
    password: hashedPassword,
    phone,
    address,
    license,
    type,
  });
  if (!hospital)
    return next(new ErrorResponse("unable to create hospital", 500));
  if (hospital) return res.status(200).json({ success: true, hospital });
  next(new ErrorResponse());
});

// @desc    Logging user
// @route   POST /api/v1/auth/login
// @access  Public
exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  // Validate email and password
  if (!email) return next(new ErrorResponse("please enter your email", 400));
  if (!password)
    return next(new ErrorResponse("please enter your password", 400));
  // Check for user
  const user = await Users.findOne({ where: { email } });
  if (!user) return next(new ErrorResponse("user not found", 404));
  // Match pssword
  if (await bcrypt.compare(password, user.password)) {
    // Create token
    sendTokenResponse(user, 200, res);
  } else {
    return next(new ErrorResponse("password incorrect", 404));
  }
});

// @desc    Logging user
// @route   POST /api/v1/auth/login
// @access  Public
exports.loginHospital = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  // Validate email and password
  if (!email) return next(new ErrorResponse("please enter your email", 400));
  if (!password)
    return next(new ErrorResponse("please enter your password", 400));
  // Check for user
  const hospital = await Hospitals.findOne({ where: { email } });
  if (!hospital) return next(new ErrorResponse("hospital not found", 404));
  // Match pssword
  if (await bcrypt.compare(password, hospital.password)) {
    // Create token
    sendTokenResponse(hospital, 200, res);
  } else {
    return next(new ErrorResponse("password incorrect", 404));
  }
});

// @desc    update user password
// @route   POST /api/v1/auth/updatedpassword
// @access  Public
exports.userPassword = asyncHandler(async (req, res, next) => {
  const { email, oldPassword, newPassword, confirmPassword } = req.body;
  // Validate email and password
  if (!email) return next(new ErrorResponse("please enter your email", 400));
  if (!oldPassword)
    return next(new ErrorResponse("please enter your password", 400));
  if (!newPassword)
    return next(new ErrorResponse("please enter your new password", 400));
  if (!confirmPassword)
    return next(new ErrorResponse("please re enter your password", 400));
  if (newPassword !== confirmPassword)
    return next(new ErrorResponse("password not matched", 400));
  // Check for user
  const user = await Users.findOne({ where: { email } });
  if (!user) return next(new ErrorResponse("user not found", 404));
  // Match user pssword
  if (await bcrypt.compare(oldPassword, user.password)) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    const user = await Users.update(
      { password: hashedPassword },
      { where: { email } }
    );
    if (user)
      return res
        .status(203)
        .json({ success: true, message: "password updated" });
  } else {
    return next(new ErrorResponse("password incorrect", 404));
  }
  next(new ErrorResponse());
});

// @desc    update user password
// @route   POST /api/v1/auth/updatedpassword
// @access  Public
exports.hospitalPassword = asyncHandler(async (req, res, next) => {
  const { email, oldPassword, newPassword, confirmPassword } = req.body;
  // Validate email and password
  if (!email) return next(new ErrorResponse("please enter your email", 400));
  if (!oldPassword)
    return next(new ErrorResponse("please enter your password", 400));
  if (!newPassword)
    return next(new ErrorResponse("please enter your new password", 400));
  if (!confirmPassword)
    return next(new ErrorResponse("please re enter your password", 400));
  if (newPassword !== confirmPassword)
    return next(new ErrorResponse("password not matched", 400));
  // Check for user
  const hospital = await Hospitals.findOne({ where: { email } });
  if (!hospital) return next(new ErrorResponse("user not found", 404));
  // Match user pssword
  if (await bcrypt.compare(oldPassword, hospital.password)) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    const hospital = await Hospitals.update(
      { password: hashedPassword },
      { where: { email } }
    );
    if (hospital)
      return res
        .status(203)
        .json({ success: true, message: "password updated" });
  } else {
    return next(new ErrorResponse("password incorrect", 404));
  }
  next(new ErrorResponse());
});

// @desc    Get current Logged in user
// @route   GET /api/v1/auth/me
// @access  Private
exports.getCurrentUser = asyncHandler(async (req, res, next) => {
  const user = await Users.findOne({
    where: { id: req.user.id },
    include: ["bookings"],
  });
  if (!user) return next(new ErrorResponse("user not found", 404));
  if (user) return res.status(200).json({ success: true, data: user });
  next(new ErrorResponse());
});

// @desc    Get current Logged in hospital
// @route   GET /api/v1/auth/me
// @access  Private
exports.getCurrentHospital = asyncHandler(async (req, res, next) => {
  const hospital = await Hospitals.findOne({
    where: { id: req.user.id },
  });
  if (!hospital) return next(new ErrorResponse("hospital not found", 404));
  if (hospital) return res.status(200).json({ success: true, data: hospital });
  next(new ErrorResponse());
});

// @desc    Logout user / clear cookie
// @route   POST /api/v1/auth/logout
// @access  Private
exports.logout = asyncHandler(async (req, res, next) => {
  res.cookie("token", "none", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  return res.status(200).json({ success: true, data: {} });
  //   next(new ErrorResponse());
});

// Get token from model, create cookie and send response

const sendTokenResponse = async (user, statusCode, res) => {
  jwt.sign({ user }, process.env.JWT_SECRET, (err, token) => {
    const options = {
      httpOnly: true,
    };

    if (process.env.NODE_ENC === "production") {
      options.secure = true;
    }
    if (!err)
      return res
        .status(statusCode)
        .cookie("token", token, options)
        .json({ token, success: true });
  });
};
