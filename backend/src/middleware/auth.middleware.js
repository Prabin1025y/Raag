import { clerkClient } from "@clerk/express"

export const isAuthenticated = async (req, res, next) => {
    //req.auth.userId is automatically set by clerkMiddleware
    if (!req.auth.userId)
        return res.status(401).json({ success: false, message: "Unauthorized!!" });

    next();
}

export const isAdmin = async (req, res, next) => {
    try {
        const currentUser = await clerkClient.users.getUser(req.auth.userId);
        const isUserAdmin = currentUser.primaryEmailAddress?.emailAddress === process.env.ADMIN_EMAIL;

        if (!isUserAdmin)
            return res.status(401).json({ success: false, message: "Unauthorized!!" });

        next();
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
}