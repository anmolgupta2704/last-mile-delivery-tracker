const mongoose=require("mongoose");

const zoneSchema=new mongoose.Schema({

    name:{
        type:String,
        required:true,
        unique:true
    },

    areas:[
        {
            type:String
        }
    ],

    center:{
        lat:Number,
        lng:Number
    }

},{
    timestamps:true
});

module.exports=mongoose.model("Zone",zoneSchema);