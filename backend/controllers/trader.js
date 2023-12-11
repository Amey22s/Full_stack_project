const Trader = require('../models/Trader');
const Item = require('../models/Item');
const jwt = require('jsonwebtoken');
const cloudinary = require('cloudinary');
const bcrypt = require('bcrypt');

exports.loadTrader = async (req, res) => {
  try {
    const trader = await Trader.findById(req.trader._id).populate(
      'itemsSold itemsBought itemsInterested'
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
      return res.status(400).json({ message: 'Trader already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const myCloud = avatar
      ? await cloudinary.v2.uploader.upload(avatar, {
          folder: 'traders_avatars',
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
    // Find the trader by email
    const trader = await Trader.findOne({ email })
      .select('+password')
      .populate('itemsPosted itemsSold itemsBought itemsInterested');
    console.log(trader, 'inside loginTrader');
    // Check if trader exists
    if (!trader) {
      return res.status(400).json({
        success: false,
        message: 'Trader does not exist',
      });
    }

    // Check if password matches
    const isMatch = await trader.matchPassword(password);
    console.log(isMatch, 'is match');

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: 'Incorrect password',
      });
    }

    // Generate token for the trader
    const token = await trader.generateToken();
    console.log(token, 'token');

    const options = {
      expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    };
    console.log(options, 'options');

    // Send response with token
    res.status(200).cookie('token', token, options).json({
      success: true,
      trader,
      token,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
exports.logoutTrader = async (req, res) => {
  // The logout functionality generally depends on how you handle the authentication token.
  res.status(200).json({ message: 'Trader logged out successfully' });
};
