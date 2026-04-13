const Donation = require('../Models/Donation'); // Model b 'D' kbira
const Claim = require('../Models/Claims');

// Get all available donations
exports.getAllDonations = async (req, res) => {
    try {
        const { type, search, sortBy } = req.query;
        let query = { status: 'available' };

        if (type) query.donationType = type;
        if (search) query.description = { $regex: search, $options: 'i' };

        let sort = sortBy === 'quantity' ? { quantity: -1 } : { createdAt: -1 };

        const donations = await Donation.find(query)
            .populate('donor', 'name email phone organization')
            .sort(sort);

        res.status(200).json(donations);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get single donation
exports.getDonationById = async (req, res) => {
    try {
        const donationDoc = await Donation.findById(req.params.id)
            .populate('donor', 'name email phone organization');

        if (!donationDoc) return res.status(404).json({ error: 'Donation not found' });

        res.status(200).json(donationDoc);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Create donation
exports.createDonation = async (req, res) => {
    try {
        const { donationType, quantity, description, organization, contactPhone } = req.body;

        const newDonation = await Donation.create({
            donor: req.user._id,
            donationType,
            quantity,
            remainingQty: quantity, // Start with full quantity
            description,
            organization,
            contactPhone,
            status: 'available'
        });

        res.status(201).json(newDonation);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update donation
exports.updateDonation = async (req, res) => {
    try {
        let donationDoc = await Donation.findById(req.params.id);

        if (!donationDoc) return res.status(404).json({ error: 'Donation not found' });

        // Authorization check
        if (donationDoc.donor.toString() !== req.user._id.toString()) {
            return res.status(403).json({ error: 'User not authorized' });
        }

        // Logic to prevent reducing quantity below claimed amount
        if (req.body.quantity) {
            const claimed = donationDoc.quantity - donationDoc.remainingQty;
            if (req.body.quantity < claimed) {
                return res.status(400).json({ msg: `Cannot reduce below claimed amount (${claimed})` });
            }
            req.body.remainingQty = req.body.quantity - claimed;
        }

        const updatedDonation = await Donation.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        res.status(200).json(updatedDonation);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete donation
exports.deleteDonation = async (req, res) => {
    try {
        const donationDoc = await Donation.findById(req.params.id);

        if (!donationDoc) return res.status(404).json({ error: 'Donation not found' });

        if (donationDoc.donor.toString() !== req.user._id.toString()) {
            return res.status(403).json({ error: 'User not authorized' });
        }

        await donationDoc.deleteOne();
        res.status(200).json({ msg: 'Donation deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get my donations
exports.getMyDonations = async (req, res) => {
    try {
        const donations = await Donation.find({ donor: req.user._id }).sort({ createdAt: -1 });
        res.status(200).json(donations);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};