const { auth } = require('./auth');

// Middleware to check if user is admin
const adminAuth = async (req, res, next) => {
    // First check if user is authenticated
    auth(req, res, (err) => {
        if (err) {
            return next(err);
        }

        // Check if user exists and has admin role
        if (!req.user) {
            return res.status(401).json({
                message: 'Authentication required'
            });
        }

        if (req.user.role !== 'admin') {
            return res.status(403).json({
                message: 'Access denied. Admin privileges required.'
            });
        }

        next();
    });
};

// Middleware to check if user is admin or the owner of the resource
const adminOrOwner = (resourceUserField = 'user') => {
    return async (req, res, next) => {
        auth(req, res, (err) => {
            if (err) {
                return next(err);
            }

            if (!req.user) {
                return res.status(401).json({
                    message: 'Authentication required'
                });
            }

            // If user is admin, allow access
            if (req.user.role === 'admin') {
                return next();
            }

            // Check if user is the owner of the resource
            const resourceUserId = req.params.userId || req.body[resourceUserField] || req.user._id.toString();

            if (req.user._id.toString() !== resourceUserId) {
                return res.status(403).json({
                    message: 'Access denied. You can only access your own resources.'
                });
            }

            next();
        });
    };
};

module.exports = { adminAuth, adminOrOwner };