const express = require('express');
const {
  registerTrader,
  loginTrader,
  logoutTrader,
} = require('../controllers/trader');
const { isAuthenticated } = require('../middlewares/auth');

const router = express.Router();

// Register a new trader
router.post('/register', registerTrader);

// Trader login
router.post('/login', loginTrader);

// Trader logout
router.get('/logout', isAuthenticated, logoutTrader);

module.exports = router;
