const { get } = require('mongoose');
const donation = require('../Models/Donation');

// Create a new claim
exports.createClaim = async (req, res) => {
    const session = await donation.startSession();
    session.startTransaction();
    try {
        //find donation
        const {postId, quantity, notes} = req.body;
        const donation = await donation.findById(postId).session(session);
        if(!donation){
            await session.abortTransaction();
            return res.status(404).json({message: 'Donation not found'});
        }
        //check quantity
        if(quantity > donation.requiredQty){
            await session.abortTransaction();
            return res.status(400).json({msg: `Requested quantity exceeds available stock. Only ${donation.remainingQty} remaining.`});

        }
        //update donation
        const updatedDonation = await donation.findByIdAndUpdate(
            {id: postId, remainingQty: {$gte: quantity}},
            {$inc: {remainingQty: -quantity}},
            {new: true, session}
        );
        if(!updatedDonation){
            await session.abortTransaction();
            return res.status(400).json({msg: 'Failed to claim. Stock changed.'});
        }
        if(updatedDonation.remainingQty === 0){
            updatedDonation.status = 'claimed';
            await updatedDonation.save({session});
        }
       //create claim
        const claim = new Claim({
            post: postId,
            charity: req.user.id,
            quantity,
            notes,
            status: 'pending',
            claimedAt: new Date()
        });
        await claim.save({session});
       await claim.populate([
        {path: 'post'},
        {path: 'charity', select: 'name email'}
       ]);
        await session.commitTransaction();
        res.status(201).json({message: 'Claim created successfully', claim});
    }catch (error) {
        await session.abortTransaction();
        console.error('Error creating claim:', error);
        res.status(500).json({message: 'Server error'});
    }finally {
        session.endSession();
    }
};
// getAll claims for a charity
exports.getClaimsForCharity = async (req, res) => {
    try {
        const claims = await Claim.find({charity: req.user.id}).populate('post').sort({claimedAt: -1});
        res.status(200).json({claims});
    }catch (error) {
        res.status(500).json({msg: error.message});
    }
};
// get single claim details
exports.getClaimById = async (req, res) => {
    try {
        const claim = await Claim.findById(req.params.id).populate('post').populate('charity', 'name email phone organization');
        if (!claim) {
            return res.status(404).json({msg: 'Claim not found'});
        }
        res.status(200).json({claim});
    }catch (error) {
        res.status(500).json({msg: error.message});
    }
};
// update claim status (confirm or cancel)
exports.updateClaimStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const claim = await Claim.findById(req.params.id);
        if (!claim) {
            return res.status(404).json({msg: 'Claim not found'});
        }
        claim.status = status;
        await claim.save();
        res.status(200).json({msg: 'Claim status updated successfully', claim});
    }catch (error) {
        res.status(500).json({msg: error.message});
    }
};
