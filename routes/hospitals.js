const router = require("express").Router();
const {
  getHospitals,
  getHospital,
  updateHospital,
  deleteHospital,
} = require("../controllers/hospitals");
const { protect } = require("../middleware/auth");
router.route("/").get(getHospitals);
router.route("/:id").get(getHospital);
router.route("/:id").put(protect, updateHospital);
router.route("/:id").delete(protect, deleteHospital);

module.exports = router;
