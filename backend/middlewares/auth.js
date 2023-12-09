const User = require("../models/User");
const jwt = require("jsonwebtoken");

exports.isAuthenticated = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    console.log("Token is ",token);
    if (typeof(token) === "undefined") {
      res.status(401).json({
        success: false,
        message: "Please login !",
      });
    }
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded._id);

    next();
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
