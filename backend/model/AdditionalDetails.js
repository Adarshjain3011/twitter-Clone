const mongoose =require("mongoose");

const AdditionalDetailsSchema = new mongoose.Schema({

    Dob:{

        type:String,

    },
    gender:{
        
        enum:["male","female","other"],
        type:String,
        
    },
    bio:{

        type:String,
        trim:true

    },

    city:{

        type:String,

    },
    additionalLink:{

        type:String

    },
    ContactNo:{


        type:Number,

    },
    coverImage:{

        type:String,

    }

})

module.exports =mongoose.model("AdditionalDetails",AdditionalDetailsSchema);




