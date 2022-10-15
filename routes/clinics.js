const router = require("express").Router();
const {
  getClinic,
  getClinics,
  createClinic,
  updateClinic,
  deleteClinic,
} = require("../controllers/clinics");
const {} = require("../controllers/icus");
const { protect } = require("../middleware/auth");
router.route("/").get(getClinics);
router.route("/").post(createClinic);
router.route("/:id").get(getClinic);
router.route("/:id").put(protect, updateClinic);
router.route("/:id").delete(protect, deleteClinic);

module.exports = router;
