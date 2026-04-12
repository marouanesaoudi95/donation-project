const Donation = require('../Models/Donation');


exports.createPost = async (req, res) => {
    try {
        const postData = { ...req.body, donor: req.user.id, remainingQty: req.body.quantity };
        const post = await Donation.create(postData);
        res.status(201).json(post);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getAvailablePosts = async (req, res) => {
    try {
        const posts = await Donation.find({ status: 'available' }).sort({ createdAt: -1 });
        res.json(posts);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

