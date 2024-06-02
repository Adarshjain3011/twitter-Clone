const mongoose = require("mongoose");

require("dotenv").config();

const dbConnect = ()=>{


    console.log("dat base url ",process.env.DATABASE_URL);


    mongoose.connect(`${process.env.DATABASE_URL}`,{}).then((data)=>{

        console.log("database connected successfully ");

    }).catch((error)=>{

        console.log("their is something error while connecting to the database ");

        console.log(error);

    })
}

module.exports = dbConnect;




