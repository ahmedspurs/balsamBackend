const router = require("express").Router();
const {
  createIcu,
  getIcus,
  getIcu,
  updateIcu,
  deleteIcu,
} = require("../controllers/icus");
const { protect } = require("../middleware/auth");
router.route("/").get(getIcus);
router.route("/").post(createIcu);
router.route("/:id").get(getIcu);
router.route("/:id").put(protect, updateIcu);
router.route("/:id").delete(protect, deleteIcu);

module.exports = router;
