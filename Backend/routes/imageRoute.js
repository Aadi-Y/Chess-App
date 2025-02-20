const express = require("express");
const {uploadImage} = require("../controllers/imageController");
const uploadMiddleware = require("../middleware/imageMiddleware");


const router = express.Router();

router.post("/upload",uploadMiddleware.single("image"),uploadImage);


module.exports = router;