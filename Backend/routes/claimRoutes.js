
const express = require('express');
const router = express.Router();
const { auth, authorize } = require('../middleware/authMiddleware');
const { validate, claimSchema } = require('../middleware/validationMiddleware');
const claimController = require('../controllers/claimController');

// Protected charity routes
router.post('/', auth, authorize('charity', 'admin'), validate(claimSchema), claimController.createClaim);
router.get('/my', auth, authorize('charity', 'admin'), claimController.getMyClaims);
router.delete('/:id', auth, authorize('charity', 'admin'), claimController.deleteClaim);
router.get('/:id', auth, authorize('charity', 'admin'), claimController.getClaimById);

// Admin only routes
router.put('/:id/status', auth, authorize('admin'), claimController.updateClaimStatus);

module.exports = router;