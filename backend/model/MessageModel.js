
const mongoose = require("mongoose");

const messageModel = mongoose.Schema({

    Sender:{

        type:mongoose.Schema.Types.ObjectId,
        ref:"User",

    },
    content:{

        type:String,
        trim:true,

    },
    chat:{

        type:mongoose.Schema.Types.ObjectId,
        ref:"Chat"

    }

}
,{

    timestamps:true
    
})


module.exports = mongoose.model("Message",messageModel);



