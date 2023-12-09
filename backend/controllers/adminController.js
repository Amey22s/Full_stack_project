const Admin = require("../models/Admin");
const crypto = require("crypto");
const cloudinary = require("cloudinary");

// Admin login function
exports.adminLogin = async (req, res) => {
    try {
      const { email, password } = req.body;

      console.log("email pwd in admin login is ",email," ",password)
      const admin = await Admin.findOne({ email }).select("+password");

      console.log("admin in admin login is ",admin)
  
      if (!admin) {
        return res.status(400).json({
          success: false,
          message: "Invalid username",
        });
      }
  
      const isMatch = await admin.matchPassword(password);
  
      if (!isMatch) {
        return res.status(400).json({
          success: false,
          message: "Invalid password",
        });
      }
  
      console.log("before login in admin login")
      const token = await admin.generateToken();
  
      console.log("token in admin login is ",token)
      const options = {
        expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };
  
      res.status(200).cookie("admin_token", token, options).json({
        success: true,
        admin,
        token,
      });
    } catch (error) {


      console.log("error in admin login is ",error)
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

  //admin register once
  exports.registerAdmin = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      let existingAdmin = await Admin.findOne({ email });
      if (existingAdmin) {
        return res.status(400).json({
          success: false,
          message: "Admin with this email already exists",
        });
      }
  
      const newAdmin = await Admin.create({
        email,
        password,
      });
  
      const token = await newAdmin.generateToken();
  
      const options = {
        expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };
  
      res.status(201).cookie("admin_token", token, options).json({
        success: true,
        message: "Admin registered successfully",
        admin: newAdmin,
        token,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };
  