// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/authMiddleware');
const { validate, registerSchema, loginSchema } = require('../middleware/validationMiddleware');
const userController = require('../controllers/userController');

// Public routes
router.post('/register', validate(registerSchema), userController.register);
router.post('/login', validate(loginSchema), userController.login);

// Protected routes
router.get('/me', auth, userController.getMe);
router.put('/profile', auth, userController.updateProfile);
router.delete('/profile', auth, userController.deleteProfile);

module.exports = router;