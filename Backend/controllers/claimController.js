const Claim = require('../Models/Claims');
const Donation = require('../Models/Donation');

// 1. Create a new claim
exports.createClaim = async (req, res) => {
    try {
        const { postId, quantity, notes } = req.body;

        // Find donation
        const donationDoc = await Donation.findById(postId);
        if (!donationDoc) return res.status(404).json({ message: 'Donation not found' });

        // Check stock
        if (quantity > donationDoc.remainingQty) {
            return res.status(400).json({ msg: `Stock kamil: ${donationDoc.remainingQty}` });
        }

        // Update donation stock
        donationDoc.remainingQty -= quantity;
        if (donationDoc.remainingQty === 0) donationDoc.status = 'claimed';
        await donationDoc.save();

        // Save claim
        const newClaim = await Claim.create({
            post: postId,
            charity: req.user.id,
            quantity,
            notes
        });

        res.status(201).json(newClaim);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 2. Get My Claims
exports.getMyClaims = async (req, res) => {
    try {
        const claims = await Claim.find({ charity: req.user.id }).populate('post');
        res.status(200).json(claims);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 3. Delete Claim (Restore Stock)
exports.deleteClaim = async (req, res) => {
    try {
        const claim = await Claim.findById(req.params.id);
        if (!claim) return res.status(404).json({ msg: 'Claim not found' });

        // Restore quantity to donation
        await Donation.findByIdAndUpdate(claim.post, { 
            $inc: { remainingQty: claim.quantity },
            $set: { status: 'available' } 
        });

        await claim.deleteOne();
        res.status(200).json({ msg: 'Claim deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 4. Get Single Claim
exports.getClaimById = async (req, res) => {
    try {
        const claim = await Claim.findById(req.params.id).populate('post charity', 'name email');
        if (!claim) return res.status(404).json({ msg: 'Not found' });
        res.status(200).json(claim);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 5. Update Status
exports.updateClaimStatus = async (req, res) => {
    try {
        const claim = await Claim.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
        res.status(200).json(claim);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};