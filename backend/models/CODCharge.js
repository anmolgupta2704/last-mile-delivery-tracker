const mongoose=require("mongoose");

const codSchema=new mongoose.Schema({

    orderType:{
        type:String,
        enum:["B2B","B2C"]
    },

    charge:{
        type:Number,
        default:0
    }

});

module.exports=mongoose.model("CODCharge",codSchema);