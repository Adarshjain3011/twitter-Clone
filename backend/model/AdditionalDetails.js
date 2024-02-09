const mongoose =require("mongoose");

const AdditionalDetailsSchema = new mongoose.Schema({

    Dob:{

        type:String,

    },
    gender:{
        
        enum:["male","female","other"],
        type:String,
        
    },

    ContactNo:{


        type:Number,

    }

})

module.exports =mongoose.model("AdditionalDetails",AdditionalDetailsSchema);


