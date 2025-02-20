const cloudinary = require("cloudinary").v2;
const dotenv = require("dotenv");
dotenv.config();
// cloudinary.config({
//     cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
//     api_key:process.env.CLOUDINARY_API_KEY,
//     api_secret:process.env.CLOUDINARY_API_SECRET,
// })

cloudinary.config({
    cloud_name:"dtvdtafco",
    api_key:297189643175595,
    api_secret:"51wkCrSCTGXoNd7hBxcHf9Knduc",
})
// console.log({cloud_name:process.env.CLOUDINARY_CLOUD_NAME});

module.exports = cloudinary;