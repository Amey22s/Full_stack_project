const Item = require('../models/Item');
const User = require('../models/User');
const cloudinary = require('cloudinary');

exports.createItem = async (req, res) => {
  try {
    const { caption, price } = req.body;

    const myCloud = await cloudinary.v2.uploader.upload(req.body.image, {
      folder: 'marketplace',
    });

    const newItem = await Item.create({
      caption,
      price,
      image: {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      },
      owner: req.user._id,
    });

    res.status(201).json({
      success: true,
      item: newItem,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.markInterest = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Item not found',
      });
    }

    if (item.interestedBuyers.includes(req.user._id)) {
      return res.status(400).json({
        success: false,
        message: 'You have already shown interest in this item',
      });
    }

    item.interestedBuyers.push(req.user._id);

    await item.save();

    res.status(200).json({
      success: true,
      message: 'Interest marked',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.sellItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Item not found',
      });
    }

    if (item.owner.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized',
      });
    }

    if (!item.interestedBuyers.includes(req.body.buyerId)) {
      return res.status(400).json({
        success: false,
        message: 'Buyer not interested in this item',
      });
    }

    item.status = 'sold';
    item.soldTo = req.body.buyerId;

    await item.save();

    res.status(200).json({
      success: true,
      message: 'Item sold',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
