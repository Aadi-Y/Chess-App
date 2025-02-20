const Image = require("../models/Image");
const {uploadToCloudinary} = require("../helper/imageHelper");

async function uploadImage(req,res) {
    try{
        if(!req.file){
            return res.status(400).json({
                error:true,
                message:"Please upload image"
            });
        }
        const result = await uploadToCloudinary(req.file.path);

        const {url,publicId} = await uploadToCloudinary(req.file.path);

        const newImage = new Image({
            url,
            publicId,
        })

        await newImage.save();

        res.status(201).json({
            error:false,
            message:"Image uploaded Successfully",
            imageDetails:result

        })
    }
    catch(err){
        res.status(500).json({
            messaga:`${err}`
        })
    }
}

module.exports = {
    uploadImage
}