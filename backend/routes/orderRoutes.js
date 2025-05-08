const express = require('express');
const Order = require('../models/Order');

const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// @route   GET /api/orders/myorders
// @desc    Get logged in user's orders
// @access  Private

router.get('/my-orders', protect, async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
        res.status(200).json(orders);
    } catch (error) {
        console.error('Error fetching orders:', error.message);
        res.status(500).json({ message: 'Server error' });
    }
});

// @route   GET /api/orders/:id
// @desc    Get order by ID for logged in user
// @access  Private

router.get('/:id', protect, async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate('user', 'name email');
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        
        res.status(200).json(order);
    } catch (error) {
        console.error('Error fetching order:', error.message);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;

