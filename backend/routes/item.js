const express = require('express');
const {
  getItemsOnSale,
  getMyItems,
  getApprovalRequests,
  createItem,
  markInterest,
  sellItem,
  declineSale,
} = require('../controllers/item');
const { isAuthenticated } = require('../middlewares/auth');

const router = express.Router();

// Route for creating an item
router.route('/create').post(isAuthenticated, createItem);

// Route for getting items on sale
router.route('/onSale').get(isAuthenticated, getItemsOnSale);

// Route for getting a user's items
router.route('/myItems').get(isAuthenticated, getMyItems);

// Route for getting approval requests
router.route('/approvalRequests').get(isAuthenticated, getApprovalRequests);

// Route for marking interest in an item
router.route('/:id/interest').put(isAuthenticated, markInterest);

// Route for selling an item (approving a buyer)
router.route('/:id/sell').put(isAuthenticated, sellItem);

// Route for decline sale
router.route(':id/decline').put(isAuthenticated, declineSale);

module.exports = router;
