const express = require("express");

const { adminLogin, registerAdmin } = require("../controllers/adminController");

const { isAuthenticated } = require("../middlewares/auth");
const router = express.Router();

router.route("/loginAdmin").post(adminLogin);
router.route("/registerAdmin").post(registerAdmin);

module.exports = router;