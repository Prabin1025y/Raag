import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { createAvatar } from '@dicebear/core';
import { funEmoji } from '@dicebear/collection';

import uploadToCloudinary from "../lib/uploadToCloudinary.js";
import userModel from "../models/user.model.js";
import generateJwtAndSetCookies from '../utils/generateJWT.js';
import ValidateCredentials from '../utils/validateCredentials.js';

export const checkAuth = async (req, res, next) => {
    try {
        const token = req.cookies.token;

        if (!token)
            return res.status(200).json({ success: true, result: { isAuthenticated: false } });

        const payLoad = jwt.verify(token, process.env.JWT_SECRET);

        if (!payLoad)
            return res.status(200).json({ success: true, result: { isAuthenticated: false } });

        req.userId = payLoad.userId;

        const user = await userModel.findById(payLoad.userId);
        return res.status(200).json({ success: true, result: { isAuthenticated: true, user:{_id: user._id, fullName: user.fullName, email: user.email, imageUrl: user.imageUrl} } });

    } catch (error) {
        next(error)
    }
}

export const checkAdmin = async (req, res, next) => {
    try {
        try {
            const currentUser = await userModel.findById(req.userId);
            const isUserAdmin = currentUser?.email === process.env.ADMIN_EMAIL;
            console.log(isUserAdmin);


            return res.status(200).json({ success: true, result: { isAdmin: isUserAdmin } });
        } catch (error) {
            console.log(error);
            next(error);
        }
    } catch (error) {

    }
}

export const signup = async (req, res, next) => {
    try {
        const { fullName, email, password, confirmPassword } = req.body;
        const { success, message } = ValidateCredentials(fullName, email, password, confirmPassword);

        if (!success)
            return res.status(400).json({ success: false, message });

        const user = await userModel.findOne({ email });
        if (user)
            return res.status(400).json({ success: false, message: "Username not available" });

        const imageFile = req?.files?.imageFile;

        const hashedPassword = await bcryptjs.hash(password, 10);
        // let imageUrl, avatar;

        const imageUrl = imageFile ? await uploadToCloudinary(imageFile) : createAvatar(funEmoji, {
            seed: email,
            radius: 50,
        }).toDataUri();

        const newUser = await userModel.create({
            fullName,
            email,
            password: hashedPassword,
            imageUrl
        });
        await newUser.save();

        generateJwtAndSetCookies(res, newUser._id);

        // newUser[password] = null;
        res.status(201).json({ success: true, result: { _id: newUser._id, fullName: newUser.fullName, email: newUser.email, imageUrl: newUser.imageUrl } });

    } catch (error) {
        next(error);
    }
}

export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email, !password)
            return res.status(400).json({ success: false, message: "Please fill out all the fields" });

        const user = await userModel.findOne({ email });

        if (!user)
            return res.status(401).json({ success: false, message: "Invalid Credentials" });

        const isPasswordValid = await bcryptjs.compare(password, user.password);
        if (!isPasswordValid)
            return res.status(401).json({ success: false, message: "Invalid Credentials" });

        generateJwtAndSetCookies(res, user._id);

        user[password] = null;
        res.status(200).json({ success: true, result: { _id: user._id, fullName: user.fullName, email: user.email, imageUrl: user.imageUrl } });


    } catch (error) {
        next(error);
    }
}

export const logout = (req, res, next) => {
    res.clearCookie("token");
    res.status(200).json({ success: true, result: {} });
}