const router = require("express").Router();
const {
  getBookings,
  createBooking,
  getBooking,
  updateBooking,
  deleteBooking,
} = require("../controllers/bookings");
const {} = require("../controllers/icus");
const { protect } = require("../middleware/auth");
router.route("/").get(getBookings);
router.route("/").post(createBooking);
router.route("/:id").get(getBooking);
router.route("/:id").put(protect, updateBooking);
router.route("/:id").delete(protect, deleteBooking);

module.exports = router;
