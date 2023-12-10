const mongoose = require('mongoose');

const traderSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    public_id: String,
    url: String,
  },
  itemsPosted: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Item',
    },
  ],
  itemsSold: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Item',
    },
  ],
  itemsBought: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Item',
    },
  ],
  itemsInterested: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Item',
    },
  ],
  // Additional fields such as address, contact info, etc., can be added here
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Password hashing and other methods can be added here

module.exports = mongoose.model('Trader', traderSchema);
