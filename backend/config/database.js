const mongoose = require("mongoose");

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/SocialMedia';

exports.connectDatabase = () => {
  mongoose
    .connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((con) => console.log(`Database Connected : ${con.connection.host}`))
    .catch((err) => console.log(err));
};