const express = require("express");

const { adminLogin, registerAdmin, myProfile } = require("../controllers/adminController");

const { isAuthenticated } = require("../middlewares/auth");
const router = express.Router();

router.route("/loginAdmin").post(adminLogin);

router.route("/registerAdmin").post(registerAdmin);

router.route("/adminLoad").get(isAuthenticated, myProfile);

module.exports = router;