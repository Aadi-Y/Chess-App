const mongoose = require("mongoose");
const eventSchema = mongoose.Schema;

const newEventSchema = new eventSchema(
    {
            eventName:{
                type:String,
                required:true
            },

            eventLocation:{
                type:String,
                required:true
            },

            eventDateStart:{
                type:String,
                required:true
            },

            eventDateEnd:{
                type:String,
                required:true
            },

            eventMode:{
                type:String,
                required:true
            },

            eventContact:{
                type:String,
                required:true
            },

            eventFee:{
                type:Number,
                required:true
            },

            eventWinningPrice:{
                type:Number,
                required:true
            },

            eventSummary:{
                type:String,
                required:true
            },

            eventRegistrationDeadline:{
                type:String,
                requied:true
            },

            eventVenue:{
                type:String,
            },

            userId:{
                type:mongoose.Schema.Types.ObjectId,
                requried:true,
                ref:"User"
            },

            createdOn:{
                type:Date,
                default: new Date().getTime()
            }
    }
)

module.exports = newEventSchema;