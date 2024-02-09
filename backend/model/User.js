const mongoose = require("mongoose");

 const userSchema = new mongoose.Schema({

    name:{

        type:String,
        trim:true,

    },

    email:{

        type:String ,

        trim:true,

    },

    followers:[{

        type:mongoose.Schema.Types.ObjectId,
        ref:"User"


    }],

    following:[{

        type:mongoose.Schema.Types.ObjectId,
        ref:"User"

    }],

    posts:[{

        type:mongoose.Schema.Types.ObjectId,
        ref:"Post"

    }],

    addtionalDetails:{

        type:mongoose.Schema.Types.ObjectId,
        ref:"AdditionalDetails"

    },

    BookMarks:[{

        type:mongoose.Schema.Types.ObjectId,
        ref:"Post"

    }],

    userImage:{

        type:String,

    },

    password:{

        type:String,

    },

    isVerified:{

        type:Boolean,
        default:true
    },
    


 },{

    timestamps:true,
    
 })


module.exports = mongoose.model("User",userSchema);


