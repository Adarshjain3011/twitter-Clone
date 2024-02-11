const mongoose = require("mongoose");

const PostSchema = mongoose.Schema({

    user:{

        type:mongoose.Schema.Types.ObjectId,
        ref:"User"

    },
    postUrl:{

        type:String,

    },

    description:{

        type:String,

    },

    timeDuration:{

        type:String,
    },

    likes:[{

        
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"

    }],

    comments:[{

        type:mongoose.Schema.Types.ObjectId,
        ref:"Comment"

    }],

    bookMarked:[{

        type:mongoose.Schema.Types.ObjectId,
        ref:"User"

    }]


})

module.exports = mongoose.model("Post",PostSchema);

