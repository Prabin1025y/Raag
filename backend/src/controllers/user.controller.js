import userModel from "../models/user.model.js"

export const getAllUsers = async (req, res, next) => {
    try {
        const currentUserClerkId = req.auth.userId;
        const users = await userModel.find({ clerkId: { $ne: currentUserClerkId } });
        res.status(200).json({ success: true, result: { users } });
    } catch (error) {
        next(error);
    }
}
