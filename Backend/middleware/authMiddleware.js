const jwt = require('jsonwebtoken');
const User = require('../Models/User');
const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        if (!token) {
            return res.status(401).json({ message: 'No token provided' });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById({ _id: decoded.id || decoded.userId }).select('-password');
        if (!user) {
            return res.status(401).json({ message: 'Invalid token' });
        }
        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Authentication failed' });
    }
};
const authorize = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ message: 'Access denied' });
        }
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ msg: `Role [${req.user.role}] is not authorized to access this route` });
        }
        next();
    };
};
module.exports = { auth, authorize };