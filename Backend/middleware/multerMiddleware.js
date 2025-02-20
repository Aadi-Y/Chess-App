const path = require('path');
const multer = require("multer");

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        // cb(null, path.join(__dirname, "Images")); 
        cb(null,"./Images")
    },
    filename: function(req, file, cb) { 
        cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname)); // ✅ Correct properties
    }
});

const upload = multer({ storage: storage });

module.exports = upload;
