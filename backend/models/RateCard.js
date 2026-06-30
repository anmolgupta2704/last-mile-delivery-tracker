const mongoose=require("mongoose");

const rateCardSchema=new mongoose.Schema({

    pickupZone:{
        type:String,
        required:true
    },

    dropZone:{
        type:String,
        required:true
    },

    orderType:{
        type:String,
        enum:["B2B","B2C"]
    },

    ratePerKg:{
        type:Number,
        required:true
    },

    isInterZone:{
        type:Boolean
    }

},{
    timestamps:true
});

module.exports=mongoose.model("RateCard",rateCardSchema);