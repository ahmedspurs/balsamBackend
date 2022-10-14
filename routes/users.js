const router = require("express").Router();
const {
  getUsers,
  getUser,
  updateUser,
  deleteUser,
} = require("../controllers/users");
const { protect } = require("../middleware/auth");
router.route("/").get(getUsers);
router
  .route("/:id")
  .get(getUser)
  .put(protect, updateUser)
  .delete(protect, deleteUser);
module.exports = router;
