// back-end/models/menuItem.js
const mongoose = require('mongoose');

const shoppingItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Shopping item name is required'],
        trim: true,
        maxLength: [100, 'Name cannot exceed 100 characters']
    },
    category: {
        type: String,
        required: [true, 'Category is required'],
        enum: ['shirt', 'skirt', 'trouser', 'blouse', 'slippers', 'mackups'],
        lowercase: true
    },
    price: {
        type: Number,
        required: [true, 'Price is required'],
        min: [0, 'Price cannot be negative']
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
        maxLength: [500, 'Description cannot exceed 500 characters']
    },
    longDescription: {
        type: String,
        maxLength: [2000, 'Long description cannot exceed 2000 characters']
    },
    image: {
        type: String,
        required: [true, 'Image URL is required']
    },
    ingredients: [{
        type: String,
        trim: true
    }],
    nutritionalInfo: {
        nool: { type: Number, min: 0 },
        button: { type: Number, min: 0 },
        wools: { type: Number, min: 0 },
        rubber: { type: Number, min: 0 },
        silik: { type: Number, min: 0 },
        type: Boolean,
        default: false
    },
    tags: [{
        type: String,
        trim: true
    }],
    preparationTime: {
        type: Number, // in minutes
        min: 0
    },
    servingSize: {
        type: String
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    updatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
});

// Indexes for better query performance
shoppingItemSchema.index({ name: 'text', description: 'text' });
shoppingItemSchema.index({ category: 1, isAvailable: 1 });
shoppingItemSchema.index({ price: 1 });
shoppingItemSchema.index({ isPopular: 1 });

// Virtual for formatted price
shoppingItemSchema.virtual('formattedPrice').get(function() {
    return `$${this.price.toFixed(2)}`;
});

// Method to check if item has allergen
shoppingItemSchema.methods.hasAllergen = function(allergen) {
    return this.allergens.includes(allergen.toLowerCase());
};

// Static method to get items by category
shoppingItemSchema.statics.getByCategory = function(category) {
    return this.find({ category: category.toLowerCase(), isAvailable: true });
};

// Static method to get popular items
shoppingItemSchema.statics.getPopular = function(limit = 10) {
    return this.find({ isPopular: true, isAvailable: true }).limit(limit);
};

module.exports = mongoose.model('ShoppingItem', shoppingItemSchema);