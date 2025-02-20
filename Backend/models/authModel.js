const mongoose = require("mongoose");
const { requiredPaths } = require("../schemas/eventSchema");
const Schema = mongoose.Schema;

const newUserSchema = new Schema(
    {
        email:{
            type:String,  
        },
        orgPassword:{
            type:String,
        },
        confirmPassword:{
            type:String,
        },
        role:{
            type:String,
            enum:["creater","player"]
        },
        createdOn:{type:Date,default:new Date().getTime()},

    }
    
)

module.exports = mongoose.model("User",newUserSchema);
