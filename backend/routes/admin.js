const express = require("express");

const { adminLogin, registerAdmin, myProfile, logoutAdmin, getAllUsersForAdmin, deleteMyProfile} = require("../controllers/adminController");

const { isAuthenticated } = require("../middlewares/auth");
const router = express.Router();

router.route("/loginAdmin").post(adminLogin);

router.route("/registerAdmin").post(registerAdmin);

router.route("/adminLoad").get(isAuthenticated, myProfile);

router.route("/logoutAdmin").get(logoutAdmin);

router.route("/allUsersForAdmin").get(isAuthenticated, getAllUsersForAdmin);

router.route("/deleteUser/user").delete(isAuthenticated, deleteMyProfile);

module.exports = router;