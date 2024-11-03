import express from "express";
import User from "../models/userModel.js";
import { auth } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post('/deposit', auth, async (req, res) => {
    const { amount } = req.body;
    const userId = req.user.id;

    if (typeof amount !== 'number' || amount <= 0) {
        return res.status(400).json({ msg: 'Invalid deposit amount' });
    }

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        user.balance += amount;
        user.transactionLogs.push(`Deposited $${amount}`);
        await user.save();

        res.json({ newBalance: user.balance });
    } catch (error) {
        console.error('Error making deposit:', error);
        res.status(500).json({ msg: 'Server error' });
    }
});

router.post('/withdraw', auth, async (req, res) => {
    const { amount } = req.body;
    const userId = req.user.id;

    if (typeof amount !== 'number' || amount <= 0) {
        return res.status(400).json({ msg: 'Invalid withdraw amount' });
    }

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        if (amount > user.balance) {
            return res.status(400).json({ msg: 'Insufficient funds' });
        }

        user.balance -= amount;
        user.transactionLogs.push(`Withdrew $${amount}`);
        await user.save();

        res.json({ newBalance: user.balance });
    } catch (error) {
        console.error('Error making withdrawal:', error);
        res.status(500).json({ msg: 'Server error' });
    }
});

export { router as transactionRouter };
