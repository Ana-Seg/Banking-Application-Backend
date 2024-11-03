import express from "express";
import { config } from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import { authRouter } from "./controllers/authController.js";
import { transactionRouter } from "./controllers/transactionsController.js";
import { auth } from "./middleware/authMiddleware.js";
import User from "./models/userModel.js";

config();

const app = express();

app.use(cors({ origin: process.env.FRONTEND_URL }));
app.use(express.json());

mongoose
    .connect(process.env.mongodb)
    .then(() => console.log('Database is connected'))
    .catch((error) => console.log(error));

app.use('/auth', authRouter);

app.use('/api/transactions', transactionRouter);

const isAdmin = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ msg: 'Access denied: Admins only' });
    }
    next();
};

app.get('/user', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        console.error('Error fetching user profile:', error);
        res.status(500).send('Server error');
    }
});

app.get('/users', auth, isAdmin, async (req, res) => {
    try {

        const users = await User.find().select('-password');

        if (!users || users.length === 0) {
            return res.status(404).json({ msg: 'No users found' });
        }

        res.json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ msg: 'Server error' });
    }
});

app.listen(process.env.PORT, () =>
    console.log(`Server running on ${process.env.PORT} PORT`)
);





