const mongoose = require("mongoose");

const ImageSchema = new mongoose.Schema({
  image: { type: String, required: true },
});

const ImageModal = mongoose.model("ImageModal", ImageSchema);
module.exports = ImageModal; // ✅ Fix: Correctly Export Model
