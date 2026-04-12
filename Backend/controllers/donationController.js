const donation = require('../Models/Donation');
const claim = require('../Models/Claim');
const { json } = require('express');

exports.getAllDonations = async (req, res) => {
    try {
        const { type, search, sortBy } = req.query;
        let query = { status: 'available' };
        if (type) {
            query.donationType = type;
        }
        if (search) {
            query.description = { $regex: search, $options: 'i' };
        }
        let sort = sortBy === 'quantity' ? { quantity: -1 } : { createdAt: -1 };
        const donations = await donation.find(query).populate('donor', 'name email phone organization').sort(sort);
        res.status(200).json(donations);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
//get single donation
exports.getDonationById = async (req, res) => {
    try {
        const donation = await donation.findById(req.params.id).populate('donor', 'name email phone organization');
        if (!donation) {
            return res.status(404).json({ error: 'Donation not found' });
        }
        res.status(200).json(donation);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
//create donation
exports.createDonation = async (req, res) => {
    try {
        const { donor, donationType, quantity, description, organization, contactPhone } = req.body;
        const donation = await donation.create({
            donor: req.user._id,
            donationType,
            quantity,
            remainingQty: quantity,
            description,
            organization,
            contactPhone,
            status: 'available'
        });
        const fulldonation = await donation.findById(donation._id).populate('donor', 'name email phone organization');
        res.status(201).json(donation);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
//update donation
exports.updateDonation = async (req, res) => {
    try {
        let donation = await donation.findById(req.params.id);
        if (!donation) {
            return res.status(404).json({ error: 'Donation not found' });
        }
        if (donation.donor.toString() !== req.user._id.toString()) {
            return res.status(403).json({ error: 'User not authorized' });
        }
        if (req.body.quantity) {
            const claimed = donation.quantity - donation.remainingQty;
            if (req.body.quantity < claimed) {
                return res.status(400).json({ msg: `Cannot reduce below claimed amount (${claimed})` });
            }
            req.body.remainingQty = req.body.quantity - claimed;
        }
        donation = await donation.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        res.status(200).json(donation);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
//delete donation
exports.deleteDonation = async (req, res) => {
    try {
        const donation = await donation.findById(req.params.id);
        if (!donation) {
            return res.status(404).json({ error: 'Donation not found' });
        }
        if (donation.donor.toString() !== req.user._id) {
            return res.status(403).json({ error: 'User not authorized' });
        }
        await donation.deleteOne();
        json({ msg: 'Donation deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
// get my donations
exports.getMyDonations = async (req, res) => {
    try {
        const donations = await donation.find({ donor: req.user._id }).sort({ createdAt: -1 });
        res.status(200).json(donations);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};