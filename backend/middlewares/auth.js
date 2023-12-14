const User = require('../models/User');
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const Trader = require('../models/Trader');

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
    console.log("Token is ",token);
    if (typeof token === 'undefined') {
      // res.status(401).json({
      // success: false,
      // message: 'Please login!',
      // });
      req.isGuest = true;
      next();
    }

    const decoded = await jwt.verify(token, process.env.JWT_SECRET);

    // Attempt to find user first
    req.user = await User.findById(decoded._id);

    // console.log("User is auth is ",req.user)

    // If user not found, try to find admin
    if (req.user === null) {
      req.admin = await Admin.findById(decoded._id);

      // console.log("Admin is auth is ",req.admin)
    }

    if (req.user === null && req.admin === null) {
      req.trader = await Trader.findById(decoded._id);
    }

    // console.log("After user and admin")

    // Check if either user or admin exists
    if (!req.user && !req.admin && !req.trader) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized access!',
      });
    }

    //res.locals.token = token;

    // const cookieOptions = {
    //   httpOnly: true, // For better security
    //   maxAge: 60 * 60 * 24 * 7, // 7 days in seconds
    // };
    
    // res.cookie('token', token, cookieOptions);
    
    next();
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
