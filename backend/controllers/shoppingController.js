// back-end/controllers/shoppingController.js
const ShoppingItem = require('../models/shoppingItem');
const { validationResult } = require('express-validator');

// @desc    Get all Shopping items
// @route   GET /api/shopping
// @access  Public
exports.getAllShoppingItems = async (req, res) => {
    try {
        const {
            category,
            search,
            minPrice,
            maxPrice,
            isAvailable,
            isPopular,
            allergens,
            sort = '-createdAt',
            page = 1,
            limit = 20
        } = req.query;

        let query = {};

        if (category && category !== 'all') {
            query.category = category.toLowerCase();
        }

        if (search) {
            query.$text = { $search: search };
        }

        if (minPrice || maxPrice) {
            query.price = {};
            if (minPrice) query.price.$gte = parseFloat(minPrice);
            if (maxPrice) query.price.$lte = parseFloat(maxPrice);
        }

        if (isAvailable !== undefined) {
            query.isAvailable = isAvailable === 'true';
        }

        if (isPopular !== undefined) {
            query.isPopular = isPopular === 'true';
        }

        if (allergens) {
            const allergenList = allergens.split(',');
            query.allergens = { $nin: allergenList };
        }

        const startIndex = (page - 1) * limit;
        const total = await ShoppingItem.countDocuments(query);

        const shoppingItems = await ShoppingItem.find(query)
            .sort(sort)
            .limit(parseInt(limit))
            .skip(startIndex)
            .populate('createdBy updatedBy', 'name');

        res.json({
            success: true,
            count: shoppingItems.length,
            total,
            pagination: {
                page: parseInt(page),
                limit: parseInt(limit),
                pages: Math.ceil(total / limit)
            },
            data: shoppingItems
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

// @desc    Get single Shopping item
// @route   GET /api/shopping/:id
// @access  Public
exports.getShoppingItem = async (req, res) => {
    try {
        const shoppingItem = await ShoppingItem.findById(req.params.id)
            .populate('createdBy updatedBy', 'name email');

        if (!shoppingItem) {
            return res.status(404).json({
                success: false,
                message: 'Shopping item not found'
            });
        }

        res.json({
            success: true,
            data: shoppingItem
        });
    } catch (error) {
        if (error.kind === 'ObjectId') {
            return res.status(404).json({
                success: false,
                message: 'Shopping item not found'
            });
        }
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

// @desc    Create Shopping item
// @route   POST /api/shopping
// @access  Private/Admin
exports.createShoppingItem = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array()
            });
        }

        req.body.createdBy = req.user.id;

        const shoppingItem = await ShoppingItem.create(req.body);

        res.status(201).json({
            success: true,
            message: 'Shopping item created successfully',
            data: shoppingItem
        });
    } catch (error) {
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({
                success: false,
                message: 'Validation error',
                errors: messages
            });
        }
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

// @desc    Update Shopping item
// @route   PUT /api/shopping/:id
// @access  Private/Admin
exports.updateShoppingItem = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array()
            });
        }

        req.body.updatedBy = req.user.id;

        const shoppingItem = await ShoppingItem.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!shoppingItem) {
            return res.status(404).json({
                success: false,
                message: 'Shopping item not found'
            });
        }

        res.json({
            success: true,
            message: 'Shopping item updated successfully',
            data: shoppingItem
        });
    } catch (error) {
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({
                success: false,
                message: 'Validation error',
                errors: messages
            });
        }
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

// @desc    Delete Shopping item
// @route   DELETE /api/shopping/:id
// @access  Private/Admin
exports.deleteShoppingItem = async (req, res) => {
    try {
        const shoppingItem = await ShoppingItem.findByIdAndDelete(req.params.id);

        if (!shoppingItem) {
            return res.status(404).json({
                success: false,
                message: 'Shopping item not found'
            });
        }

        res.json({
            success: true,
            message: 'Shopping item deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

// @desc    Toggle Shopping item availability
// @route   PATCH /api/shopping/:id/availability
// @access  Private/Staff
exports.toggleAvailability = async (req, res) => {
    try {
        const shoppingItem = await ShoppingItem.findById(req.params.id);

        if (!shoppingItem) {
            return res.status(404).json({
                success: false,
                message: 'Shopping item not found'
            });
        }

        shoppingItem.isAvailable = !shoppingItem.isAvailable;
        shoppingItem.updatedBy = req.user.id;
        await shoppingItem.save();

        res.json({
            success: true,
            message: `Shopping item ${shoppingItem.isAvailable ? 'enabled' : 'disabled'} successfully`,
            data: shoppingItem
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

// @desc    Get shopping categories with counts
// @route   GET /api/shopping/categories
// @access  Public
exports.getCategories = async (req, res) => {
    try {
        const categories = await ShoppingItem.aggregate([
            {
                $group: {
                    _id: '$category',
                    count: { $sum: 1 },
                    availableCount: { $sum: { $cond: ['$isAvailable', 1, 0] } }
                }
            },
            {
                $project: {
                    category: '$_id',
                    count: 1,
                    availableCount: 1,
                    _id: 0
                }
            },
            { $sort: { category: 1 } }
        ]);

        res.json({
            success: true,
            data: categories
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};
