import userModel from "../models/user.model.js"
import bcryptjs from "bcryptjs"

export const getAllUsers = async (req, res, next) => {
    try {
        const currentUserId = req.userId;
        const users = await userModel.find({ _id: { $ne: currentUserId } });
        res.status(200).json({ success: true, result: { users } });
    } catch (error) {
        next(error);
    }
}

export const changeName = async (req, res, next) => {
    try {
        const { newName } = req.body;
        const userId = req.userId;

        if (!newName || newName.length < 2)
            return res.status(400).json({ success: false, message: "Name should be of more than 2 characters" })

        const user = await userModel.findByIdAndUpdate(userId, { fullName: newName });

        if (!user)
            return res.status(400).json({ success: false, message: "Something went wrong" });

        res.status(200).json({ success: true, result: { user } });

    } catch (error) {
        next(error);
    }
}

export const changePassword = async (req, res, next) => {
    try {
        const { currentPassword, newPassword, confirmPassword } = req.body;
        const userId = req.userId;

        if (!currentPassword || !newPassword || !confirmPassword)
            return res.status(400).json({ success: false, message: "Please fill in all the fields" });

        const user = await userModel.findById(userId);

        if (!user)
            return res.status(400).json({ success: false, message: "Something went wrong" });

        const validPassword = await bcryptjs.compare(currentPassword, user.password);

        if (!validPassword)
            return res.status(400).json({ success: false, message: "Incorrect Current Password" });

        if (newPassword !== confirmPassword)
            return res.status(400).json({ success: false, message: "Confirm password doesn't match" });

        const newHashedPassword = await bcryptjs.hash(newPassword, 10);

        const updatedUser = await userModel.findByIdAndUpdate(userId, { password: newHashedPassword });

        res.status(200).json({ success: true, result: { updatedUser } });

    } catch (error) {
        next(error);
    }
}

