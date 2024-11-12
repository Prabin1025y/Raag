import userModel from "../models/user.model.js"

export const getAllUsers = async (req, res, next) => {
    try {
        const currentUserId = req.userId;
        const users = await userModel.find({ _id: { $ne: currentUserId } });
        res.status(200).json({ success: true, result: { users } });
    } catch (error) {
        next(error);
    }
}
