const express = require('express');
const {
  registerTrader,
  loginTrader,
  logoutTrader,
  loadTrader,
  getTrader,
} = require('../controllers/trader');
const { isAuthenticated } = require('../middlewares/auth');

const router = express.Router();

// Register a new trader
router.post('/register', registerTrader);

// Trader login
router.post('/login', loginTrader);

// Trader logout
router.get('/logout', isAuthenticated, logoutTrader);

// Load Trader
router.get('/loadTrader', isAuthenticated, loadTrader);
router.get('/:id', isAuthenticated, getTrader);

module.exports = router;
