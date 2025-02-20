const mongoose = require("mongoose");

const newPlayerSchema = require("../schemas/playerSchema");


module.exports = mongoose.model("Player",newPlayerSchema);