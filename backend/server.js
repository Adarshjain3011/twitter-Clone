const express = require("express");
const http = require("http");

const app = express();

const { Server } = require('socket.io');

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


// const path = require('path');



const server = http.createServer(app);

// const io = new Server(server, { cors: true });

const io = new Server(server, {
    cors: {

        origin: "*"

    }
});

// Maintain a map of user IDs to WebSocket connections
const connectedUsers = new Map();


io.on("connection", (socket) => {

    console.log("New client connected");

    // When a user connects, add them to the connected users map

    socket.on("login", (userId) => {

        console.log("user is sucessfully login ", userId);

        connectedUsers.set(userId, socket);

        io.emit()

    });

    // When a user disconnects, remove them from the connected users map

    socket.on("disconnect", () => {

        for (const [key, value] of connectedUsers.entries()) {

            if (value === socket) {

                connectedUsers.delete(key);
                break;

            }
        }
    });


    // Handle sending messages

    socket.on("sendMessage", ({ content, receiverId }) => {

        // Save the message to the database
        // Broadcast the message to relevant clients

        console.log("server side data recieveing ", content, receiverId);


        // io.emit("newMessage", { content, receiverId }); // Emit content and receiverId as the message payload

        io.emit("newMessage", { content }); // Emit content and receiverId as the message payload

    });

    // Handle other events...
});




// middleware 

app.use(express.json());

app.use(cookieParser());



app.use(express.json({ strict: false }));

app.use(fileUpload({

    useTempFiles: true,
    tempFileDir: "/tmp"

}));


app.use(cors({

    origin: ['http://localhost:3000'],  // this is frontend url path jo bhi request frontend se ish path se aaa rahi hai ushe aaapko entertain karna hai 

    credentials: true, // for allow the cookie from sending across backend 

}));



app.use(express.urlencoded({ extended: true }));



// mount the routes 




app.get("/", (req, res) => {

    res.send("<h1>hellow </h1>");

})


app.use("/api/v1", Routes);

app.use("/api/v1", Post);

// Endpoint to check if a user is online
app.get("/api/v1/:userId/online", (req, res) => {

    const { userId } = req.params;

    console.log("req ke params ke andar user id hai ", userId);

    const isOnline = connectedUsers.has(userId);

    // res.json({ userId, isOnline });

    console.log(connectedUsers);

    res.status(200).json({

        success: true,
        data: { userId, isOnline },
        message: "check user onlne status ",

    })


});





// 

dbConnect();

CloudinaryConnect();


// app.listen(process.env.PORT,()=>{

//     console.log("app running successfully ");

// })





server.listen(process.env.PORT, () => {

    console.log("web server running ");

})












