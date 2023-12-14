const Trader = require('../models/Trader');
const Item = require('../models/Item');
const jwt = require('jsonwebtoken');
const cloudinary = require('cloudinary');
const bcrypt = require('bcrypt');
//const { traderLogin } = require('../../frontend/src/Actions/Trader');

exports.loadTrader = async (req, res) => {
  try {
    const trader = await Trader.findById(req.trader._id).populate(
      'itemsSold itemsBought itemsInterested'
    );
    console.log('Inside loaad trader', trader);

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

    const myCloud = avatar
      ? await cloudinary.v2.uploader.upload(avatar, {
          folder: 'traders_avatars',
        })
      : null;

    trader = await Trader.create({
      name,
      email,
      password,
      avatar: myCloud
        ? { public_id: myCloud.public_id, url: myCloud.secure_url }
        : undefined,
      // Initialize arrays
      itemsPosted: [],
      itemsSold: [],
      itemsBought: [],
      itemsInterested: [],
    });

    const token = await trader.generateToken();

    //const token = jwt.sign({ id: trader._id }, process.env.JWT_SECRET);
    const options = {
      expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    };
    res.status(201).cookie('token', token, options).json({
      success: true,
      user,
      token,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
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
    console.log(password);
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
  try {
    res
      .status(200)
      .cookie('token', null, { expires: new Date(Date.now()), httpOnly: true })
      .json({
        success: true,
        message: 'Logged out',
      });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getTrader = async (req, res) => {
  try {
    console.log(req.params.id, 'id in get trader controller');
    const trader = await Trader.findById(req.params.id).populate(
      'itemsPosted itemsSold itemsBought itemsInterested'
    );
    console.log(trader, 'inside get trader controller');

    if (!trader) {
      return res.status(404).json({
        success: false,
        message: 'Trader not found',
      });
    }

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

exports.getTraderApprovalRequests = async (req, res) => {
  try {
    console.log('reached');
    const traderId = req.params.traderId;
    console.log('Inside controller id', traderId);
    const trader = await Trader.findById(traderId)
      .populate({
        path: 'approvalRequests',
        populate: {
          path: 'itemId',
          model: 'Item',
        },
      })
      .populate({
        path: 'approvalRequests',
        populate: {
          path: 'buyerId',
          model: 'Trader',
          select: 'name', // Select only necessary fields like 'name'
        },
      });
    console.log('inside controller trader', trader);
    if (!trader) {
      return res.status(404).json({ message: 'Trader not found' });
    }
    res.json({ success: true, approvalRequests: trader.approvalRequests });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
