const Claim = require('../Models/Claims');
const Donation = require('../Models/Donation');

exports.getAvailablePosts = async (req, res) => {
    try {
        const posts = await Donation.find({ status: 'available' }).sort({ createdAt: -1 });
        res.json(posts);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};



exports.claimDonation = async (req, res) => {
    try {
        const { quantity, notes, charityId: bodyCharityId } = req.body;
        const postId = req.params.id; // ✓ Get from URL parameter
        const charityId = req.user?.id || bodyCharityId; // ✓ Get charity ID from auth middleware or body

        // Validate required fields
        if (!charityId) {
            return res.status(400).json({ message: 'Charity ID is required' });
        }

        if (!quantity) {
            return res.status(400).json({ message: 'Quantity is required' });
        }

        // 1. Find post and validate existence
        const post = await Donation.findById(postId);

        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        if (post.status !== 'available') {
            return res.status(400).json({ message: 'Post unavailable' });
        }

        // 2. Validate quantity
        if (quantity < 1 || quantity > post.remainingQty) {
            return res.status(400).json({ 
                message: `Quantity must be between 1 and ${post.remainingQty}` 
            });
        }

        // 3. Atomic update (safe for concurrent users)
        const updatedPost = await Donation.findOneAndUpdate(
            { _id: postId, remainingQty: { $gte: quantity } },
            { $inc: { remainingQty: -quantity } },
            { new: true } // 'new: true' is more standard than 'returnDocument'
        );

        // 4. Handle race condition
        if (!updatedPost) {
            return res.status(400).json({ message: 'Not enough stock available' });
        }

        // 5. Auto-update status if empty
        if (updatedPost.remainingQty === 0) {
            updatedPost.status = 'completed';
            await updatedPost.save();
        }

        // 6. Create claim record
        const claim = await Claim.create({
            post: postId,
            charity: charityId, // ✓ Use charityId here
            quantity,
            notes: notes || '' // Handle optional notes
        });

        // 7. Response
        return res.status(201).json({
            message: 'Claim successful',
            claim,
            updatedPost
        });

    } catch (error) {
        console.error('Claim error:', error);
        return res.status(500).json({ error: error.message });
    }
};

       

exports.getrrecordcharity = async (req, res) => {
    try {
        const records = await Claim.find().sort({ createdAt: -1 });
        res.json(records);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
