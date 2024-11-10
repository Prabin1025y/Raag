import userModel from "../models/user.model.js";

export const loginSignup = async (req, res) => {
    try {
        const { id, firstName, lastName, imageUrl } = req.body;

        let user = await userModel.findOne({ clerkId: id });

        if (!user) {
            //user is signing up
            user = await userModel.create({
                clerkId: id,
                fullName: `${firstName} ${lastName}`,
                imageUrl
            })
        }

        res.status(200).json({ success: true, result: user })
    } catch (error) {
        console.log("error while logging in or signing in ", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}