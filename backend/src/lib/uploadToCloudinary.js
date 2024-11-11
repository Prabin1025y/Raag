import cloudinary from "./cloudinary.js"

const uploadToCloudinary = async (file) => {
    try {
        //method to upload file in cloudinary
        const result = await cloudinary.uploader.upload(file.tempFilePath, {
            resource_type: "auto"
        });
        //cloudinary stores file url under result.secure_url
        return result.secure_url;
    } catch (error) {
        console.log("Error in upload to cloudinary function", error);
        throw new Error("Error in uploadToCloudinary()");
    }
}

export default uploadToCloudinary;