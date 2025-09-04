// back-end/routes/shopping.js
const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { protect, authorize } = require('../middleware/auth');
const {
    getAllShoppingItems,
    getShoppingItem,
    createShoppingItem,
    updateShoppingItem,
    deleteShoppingItem,
    toggleAvailability,
    getCategories
} = require('../controllers/shoppingController');

// Validation rules for creating/updating shopping items
const shoppingItemValidation = [
    body('name')
        .trim()
        .notEmpty().withMessage('Name is required')
        .isLength({ max: 100 }).withMessage('Name cannot exceed 100 characters'),
    body('category')
        .notEmpty().withMessage('Category is required')
        .isIn(['shirt', 'trouser', 'blouse', 'clothes', 'skirts', 'frocks'])
        .withMessage('Invalid category'),
    body('price')
        .notEmpty().withMessage('Price is required')
        .isFloat({ min: 0 }).withMessage('Price must be a positive number'),
    body('description')
        .trim()
        .notEmpty().withMessage('Description is required')
        .isLength({ max: 500 }).withMessage('Description cannot exceed 500 characters'),
    body('image')
        .notEmpty().withMessage('Image URL is required')
        .isURL().withMessage('Invalid image URL'),
    body('longDescription')
        .optional()
        .isLength({ max: 2000 }).withMessage('Long description cannot exceed 2000 characters'),
    body('ingredients')
        .optional()
        .isArray().withMessage('Ingredients must be an array'),
    body('nutritionalInfo.calories')
        .optional()
        .isFloat({ min: 0 }).withMessage('Calories must be a positive number'),
    body('allergens')
        .optional()
        .isArray().withMessage('Allergens must be an array'),
    body('customizations')
        .optional()
        .isArray().withMessage('Customizations must be an array'),
    body('preparationTime')
        .optional()
        .isInt({ min: 0 }).withMessage('Preparation time must be a positive integer')
];

// ---------------- Public Routes ---------------- //
router.get('/categories', getCategories);
router.get('/', getAllShoppingItems);
router.get('/:id', getShoppingItem);

// ---------------- Protected Routes (Admin Only) ---------------- //
router.use(protect); // All routes below require authentication
router.post('/', authorize('admin'), shoppingItemValidation, createShoppingItem);
router.put('/:id', authorize('admin'), shoppingItemValidation, updateShoppingItem);
router.delete('/:id', authorize('admin'), deleteShoppingItem);

// ---------------- Staff & Admin can toggle availability ---------------- //
router.patch('/:id/availability', authorize('staff', 'manager', 'admin'), toggleAvailability);

module.exports = router;
