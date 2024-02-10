const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({

    user:{

        type:mongoose.Schema.Types.ObjectId,

        ref:"User"
        
    },

    post:{

        type:mongoose.Schema.Types.ObjectId,

        ref:"Post"
    },

    description:{

        type:String


    }
})