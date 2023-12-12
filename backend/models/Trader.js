const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

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
  resetPasswordToken: String,
  resetPasswordExpire: Date,
});
// Hash the password before saving the trader document
traderSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

// traderSchema.pre('save', async function (next) {
//   if (this.isModified('password')) {
//     const salt = await bcrypt.genSalt(10);
//     this.password = await bcrypt.hash(this.password, salt);
//   }
//   next();
// });

// // Method to compare provided password with the hashed password in the database
// traderSchema.methods.matchPassword = async function (password) {
//   console.log('inside match passsword trader password received is', password);
//   console.log('this password is ', this.password);
//   console.log(bcrypt.compare(password, this.password));
//   return await bcrypt.compare(password, this.password);
// };
traderSchema.methods.matchPassword = async function (enteredPassword) {
  console.log('Entered password:', enteredPassword);
  console.log('Stored hashed password:', this.password);

  const isMatch = await bcrypt.compare(enteredPassword, this.password);
  console.log('Is match:', isMatch);

  return isMatch;
};

// Method to generate a JWT token
traderSchema.methods.generateToken = function () {
  return jwt.sign({ _id: this._id }, process.env.JWT_SECRET);
};

// Method to generate a password reset token
traderSchema.methods.getResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(20).toString('hex');

  // Hash the reset token and set the reset password expire time
  this.resetPasswordToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');
  this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

module.exports = mongoose.model('Trader', traderSchema);
