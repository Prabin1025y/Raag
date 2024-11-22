// import { clerkClient } from "@clerk/express"
import userModel from '../models/user.model.js'
import jwt from "jsonwebtoken"

export const isAuthenticated = async (req, res, next) => {
    //req.auth.userId is automatically set by clerkMiddleware
    // if (!req.auth.userId)
    //     return res.status(401).json({ success: false, message: "Unauthorized!!" });

    const token = req.cookies.token;

    if (!token)
        return res.status(401).json({ success: false, message: "Please log in first" });

    const payLoad = jwt.verify(token, process.env.JWT_SECRET);

    if (!payLoad)
        return res.status(401).json({ success: false, message: "Please log in first" });

    req.userId = payLoad.userId;

    next();
}

export const isAdmin = async (req, res, next) => {
    try {
        const currentUser = await userModel.findById(req.userId);
        const isUserAdmin = currentUser.email === process.env.ADMIN_EMAIL;

        if (!isUserAdmin)
            return res.status(401).json({ success: false, message: "Unauthorized!!" });

        next();
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
}