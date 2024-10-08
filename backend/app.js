
const express = require("express");
const cors = require('cors');

const app = express();
const cookieParser = require('cookie-parser');
const path = require('path');
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config({ path: 'backend/config/config.env' });
}

// Using Middlewares
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cookieParser());

app.use(cors({
  credentials: true,
  origin: process.env.FRONTEND_URL
}));

// Importing Routes

const item = require('./routes/item');
const trader = require('./routes/trader');


app.use('/api/marketplace', item);
app.use('/api/trader', trader);

const post = require("./routes/post");
const user = require("./routes/user");
const msg = require("./routes/message");
const admin = require("./routes/admin");

// Using Routes
app.use("/api/v1", post);
app.use("/api/v1", user);
app.use("/api/v1/", msg);
app.use("/api/v1", admin);



app.use(express.static(path.join(__dirname, '../frontend/build')));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../frontend/build/index.html'));
});

module.exports = app;
