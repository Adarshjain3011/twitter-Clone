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

    url:{

        type:String
    },

    timeDuration:{

        type:String
    },

    description:{

        type:String

    },
    likes:[{

        type:mongoose.Schema.Types.ObjectId,
        ref:"User"

    }],
    comment:[{

        type:mongoose.Schema.Types.ObjectId,
        ref:"Post"
        
    }],

    isCommented:{

        type:Boolean,
        default:false
        
    }
})

module.exports = mongoose.model("Comment",CommentSchema);



