const mongoose = require("mongoose");

const PostSchema = mongoose.Schema({

    isComment:{

        type:Boolean,
        default:false,
        
    },
    user:{

        type:mongoose.Schema.Types.ObjectId,
        ref:"User"

    },
    postUrl:{

        type:[String],

    },

    description:{

        type:String,

    },

    timeDuration:{

        type:[String],
    },

    likes:[{

        
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"

    }],

    comments:[{

        type:mongoose.Schema.Types.ObjectId,
        ref:"Post"

    }],

    bookMarked:[{

        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
 
    }],
    tagPeople:[{

        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
        
    }]


},{

    timestamps: true,

}
)

module.exports = mongoose.model("Post",PostSchema);






