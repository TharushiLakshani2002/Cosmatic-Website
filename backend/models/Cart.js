const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: [1, 'Quantity must be at least 1'],
        default: 1
    },
    price: {
        type: Number,
        required: true,
        min: [0, 'Price cannot be negative']
    }
}, {
    _id: false
});

const cartSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },
    items: [cartItemSchema],
    totalAmount: {
        type: Number,
        default: 0,
        min: [0, 'Total amount cannot be negative']
    },
    totalItems: {
        type: Number,
        default: 0,
        min: [0, 'Total items cannot be negative']
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

// Index for user for faster queries
cartSchema.index({ user: 1 });

// Pre-save middleware to calculate totals
cartSchema.pre('save', function(next) {
    if (this.items && this.items.length > 0) {
        this.totalItems = this.items.reduce((total, item) => total + item.quantity, 0);
        this.totalAmount = this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    } else {
        this.totalItems = 0;
        this.totalAmount = 0;
    }
    next();
});

// Instance method to add item to cart
cartSchema.methods.addItem = function(productId, quantity, price) {
    const existingItemIndex = this.items.findIndex(
        item => item.product.toString() === productId.toString()
    );

    if (existingItemIndex >= 0) {
        // Update existing item quantity
        this.items[existingItemIndex].quantity += quantity;
    } else {
        // Add new item
        this.items.push({
            product: productId,
            quantity,
            price
        });
    }

    return this.save();
};

// Instance method to update item quantity
cartSchema.methods.updateItemQuantity = function(productId, quantity) {
    const itemIndex = this.items.findIndex(
        item => item.product.toString() === productId.toString()
    );

    if (itemIndex >= 0) {
        if (quantity <= 0) {
            // Remove item if quantity is 0 or negative
            this.items.splice(itemIndex, 1);
        } else {
            this.items[itemIndex].quantity = quantity;
        }
        return this.save();
    }

    throw new Error('Item not found in cart');
};

// Instance method to remove item from cart
cartSchema.methods.removeItem = function(productId) {
    this.items = this.items.filter(
        item => item.product.toString() !== productId.toString()
    );
    return this.save();
};

// Instance method to clear cart
cartSchema.methods.clearCart = function() {
    this.items = [];
    return this.save();
};

// Static method to get or create cart for user
cartSchema.statics.getOrCreateCart = async function(userId) {
    let cart = await this.findOne({ user: userId, isActive: true }).populate('items.product');

    if (!cart) {
        cart = new this({ user: userId });
        await cart.save();
    }

    return cart;
};

// Static method to get cart with populated products
cartSchema.statics.getCartWithProducts = function(userId) {
    return this.findOne({ user: userId, isActive: true })
        .populate({
            path: 'items.product',
            select: 'name price mainImage stock isActive'
        });
};

// Virtual for formatted total amount
cartSchema.virtual('formattedTotal').get(function() {
    return this.totalAmount.toFixed(2);
});

// Ensure virtual fields are serialized
cartSchema.set('toJSON', { virtuals: true });
cartSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('Cart', cartSchema);