const mongoose = require("mongoose");

require("dotenv").config();

const dbConnect = ()=>{

    mongoose.connect("mongodb://127.0.0.1:27017/twitter",{}).then((data)=>{

        console.log("database connected successfully ");

    }).catch((error)=>{

        console.log("their is something error while connecting to the database ");

        console.log(error);

    })
}

module.exports = dbConnect;




