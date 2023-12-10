const express = require('express');
const { createItem, markInterest, sellItem } = require('../controllers/item');
const { isAuthenticated } = require('../middlewares/auth');

const router = express.Router();

router.route('/create').post(isAuthenticated, createItem);
router.route('/:id/interest').put(isAuthenticated, markInterest);
router.route('/:id/sell').put(isAuthenticated, sellItem);

module.exports = router;
