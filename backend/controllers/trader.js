const Trader = require("../models/Trader");
const Item = require("../models/Item");
const jwt = require("jsonwebtoken");
const cloudinary = require("cloudinary");
const bcrypt = require("bcrypt");

exports.loadTrader = async (req, res) => {
  try {
    const trader = await Trader.findById(req.trader._id).populate(
      "itemsSold itemsBought itemsInterested"
    );

    res.status(200).json({
      success: true,
      trader,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.registerTrader = async (req, res) => {
  try {
    const { name, email, password, avatar } = req.body;
    let trader = await Trader.findOne({ email });
    if (trader) {
      return res.status(400).json({ message: "Trader already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const myCloud = avatar
      ? await cloudinary.v2.uploader.upload(avatar, {
          folder: "traders_avatars",
        })
      : null;

    trader = new Trader({
      name,
      email,
      password: hashedPassword,
      avatar: myCloud
        ? { public_id: myCloud.public_id, url: myCloud.secure_url }
        : undefined,
      // Initialize arrays
      itemsPosted: [],
      itemsSold: [],
      itemsBought: [],
      itemsInterested: [],
    });

    await trader.save();

    const token = jwt.sign({ id: trader._id }, process.env.JWT_SECRET);
    res.status(201).json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.loginTrader = async (req, res) => {
  try {
    const { email, password } = req.body;
    const trader = await Trader.findOne({ email }).select("+password");
    if (!trader) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, trader.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: trader._id }, process.env.JWT_SECRET);
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.logoutTrader = async (req, res) => {
  // The logout functionality generally depends on how you handle the authentication token.
  res.status(200).json({ message: "Trader logged out successfully" });
};
