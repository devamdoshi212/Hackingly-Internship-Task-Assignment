const express = require("express");
const router = express.Router();
const searchController = require("./../controllers/searchController");
const auth = require("./../middlewares/auth");
router.route("/").post(auth, searchController.search);

// router.post("/search");

module.exports = router;
