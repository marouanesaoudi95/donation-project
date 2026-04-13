
const express = require('express');
const router = express.Router();
const { auth, authorize } = require('../middleware/authMiddleware');
const { validate, donationSchema } = require('../middleware/validationMiddleware');
const donationController = require('../controllers/donationController');

// Public routes
router.get('/', donationController.getAllDonations);
router.get('/:id', donationController.getDonationById);

// Protected donor routes
router.post('/', auth, authorize('donor', 'admin'), validate(donationSchema), donationController.createDonation);
router.get('/my/donations', auth, authorize('donor', 'admin'), donationController.getMyDonations);
router.put('/:id', auth, authorize('donor', 'admin'), validate(donationSchema), donationController.updateDonation);
router.delete('/:id', auth, authorize('donor', 'admin'), donationController.deleteDonation);


module.exports = router;