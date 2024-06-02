
const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({

    senderId:{

        type:mongoose.Schema.Types.ObjectId,
        ref:"User",

    },
    recieverId:{

        type:mongoose.Schema.Types.ObjectId,
        ref:"User",

    },

    content:{

        type:String,
        required:true,

    }
},
    {
        
        timestamps:true,

    }
)

module.exports = mongoose.model("Notification",notificationSchema);


