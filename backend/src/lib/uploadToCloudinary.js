import cloudinary from "./cloudinary"

const uploadToCloudinary = async (file) => {
    try {
        const result = await cloudinary.uploader.upload(file.tempFilePath, {
            resource_type: "auto"
        });
        return result.secure_url;
    } catch (error) {
        console.log("Error in upload to cloudinary function", error);
        throw new Error("Error in uploadToCloudinary()");
    }
}

export default uploadToCloudinary;