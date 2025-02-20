const mongoose = require("mongoose");
const playerSchema = mongoose.Schema;

const newPlayerSchema = new playerSchema(
    {
            playerName:{
                type:String,
                required:true
            },
            playerFIDE_id:{
                type:String,
                required:true
            },
            playerAICF_id:{
                type:String,
                required:true
            },
            playerEmail:{
                type:String,
                required:true
            },
            playerDOB:{
                type:String,
                required:true
            },
            playerMobile:{
                type:Number,
                required:true
            },
            playerQualification:{
                type:String,
                required:true
            },
            playerAddress:{
                type:String,
                required:true
            },
            userId:{
                type:mongoose.Schema.Types.ObjectId,
                required:true,
                ref:"User"
            },
            createdOn:{
                type:Date,
                default: new Date().getTime()
            }
    }
)

module.exports = newPlayerSchema;