const mongoose = require("mongoose");


require("dotenv").config();

const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({

    name: {

        type: String,
        trim: true,

    },

    email: {

        type: String,

        trim: true,

    },

    followers: [{

        type: mongoose.Schema.Types.ObjectId,
        ref: "User"


    }],

    following: [{

        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        trim:true,

    }],

    posts: [{

        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
        trim:true,

    }],

    addtionalDetails: {

        type: mongoose.Schema.Types.ObjectId,
        ref: "AdditionalDetails",
        trim:true,

    },

    BookMarks: [{

        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
        trim:true,

    }],

    userImage: {

        type: String,

    },

    password: {

        type: String,

    },

    isVerified: {

        type: Boolean,
        default:false
    },

    refreshToken:{

        type:String
    }

}, {

    timestamps: true,

})


userSchema.methods.generateAccessToken = function(){

    return jwt.sign({
        
        _id:this._id,
        email:this.email,
        userName:this.name

    },process.env.JWT_ACCESS_TOKEN,{

        expiresIn:"24h"

    })

}


userSchema.methods.generateRefreshToken = function(){

    return jwt.sign({
        
        _id:this._id,

    },process.env.JWT_REFRESH_TOKEN,{

        expiresIn:"30d"

    })
    
}

module.exports = mongoose.model("User", userSchema);






