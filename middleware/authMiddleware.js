import { config } from "dotenv";
import jwt from "jsonwebtoken";
import User from '../models/userModel.js';

const auth = async (req, res, next) => {
    const authHeader = req.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    const token = authHeader.split(' ')[1].trim();
    console.log("Token received:", token);

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;

        const user = await User.findById(decoded.id).select('-password');

        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        req.user = { ...req.user, role: user.role };

        next();
    } catch (e) {
        console.error("Token verification error:", e.message);
        res.status(401).json({ msg: 'Token is not valid' });
    }
};

export { auth };


