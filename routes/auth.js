const router = require("express").Router();
const {
  register,
  login,
  registerHospital,
  updatePassword,
  logout,
  loginHospital,
  getCurrentUser,
  getCurrentHospital,
} = require("../controllers/auth");
const { protect } = require("../middleware/auth");
router.post("/register", register);
router.post("/registerhospital", registerHospital);
router.post("/login", login);
router.post("/loginhospital", loginHospital);
router.put("/updatepassword", protect, updatePassword);
router.get("/me", protect, getCurrentUser);
router.get("/myhospital", protect, getCurrentHospital);
router.get("/logout", protect, logout);
module.exports = router;
