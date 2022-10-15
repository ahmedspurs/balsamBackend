const router = require("express").Router();
const {
  getAppointments,
  createAppointment,
  getAppointment,
  updateAppointment,
  deleteAppointment,
} = require("../controllers/appointments");
const {} = require("../controllers/icus");
const { protect } = require("../middleware/auth");
router.route("/").get(getAppointments);
router.route("/").post(createAppointment);
router.route("/:id").get(getAppointment);
router.route("/:id").put(protect, updateAppointment);
router.route("/:id").delete(protect, deleteAppointment);

module.exports = router;
