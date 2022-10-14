const router = require("express").Router();
const {
  register,
  login,
  registerHospital,
  userPassword,
  hospitalPassword,
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
router.put("/userpassword", protect, userPassword);
router.put("/hospitalpassword", protect, hospitalPassword);
router.get("/me", protect, getCurrentUser);
router.get("/myhospital", protect, getCurrentHospital);
router.get("/logout", protect, logout);
module.exports = router;
