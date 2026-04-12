const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../Models/User');

//register
exports.register = async (req, res) => {
    try {
        const { name, email, password, role, phone, organization } = req.body;
        const hashed = await bcrypt.hash(password, 10);
        const user = await User.create({
            name,
            email,
            password: hashed,
            role,
            phone,
            organization
        });
        res.status(201).json(user)


    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};
//login
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ msg: 'User not found' });
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: 'wrong password' });
        const token = jwt.sign(
            { id: user._id, name: user.name, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );
        res.json({ token }
        );
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};
//get user profile
exports.getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        if (!user) return res.status(404).json({ msg: 'User not found' });
        res.json(user);
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};
//update user profile
exports.updateProfile = async (req, res) => {
    try {
        const { name, phone, organization } = req.body;
        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).json({ msg: 'User not found' });
        user.name = name || user.name;
        user.phone = phone || user.phone;
        user.organization = organization || user.organization;
        await user.save();
        res.json(user);
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};
//delete user profile
exports.deleteProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).json({ msg: 'User not found' });
        await user.deleteOne();
        res.json({ msg: 'User deleted' });
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};