const Item = require('../models/Item');
const Trader = require('../models/Trader');
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
      owner: req.trader._id,
    });
    // Find the trader and add the newly created item's ID to itemsPosted
    const trader = await Trader.findById(req.trader._id);
    if (trader) {
      trader.itemsPosted.push(newItem._id);
      await trader.save();
    }
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
    const buyerId = req.trader._id;
    console.log(item, 'item');
    console.log(req, 'request');
    console.log(req.trader, 'request.trader');
    const trader = await Trader.findById(req.trader._id);
    console.log('Inside markIntereset', item, trader);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Item not found',
      });
    }

    console.log('Item found');

    if (item.interestedBuyers.includes(req.trader._id)) {
      return res.status(400).json({
        success: false,
        message: 'You have already shown interest in this item',
      });
    }
    console.log('Showing interest');

    item.interestedBuyers.push(req.trader._id);
    console.log('interestedBuyers updated');

    await item.save();
    // Find the owner of the item and add the item to their approvalRequests
    const owner = await Trader.findById(item.owner);
    if (!owner.approvalRequests.includes(item._id)) {
      owner.approvalRequests.push({ itemId: item._id, buyerId: buyerId });
      await owner.save();
    }
    console.log('save and before update iteminterested');
    // Also update the trader's itemsInterested if the trader exists
    if (trader && !trader.itemsInterested.includes(item._id)) {
      trader.itemsInterested.push(item._id);
      await trader.save();
    }
    console.log('itemsInterested updated');

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
    const { id } = req.params;
    const { buyerId } = req.body;
    const item = await Item.findById(id);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Item not found',
      });
    }

    if (item.owner.toString() !== req.trader._id.toString()) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized',
      });
    }
    if (item.status === 'sold') {
      return res.status(400).json({
        success: false,
        message: 'Already Sold',
      });
    }

    if (!item.interestedBuyers.includes(buyerId)) {
      return res.status(400).json({
        success: false,
        message: 'Buyer not interested in this item',
      });
    }

    item.status = 'sold';
    item.soldTo = buyerId;

    await item.save();
    // Update seller (owner)
    const seller = await Trader.findById(req.trader._id);
    seller.itemsSold.push(id);
    seller.approvalRequests = seller.approvalRequests.filter(
      (request) =>
        request.itemId.toString() !== id &&
        request.buyerId.toString() !== buyerId
    );
    await seller.save();

    // Update buyer
    const buyer = await Trader.findById(buyerId);
    buyer.itemsBought.push(id);

    await buyer.save();
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
exports.declineSale = async (req, res) => {
  try {
    const { id } = req.params;
    const { buyerId } = req.body;

    const item = await Item.findById(id);
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    if (!item.owner.equals(req.user._id)) {
      return res.status(403).json({
        message: 'You are not authorized to decline interest on this item',
      });
    }

    item.interestedBuyers = item.interestedBuyers.filter(
      (id) => !id.equals(buyerId)
    );

    await item.save();
    // Remove the item from seller's approvalRequests
    const seller = await Trader.findById(item.owner);
    seller.approvalRequests = seller.approvalRequests.filter(
      (request) =>
        request.itemId.toString() !== id &&
        request.buyerId.toString() !== buyerId
    );
    await seller.save();

    res.status(200).json({ message: 'Interest declined successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all items that are on sale (not posted by the current user)
exports.getItemsOnSale = async (req, res) => {
  try {
    console.log(req, 'request');
    const items = await Item.find({
      owner: { $ne: req.trader._id },
      status: 'available',
    }).sort({ createdAt: -1 });
    console.log(items, 'inside itemsonsale controller');
    res.json({ success: true, items });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all items posted by the current user
exports.getMyItems = async (req, res) => {
  try {
    const items = await Item.find({ owner: req.trader._id })
      .populate('soldTo', 'name')
      .sort({
        createdAt: -1,
      });
    res.json({ success: true, items });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
