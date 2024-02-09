const express = require("express");

const app = express();

const dbConnect = require("./config/Database");

require("dotenv").config();

app.get("/",(req,res)=>{

    res.send("<h1>hellow </h1>");
})

dbConnect();

app.listen(process.env.PORT,()=>{

    console.log("app running successfully ");

})






