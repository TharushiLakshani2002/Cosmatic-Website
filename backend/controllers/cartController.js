const Cart = require('../models/Cart');
const Product = require('../models/Product');
const mongoose = require('mongoose');

// @desc    Get user's cart
// @route   GET /api/cart
// @access  Private
const getCart = async (req, res) => {
    try {
        const cart = await Cart.getCartWithProducts(req.user._id);

        if (!cart) {
            return res.json({
                cart: {
                    items: [],
                    totalAmount: 0,
                    totalItems: 0
                }
            });
        }

        // Filter out inactive products
        cart.items = cart.items.filter(item => item.product && item.product.isActive);

        res.json({ cart });

    } catch (error) {
        console.error('Get cart error:', error);
        res.status(500).json({
            message: 'Server error while fetching cart'
        });
    }
};

// @desc    Add item to cart
// @route   POST /api/cart/add
// @access  Private
const addToCart = async (req, res) => {
    try {
        const { productId, quantity = 1 } = req.body;

        // Validation
        if (!productId) {
            return res.status(400).json({
                message: 'Product ID is required'
            });
        }

        if (!mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(400).json({
                message: 'Invalid product ID'
            });
        }

        if (quantity < 1 || quantity > 10) {
            return res.status(400).json({
                message: 'Quantity must be between 1 and 10'
            });
        }

        // Check if product exists and is active
        const product = await Product.findOne({ _id: productId, isActive: true });

        if (!product) {
            return res.status(404).json({
                message: 'Product not found or unavailable'
            });
        }

        // Check stock availability
        if (product.stock < quantity) {
            return res.status(400).json({
                message: `Only ${product.stock} items available in stock`
            });
        }

        // Get or create cart
        const cart = await Cart.getOrCreateCart(req.user._id);

        // Check if item already exists in cart
        const existingItemIndex = cart.items.findIndex(
            item => item.product.toString() === productId
        );

        if (existingItemIndex >= 0) {
            const newQuantity = cart.items[existingItemIndex].quantity + quantity;

            // Check if new quantity exceeds stock
            if (newQuantity > product.stock) {
                return res.status(400).json({
                    message: `Cannot add ${quantity} more items. Only ${product.stock - cart.items[existingItemIndex].quantity} more available.`
                });
            }

            cart.items[existingItemIndex].quantity = newQuantity;
        } else {
            cart.items.push({
                product: productId,
                quantity,
                price: product.price
            });
        }

        await cart.save();

        // Populate cart with product details
        const updatedCart = await Cart.getCartWithProducts(req.user._id);

        res.json({
            message: 'Item added to cart successfully',
            cart: updatedCart
        });

    } catch (error) {
        console.error('Add to cart error:', error);
        res.status(500).json({
            message: 'Server error while adding item to cart'
        });
    }
};

// @desc    Update cart item quantity
// @route   PUT /api/cart/update
// @access  Private
const updateCartItem = async (req, res) => {
    try {
        const { productId, quantity } = req.body;

        // Validation
        if (!productId || quantity === undefined) {
            return res.status(400).json({
                message: 'Product ID and quantity are required'
            });
        }

        if (!mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(400).json({
                message: 'Invalid product ID'
            });
        }

        if (quantity < 0 || quantity > 10) {
            return res.status(400).json({
                message: 'Quantity must be between 0 and 10'
            });
        }

        // Get cart
        const cart = await Cart.getOrCreateCart(req.user._id);

        // Find item in cart
        const itemIndex = cart.items.findIndex(
            item => item.product.toString() === productId
        );

        if (itemIndex === -1) {
            return res.status(404).json({
                message: 'Item not found in cart'
            });
        }

        // If quantity is 0, remove item
        if (quantity === 0) {
            cart.items.splice(itemIndex, 1);
        } else {
            // Check product stock
            const product = await Product.findOne({ _id: productId, isActive: true });

            if (!product) {
                return res.status(404).json({
                    message: 'Product not found or unavailable'
                });
            }

            if (quantity > product.stock) {
                return res.status(400).json({
                    message: `Only ${product.stock} items available in stock`
                });
            }

            cart.items[itemIndex].quantity = quantity;
            cart.items[itemIndex].price = product.price; // Update price in case it changed
        }

        await cart.save();

        // Get updated cart with product details
        const updatedCart = await Cart.getCartWithProducts(req.user._id);

        res.json({
            message: 'Cart updated successfully',
            cart: updatedCart
        });

    } catch (error) {
        console.error('Update cart error:', error);
        res.status(500).json({
            message: 'Server error while updating cart'
        });
    }
};

// @desc    Remove item from cart
// @route   DELETE /api/cart/remove/:productId
// @access  Private
const removeFromCart = async (req, res) => {
    try {
        const { productId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(400).json({
                message: 'Invalid product ID'
            });
        }

        // Get cart
        const cart = await Cart.getOrCreateCart(req.user._id);

        // Find and remove item
        const initialLength = cart.items.length;
        cart.items = cart.items.filter(
            item => item.product.toString() !== productId
        );

        if (cart.items.length === initialLength) {
            return res.status(404).json({
                message: 'Item not found in cart'
            });
        }

        await cart.save();

        // Get updated cart with product details
        const updatedCart = await Cart.getCartWithProducts(req.user._id);

        res.json({
            message: 'Item removed from cart successfully',
            cart: updatedCart
        });

    } catch (error) {
        console.error('Remove from cart error:', error);
        res.status(500).json({
            message: 'Server error while removing item from cart'
        });
    }
};

// @desc    Clear cart
// @route   DELETE /api/cart/clear
// @access  Private
const clearCart = async (req, res) => {
    try {
        const cart = await Cart.getOrCreateCart(req.user._id);

        cart.items = [];
        await cart.save();

        res.json({
            message: 'Cart cleared successfully',
            cart: {
                items: [],
                totalAmount: 0,
                totalItems: 0
            }
        });

    } catch (error) {
        console.error('Clear cart error:', error);
        res.status(500).json({
            message: 'Server error while clearing cart'
        });
    }
};

// @desc    Get cart summary
// @route   GET /api/cart/summary
// @access  Private
const getCartSummary = async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.user._id, isActive: true });

        if (!cart) {
            return res.json({
                totalItems: 0,
                totalAmount: 0
            });
        }

        res.json({
            totalItems: cart.totalItems,
            totalAmount: cart.totalAmount,
            formattedTotal: cart.formattedTotal
        });

    } catch (error) {
        console.error('Get cart summary error:', error);
        res.status(500).json({
            message: 'Server error while fetching cart summary'
        });
    }
};

module.exports = {
    getCart,
    addToCart,
    updateCartItem,
    removeFromCart,
    clearCart,
    getCartSummary
};