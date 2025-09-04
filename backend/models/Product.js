const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Product name is required'],
        trim: true,
        minlength: [2, 'Product name must be at least 2 characters long'],
        maxlength: [100, 'Product name cannot exceed 100 characters']
    },
    description: {
        type: String,
        required: [true, 'Product description is required'],
        trim: true,
        minlength: [10, 'Description must be at least 10 characters long'],
        maxlength: [1000, 'Description cannot exceed 1000 characters']
    },
    price: {
        type: Number,
        required: [true, 'Product price is required'],
        min: [0, 'Price cannot be negative']
    },
    originalPrice: {
        type: Number,
        default: null,
        min: [0, 'Original price cannot be negative']
    },
    category: {
        type: String,
        required: [true, 'Product category is required'],
        enum: [
            'skincare',
            'makeup',
            'fragrance',
            'haircare',
            'bodycare',
            'tools',
            'sets',
            'trending'
        ]
    },
    subcategory: {
        type: String,
        required: [true, 'Product subcategory is required'],
        trim: true
    },
    brand: {
        type: String,
        required: [true, 'Product brand is required'],
        trim: true
    },
    images: [{
        type: String,
        required: true
    }],
    mainImage: {
        type: String,
        required: [true, 'Main product image is required']
    },
    stock: {
        type: Number,
        required: [true, 'Stock quantity is required'],
        min: [0, 'Stock cannot be negative'],
        default: 0
    },
    isActive: {
        type: Boolean,
        default: true
    },
    isFeatured: {
        type: Boolean,
        default: false
    },
    isOnSale: {
        type: Boolean,
        default: false
    },
    specifications: {
        weight: String,
        volume: String,
        skinType: [String],
        ingredients: [String],
        benefits: [String],
        howToUse: String
    },
    ratings: {
        average: {
            type: Number,
            default: 0,
            min: 0,
            max: 5
        },
        count: {
            type: Number,
            default: 0,
            min: 0
        }
    },
    tags: [String],
    seoTitle: String,
    seoDescription: String,
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
productSchema.index({ name: 'text', description: 'text', brand: 'text' });
productSchema.index({ category: 1, subcategory: 1 });
productSchema.index({ price: 1 });
productSchema.index({ isActive: 1, isFeatured: 1 });
productSchema.index({ createdAt: -1 });

// Virtual for discount percentage
productSchema.virtual('discountPercentage').get(function() {
    if (this.originalPrice && this.originalPrice > this.price) {
        return Math.round(((this.originalPrice - this.price) / this.originalPrice) * 100);
    }
    return 0;
});

// Virtual for stock status
productSchema.virtual('stockStatus').get(function() {
    if (this.stock === 0) return 'out-of-stock';
    if (this.stock <= 5) return 'low-stock';
    return 'in-stock';
});

// Static method to get featured products
productSchema.statics.getFeatured = function(limit = 8) {
    return this.find({ isActive: true, isFeatured: true })
        .sort({ createdAt: -1 })
        .limit(limit);
};

// Static method to get products by category
productSchema.statics.getByCategory = function(category, limit = 12) {
    return this.find({ isActive: true, category })
        .sort({ createdAt: -1 })
        .limit(limit);
};

// Static method to search products
productSchema.statics.search = function(query, options = {}) {
    const {
        category,
        minPrice,
        maxPrice,
        sortBy = 'createdAt',
        sortOrder = -1,
        limit = 12,
        skip = 0
    } = options;

    let searchQuery = {
        isActive: true,
        $text: { $search: query }
    };

    if (category) searchQuery.category = category;
    if (minPrice !== undefined) searchQuery.price = { ...searchQuery.price, $gte: minPrice };
    if (maxPrice !== undefined) searchQuery.price = { ...searchQuery.price, $lte: maxPrice };

    return this.find(searchQuery)
        .sort({ [sortBy]: sortOrder })
        .skip(skip)
        .limit(limit);
};

// Ensure virtual fields are serialized
productSchema.set('toJSON', { virtuals: true });
productSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('Product', productSchema);