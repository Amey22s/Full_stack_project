const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  caption: {
    type: String,
    required: [true, 'Please enter a caption for the item'],
  },
  image: {
    public_id: String,
    url: String,
  },
  price: {
    type: Number,
    required: [true, 'Please enter a price for the item'],
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  status: {
    type: String,
    enum: ['available', 'pending', 'sold'],
    default: 'available',
  },
  interestedBuyers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  soldTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Item', itemSchema);
