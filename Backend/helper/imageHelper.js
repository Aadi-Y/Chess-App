const cloudinary = require("../config/cloudynary");

exports.uploadToCloudinary = async (filepath) => {
    try{
        const result = await cloudinary.uploader.upload(filepath);

        return {
            url:result.secure_url,
            publicId:result.public_id,
        }
    }
    catch(error){
        console.error("Cloudinary upload error : ",error);
        throw new Error("Cloudinary upload failed");

    }
    
}
