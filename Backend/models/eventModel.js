const mongoose = require("mongoose");
const newEventSchema = require("../schemas/eventSchema");

module.exports = mongoose.model("Event",newEventSchema);
