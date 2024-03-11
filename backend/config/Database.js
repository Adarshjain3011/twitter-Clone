const mongoose = require("mongoose");

require("dotenv").config();

const dbConnect = ()=>{

    // mongoose.connect("mongodb://127.0.0.1:27017/twitter",{}).then((data)=>{

    console.log(
        
        process.env.DATABASE_URL
    )

    mongoose.connect(`mongodb+srv://adarshjain3011:97547@cluster0.q3yqnrh.mongodb.net/twitter`,{}).then((data)=>{

        console.log("database connected successfully ");

    }).catch((error)=>{

        console.log("their is something error while connecting to the database ");

        console.log(error);

    })
}

module.exports = dbConnect;




