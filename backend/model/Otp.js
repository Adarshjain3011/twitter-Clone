const mongoose = require("mongoose");

const mailSender = require("../utils/MailSender");

const OtpSchema = new mongoose.Schema({

    email:{

        type:String

    },
    
    otp:{

        type:String,

    },

    createdAt:{

        type:Date,
        default:Date.now(),
        index: { expires: 300 }, // Automatically expire OTP after 5 minutes

    },

},{timestamps:true});



module.exports = mongoose.model("Otp",OtpSchema);

