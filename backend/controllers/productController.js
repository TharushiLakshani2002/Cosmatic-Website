const Product = require('../models/Product');
const mongoose = require('mongoose');

// @desc    Get all products
// @route   GET /api/products
// @access  Public
const getProducts = async (req, res) => {
    try {
        const {
            page = 1,
            limit = 12,
            category,
            subcategory,
            brand,
            minPrice,
            maxPrice,
            search,
            sortBy = 'createdAt',
            sortOrder = 'desc',
            featured,
            onSale
        } = req.query;

        // Build query
        let query = { isActive: true };

        if (category) query.category = category;
        if (subcategory) query.subcategory = subcategory;
        if (brand) query.brand = new RegExp(brand, 'i');
        if (featured === 'true') query.isFeatured = true;
        if (onSale === 'true') query.isOnSale = true;

        // Price filter
        if (minPrice || maxPrice) {
            query.price = {};
            if (minPrice) query.price.$gte = Number(minPrice);
            if (maxPrice) query.price.$lte = Number(maxPrice);
        }

        // Text search
        if (search) {
            query.$text = { $search: search };
        }

        // Calculate skip value
        const skip = (Number(page) - 1) * Number(limit);

        // Sort options
        const sortOptions = {};
        sortOptions[sortBy] = sortOrder === 'desc' ? -1 : 1;

        // Execute query
        const products = await Product.find(query)
            .sort(sortOptions)
            .skip(skip)
            .limit(Number(limit))
            .populate('createdBy', 'name')
            .lean();

        // Get total count for pagination
        const total = await Product.countDocuments(query);

        res.json({
            products,
            pagination: {
                current: Number(page),
                pages: Math.ceil(total / Number(limit)),
                total,
                hasNext: skip + products.length < total,
                hasPrev: Number(page) > 1
            }
        });

    } catch (error) {
        console.error('Get products error:', error);
        res.status(500).json({
            message: 'Server error while fetching products'
        });
    }
};

// @desc    Get single product
// @route   GET /api/products/:id
// @access  Public
const getProduct = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: 'Invalid product ID'
            });
        }

        const product = await Product.findOne({ _id: id, isActive: true })
            .populate('createdBy', 'name')
            .lean();

        if (!product) {
            return res.status(404).json({
                message: 'Product not found'
            });
        }

        res.json({ product });

    } catch (error) {
        console.error('Get product error:', error);
        res.status(500).json({
            message: 'Server error while fetching product'
        });
    }
};

// @desc    Create new product
// @route   POST /api/products
// @access  Private (Admin only)
const createProduct = async (req, res) => {
    try {
        const {
            name,
            description,
            price,
            originalPrice,
            category,
            subcategory,
            brand,
            images,
            mainImage,
            stock,
            isFeatured,
            isOnSale,
            specifications,
            tags,
            seoTitle,
            seoDescription
        } = req.body;

        // Validation
        if (!name || !description || !price || !category || !subcategory || !brand || !mainImage || stock === undefined) {
            return res.status(400).json({
                message: 'Please provide all required fields'
            });
        }

        // Create product
        const product = new Product({
            name: name.trim(),
            description: description.trim(),
            price: Number(price),
            originalPrice: originalPrice ? Number(originalPrice) : null,
            category,
            subcategory: subcategory.trim(),
            brand: brand.trim(),
            images: images || [mainImage],
            mainImage,
            stock: Number(stock),
            isFeatured: Boolean(isFeatured),
            isOnSale: Boolean(isOnSale),
            specifications: specifications || {},
            tags: tags || [],
            seoTitle: seoTitle || name,
            seoDescription: seoDescription || description,
            createdBy: req.user._id
        });

        await product.save();

        // Populate createdBy field
        await product.populate('createdBy', 'name');

        res.status(201).json({
            message: 'Product created successfully',
            product
        });

    } catch (error) {
        console.error('Create product error:', error);

        if (error.name === 'ValidationError') {
            const errors = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({
                message: 'Validation failed',
                errors
            });
        }

        res.status(500).json({
            message: 'Server error while creating product'
        });
    }
};

// @desc    Update product
// @route   PUT /api/products/:id
// @access  Private (Admin only)
const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: 'Invalid product ID'
            });
        }

        const product = await Product.findById(id);

        if (!product) {
            return res.status(404).json({
                message: 'Product not found'
            });
        }

        // Update fields
        const updatedFields = { ...req.body };
        delete updatedFields._id;
        delete updatedFields.__v;
        updatedFields.updatedBy = req.user._id;

        Object.assign(product, updatedFields);
        await product.save();

        // Populate fields
        await product.populate([
            { path: 'createdBy', select: 'name' },
            { path: 'updatedBy', select: 'name' }
        ]);

        res.json({
            message: 'Product updated successfully',
            product
        });

    } catch (error) {
        console.error('Update product error:', error);

        if (error.name === 'ValidationError') {
            const errors = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({
                message: 'Validation failed',
                errors
            });
        }

        res.status(500).json({
            message: 'Server error while updating product'
        });
    }
};

// @desc    Delete product
// @route   DELETE /api/products/:id
// @access  Private (Admin only)
const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: 'Invalid product ID'
            });
        }

        const product = await Product.findById(id);

        if (!product) {
            return res.status(404).json({
                message: 'Product not found'
            });
        }

        // Soft delete by setting isActive to false
        product.isActive = false;
        product.updatedBy = req.user._id;
        await product.save();

        res.json({
            message: 'Product deleted successfully'
        });

    } catch (error) {
        console.error('Delete product error:', error);
        res.status(500).json({
            message: 'Server error while deleting product'
        });
    }
};

// @desc    Get featured products
// @route   GET /api/products/featured
// @access  Public
const getFeaturedProducts = async (req, res) => {
    try {
        const { limit = 8 } = req.query;

        const products = await Product.getFeatured(Number(limit));

        res.json({ products });

    } catch (error) {
        console.error('Get featured products error:', error);
        res.status(500).json({
            message: 'Server error while fetching featured products'
        });
    }
};

// @desc    Get products by category
// @route   GET /api/products/category/:category
// @access  Public
const getProductsByCategory = async (req, res) => {
    try {
        const { category } = req.params;
        const { limit = 12 } = req.query;

        const products = await Product.getByCategory(category, Number(limit));

        res.json({ products, category });

    } catch (error) {
        console.error('Get products by category error:', error);
        res.status(500).json({
            message: 'Server error while fetching products by category'
        });
    }
};

// @desc    Search products
// @route   GET /api/products/search
// @access  Public
const searchProducts = async (req, res) => {
    try {
        const { q, category, minPrice, maxPrice, sortBy, sortOrder, page = 1, limit = 12 } = req.query;

        if (!q || q.trim().length < 2) {
            return res.status(400).json({
                message: 'Search query must be at least 2 characters long'
            });
        }

        const options = {
            category,
            minPrice: minPrice ? Number(minPrice) : undefined,
            maxPrice: maxPrice ? Number(maxPrice) : undefined,
            sortBy: sortBy || 'createdAt',
            sortOrder: sortOrder === 'asc' ? 1 : -1,
            limit: Number(limit),
            skip: (Number(page) - 1) * Number(limit)
        };

        const products = await Product.search(q.trim(), options);

        res.json({
            products,
            query: q.trim(),
            total: products.length
        });

    } catch (error) {
        console.error('Search products error:', error);
        res.status(500).json({
            message: 'Server error while searching products'
        });
    }
};

module.exports = {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct,
    getFeaturedProducts,
    getProductsByCategory,
    searchProducts
};