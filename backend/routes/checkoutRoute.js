const express = require('express');
const Checkout = require('../models/Checkout');
const Cart = require('../models/Cart');
const Product = require('../models/Product');
const Order = require('../models/Order');
const { protect } = require('../middleware/authMiddleware');
const { route } = require('./cartRoutes');

const router = express.Router();

// @route   POST /api/checkout
// @desc    Create a checkout session
// @access  Private

router.post('/', protect, async (req, res) => {
    const { checkoutItems, shippingAddress, paymentMethod, totalPrice } = req.body;

    if (!checkoutItems || checkoutItems.length === 0) {
        return res.status(400).json({ message: 'No items in checkout' });
    }

    try {
        const newCechkout =  await Checkout.create({
            user: req.user._id,
            checkoutItems: checkoutItems,
            shippingAddress,
            paymentMethod,
            totalPrice,
            paymentStatus: 'Pending',
            isPaid: false,
        });
        console.log(`Checkout created: for user: , ${req.user._id}`);
        res.status(201).json(newCechkout);
    } catch (error) {
        console.error('Error creating checkout:', error.message);
        res.status(500).json({ message: 'Server error' });
        
    }
});
// @route   PUT /api/checkout/:id/pay
// @desc    Update checkout to paid
// @access  Private

router.put('/:id/pay', protect, async (req, res) => {
    const {paymentStatus, paymentDetails} = req.body;
    try {
        const checkout = await Checkout.findById(req.params.id);
        if (!checkout) {
            return res.status(404).json({ message: 'Checkout not found' });
        }

        if (paymentStatus === 'paid') {
            checkout.isPaid = true;
            checkout.paymentStatus = paymentStatus;
            checkout.paidAt = Date.now();
            checkout.paymentDetails = paymentDetails; // Assuming paymentDetails contains relevant payment info
            await checkout.save();

            res.status(200).json({ message: 'Checkout updated to paid', checkout });
        } else {
            return res.status(400).json({ message: 'Payment status is not paid' });
        }
        
    } catch (error) {
        console.error('Error updating checkout:', error.message);
        res.status(500).json({ message: 'Server error' });
    }
});

// @route   POST /api/checkout/:id/finalize
// @desc    Finalize checkout and create order
// @access  Private

router.post('/:id/finalize', protect, async (req, res) => {

    try {
        const checkout = await Checkout.findById(req.params.id);
        if (!checkout) {
            return res.status(404).json({ message: 'Checkout not found' });
        }

        if (checkout.isPaid && !checkout.isFinalized) {
            const finalOrder = await Order.create({
                user: checkout.user,
                orderItems: checkout.checkoutItems,
                shippingAddress: checkout.shippingAddress,
                paymentMethod: checkout.paymentMethod,
                totalPrice: checkout.totalPrice,
                isPaid: true,
                paidAt: Date.now(),
                paymentStatus: "paid",
                isDelivered: false,
                paymentDetails: checkout.paymentDetails,
            });
            checkout.isFinalized = true;
            checkout.finalizedAt = Date.now();
            await checkout.save();
            await Cart.findOneAndDelete({ user: checkout.user });
            res.status(201).json(finalOrder);
        } else if (checkout.isFinalized) {
            return res.status(400).json({ message: 'Checkout is already finalized' });
        } else {
            return res.status(400).json({ message: 'Checkout is not paid yet' });
        }
    } catch (error) {
        console.error('Error finalizing checkout:', error.message);
        res.status(500).json({ message: 'Server error' });
    }
});


module.exports = router;
        

