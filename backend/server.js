const express = require("express");

const app = express();

const dbConnect = require("./config/Database");

// const cookieParser = require("cookie-parser");

const cookieParser = require("cookie-parser");

const fileUpload = require("express-fileupload")

require("dotenv").config();

const Routes = require("./routes/route");

const Post = require("./routes/Post");

const CloudinaryConnect = require("./config/Cloudinary");

const cors = require("cors");

// socket metrials ----->

const http = require("http");

const {Server} = require('socket.io');

// const path = require('path');



const server = http.createServer(app);

const io = new Server(server,{ cors : true});

// const emailToSocketMapping = new Map();


io.on('connection',(socket)=>{
    
    console.log("new socket id ",socket.id);
    
    socket.on("join-room",(data)=>{

        const { roomId,email } = data; 

        console.log("new user ",email,"joined",roomId);

        emailToSocketMapping.set(email,socket.id);
        
        socket.join(roomId); // join roomid 

        socket.broadcast.to(roomId).emit("user-joined",{ email });

        
        // io.emit("message",message);

        
    })

    
})





// server.listen(process.env.PORT,()=>{

//     console.log("web server running ");

// })



// middleware 
app.use(cookieParser());

app.use(express.json());


app.use(express.json({strict: false}));

app.use(fileUpload({
    
    useTempFiles:true,
    tempFileDir:"/tmp"
    
}));


app.use(cors({
    
    origin:['http://localhost:3000'],  // this is frontend url path jo bhi request frontend se ish path se aaa rahi hai ushe aaapko entertain karna hai 
    
    credentials:true, // for allow the cookie from sending across backend 
    
}));



app.use(express.urlencoded({ extended:true}));



// mount the routes 




app.get("/",(req,res)=>{
    
    res.send("<h1>hellow </h1>");

})



app.get('/sample', (req, res) => {
    res.json({ message: 'This is a sample API response' });
});


app.use("/api/v1",Routes);

app.use("/api/v1",Post);



// 

dbConnect();

CloudinaryConnect();


// app.listen(process.env.PORT,()=>{
    
    //     console.log("app running successfully ");
    
    // })
    
    
    


app.listen(process.env.PORT,()=>{

    console.log("web server running ");

})










