const express = require("express");

const app = express();

const dbConnect = require("./config/Database");

const cookieParser = require("cookie-parser");

const fileUpload = require("express-fileupload")

require("dotenv").config();

const Routes = require("./routes/route");

const Post = require("./routes/Post");

const CloudinaryConnect = require("./config/Cloudinary");


// middleware 

app.use(express.json());

app.use(cookieParser());

app.use(fileUpload({

    useTempFiles:true,
    tempFileDir:"/tmp"

}));

app.use(express.urlencoded({ extended:true}));


app.get("/",(req,res)=>{

    res.send("<h1>hellow </h1>");

})

// mount the routes 


app.use("/api/v1",Routes);

app.use("/api/post",Post);


// 

dbConnect();

CloudinaryConnect();


app.listen(process.env.PORT,()=>{

    console.log("app running successfully ");

})









