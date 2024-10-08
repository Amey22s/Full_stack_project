const Admin = require("../models/Admin");
const User = require("../models/User");
const Post = require("../models/Post");

const crypto = require("crypto");
const cloudinary = require("cloudinary");

// Admin login function
exports.adminLogin = async (req, res) => {
    try {
      const { email, password } = req.body;

      console.log("Email is ",email," password is ",password);
  
      const admin = await Admin.findOne({ email }).select("+password");

      console.log("Admin is ",admin);

  
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

      console.log("Token generated in adminlogin is ",token)
  
      console.log("token in admin login is ",token)
      const options = {
        expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };

      // console.log("Before status 200");
  
      res.status(200).cookie("token", token, options).json({
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

  exports.myProfile = async (req, res) => {
    try {
      console.log("admin my profile = " + JSON.stringify(req.admin));
      const admin = await Admin.findById(req.admin._id);
  
      res.status(200).json({
        success: true,
        admin,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

  exports.logoutAdmin = async (req, res) => {
    try {
      res
        .status(200)
        .cookie("token", null, { expires: new Date(Date.now()), httpOnly: true })
        .json({
          success: true,
          message: "Logged out",
        });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

  exports.getAllUsersForAdmin = async (req, res) => {
    try {
      // const users = await User.find({
      //   name: { $regex: new RegExp("^" + req.query.name + ".*", "i") },
      // });

      const users = await User.find();
  
      res.status(200).json({
        success: true,
        users,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

  // exports.deleteMyProfile = async (req, res) => {
  //   try {
  //     console.log("user info inside admin = ", req.params.id);
  //     const id = req.params.id;
  //     const user = await User.findById(req.user._id);
  //     const posts = user.posts;
  //     const followers = user.followers;
  //     const following = user.following;
  //     const userId = user._id;
  
  //     // Removing Avatar from cloudinary
  //     await cloudinary.v2.uploader.destroy(user.avatar.public_id);
  
  //     await user.remove();
  
  //     // Logout user after deleting profile
  
  //     res.cookie("token", null, {
  //       expires: new Date(Date.now()),
  //       httpOnly: true,
  //     });
  
  //     // Delete all posts of the user
  //     for (let i = 0; i < posts.length; i++) {
  //       const post = await Post.findById(posts[i]);
  //       await cloudinary.v2.uploader.destroy(post.image.public_id);
  //       await post.remove();
  //     }
  
  //     // Removing User from Followers Following
  //     for (let i = 0; i < followers.length; i++) {
  //       const follower = await User.findById(followers[i]);
  
  //       const index = follower.following.indexOf(userId);
  //       follower.following.splice(index, 1);
  //       await follower.save();
  //     }
  
  //     // Removing User from Following's Followers
  //     for (let i = 0; i < following.length; i++) {
  //       const follows = await User.findById(following[i]);
  
  //       const index = follows.followers.indexOf(userId);
  //       follows.followers.splice(index, 1);
  //       await follows.save();
  //     }
  
  //     // removing all comments of the user from all posts
  //     const allPosts = await Post.find();
  
  //     for (let i = 0; i < allPosts.length; i++) {
  //       const post = await Post.findById(allPosts[i]._id);
  
  //       for (let j = 0; j < post.comments.length; j++) {
  //         if (post.comments[j].user === userId) {
  //           post.comments.splice(j, 1);
  //         }
  //       }
  //       await post.save();
  //     }
  //     // removing all likes of the user from all posts
  
  //     for (let i = 0; i < allPosts.length; i++) {
  //       const post = await Post.findById(allPosts[i]._id);
  
  //       for (let j = 0; j < post.likes.length; j++) {
  //         if (post.likes[j] === userId) {
  //           post.likes.splice(j, 1);
  //         }
  //       }
  //       await post.save();
  //     }
  
  //     res.status(200).json({
  //       success: true,
  //       message: "Profile Deleted",
  //     });
  //   } catch (error) {
  //     res.status(500).json({
  //       success: false,
  //       message: error.message,
  //     });
  //   }
  // };
  
  exports.deleteMyProfile = async (req, res) => {
    try {
      console.log("user profile in admin = ", req.params.id);
      const id = req.params.id;
  
      // Find the user by ID
      const user = await User.findById(id);
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }
  
      // Get associated data
      const posts = user.posts;
      const followers = user.followers;
      const following = user.following;
      const userId = user._id;
  
      // Remove avatar from cloudinary
      await cloudinary.v2.uploader.destroy(user.avatar.public_id);
  
      // Delete user document
      await User.deleteOne({ _id: user._id }); // Use deleteOne with ID
  
      // Delete all posts of the user
      await Post.deleteMany({ _id: { $in: posts } }); // Use deleteMany with ID array
  
      // Remove User from Followers' Following
      for (let i = followers.length - 1; i >= 0; i--) {
        const follower = await User.findById(followers[i]);
  
        const index = follower.following.indexOf(userId);
        if (index !== -1) {
          follower.following.splice(index, 1);
          await follower.save(); // Save follower document after update
        }
      }
  
      // Remove User from Following's Followers
      for (let i = following.length - 1; i >= 0; i--) {
        const follows = await User.findById(following[i]);
  
        const index = follows.followers.indexOf(userId);
        if (index !== -1) {
          follows.followers.splice(index, 1);
          await follows.save(); // Save follows document after update
        }
      }
  
      // Remove user comments from all posts
      await Post.updateMany({}, { $pull: { comments: { user: userId } } }); // Use updateMany with pull operator
  
      // Remove user likes from all posts
      await Post.updateMany({}, { $pull: { likes: userId } }); // Use updateMany with pull operator
  
      // Logout user after deleting profile
      res.cookie("token", null, { expires: new Date(Date.now()), httpOnly: true });
  
      res.status(200).json({
        success: true,
        message: "Profile Deleted",
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };