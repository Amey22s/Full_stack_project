const User = require("../models/User");
const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");

// exports.isAuthenticated = async (req, res, next) => {
//   try {
//     const { token } = req.cookies;
//     if (typeof(token) === "undefined") {
//       res.status(401).json({
//         success: false,
//         message: "Please login !",
//       });
//     }
//     const decoded = await jwt.verify(token, process.env.JWT_SECRET);
//     req.user = await User.findById(decoded._id);

//     next();
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// const User = require("../models/User");
// const Admin = require("../models/Admin");
// const jwt = require("jsonwebtoken");

exports.isAuthenticated = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    // console.log("Token is ",token);
    if (typeof(token) === "undefined") {
        res.status(401).json({
        success: false,
        message: "Please login!",
      });
    }

    const decoded = await jwt.verify(token, process.env.JWT_SECRET);

    // Attempt to find user first
    req.user = await User.findById(decoded._id);

    // If user not found, try to find admin
    if ( typeof(req.user) === undefined) {
      req.admin = await Admin.findById(decoded._id);
    }

    // Check if either user or admin exists
    if (!req.user && !req.admin) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized access!",
      });
    }

    next();
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

