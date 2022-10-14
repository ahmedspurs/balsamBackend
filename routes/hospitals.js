const router = require("express").Router();

router.route("/").get();
router.route("/").post();
router.route("/:id").get();
router.route("/:id").put();
router.route("/:id").delete();
