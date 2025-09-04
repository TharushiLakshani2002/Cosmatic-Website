const express = require('express');
const { auth } = require('../middleware/auth');
const {
    getCart,
    addToCart,
    updateCartItem,
    removeFromCart,
    clearCart,
    getCartSummary
} = require('../controllers/cartController');

const router = express.Router();

// All cart routes require authentication
router.use(auth);

// @route   GET /api/cart
// @desc    Get user's cart
// @access  Private
router.get('/', getCart);

// @route   GET /api/cart/summary
// @desc    Get cart summary
// @access  Private
router.get('/summary', getCartSummary);

// @route   POST /api/cart/add
// @desc    Add item to cart
// @access  Private
router.post('/add', addToCart);

// @route   PUT /api/cart/update
// @desc    Update cart item quantity
// @access  Private
router.put('/update', updateCartItem);

// @route   DELETE /api/cart/remove/:productId
// @desc    Remove item from cart
// @access  Private
router.delete('/remove/:productId', removeFromCart);

// @route   DELETE /api/cart/clear
// @desc    Clear cart
// @access  Private
router.delete('/clear', clearCart);

module.exports = router;