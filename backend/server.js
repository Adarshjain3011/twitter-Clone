const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const dbConnect = require("./config/Database");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
require("dotenv").config();
const Routes = require("./routes/route");
const Post = require("./routes/Post");
const CloudinaryConnect = require("./config/Cloudinary");
const cors = require("cors");

const app = express();
const server = http.createServer(app);

// Socket.io setup with CORS
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",  // Frontend URL
        methods: ["GET", "POST"],
        credentials: true,
    }
});

// Map to keep track of connected users
const connectedUsers = new Map();

io.on("connection", (socket) => {
    console.log("New client connected");

    socket.on("login", (userId) => {
        console.log("User successfully logged in:", userId);
        connectedUsers.set(userId, socket);
    });

    socket.on("disconnect", () => {
        for (const [key, value] of connectedUsers.entries()) {
            if (value === socket) {
                connectedUsers.delete(key);
                break;
            }
        }
        console.log("Client disconnected");
    });

    socket.on("sendMessage", ({ content, receiverId }) => {
        console.log("Server received message:", content, receiverId);
        io.emit("newMessage", { content });
    });

    // Handle other events...
});

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp",
}));
app.use(cors({
    origin: "http://localhost:3000",  // Frontend URL
    credentials: true,
}));

app.use(express.urlencoded({ extended: true }));

// Routes
app.get("/", (req, res) => {
    res.send("<h1>Hello</h1>");
});

app.use("/api/v1", Routes);
app.use("/api/v1", Post);

// Check if a user is online
app.get("/api/v1/:userId/online", (req, res) => {
    const { userId } = req.params;
    const isOnline = connectedUsers.has(userId);

    res.status(200).json({
        success: true,
        data: { userId, isOnline },
        message: "Check user online status",
    });
});

// Database and cloudinary connection
dbConnect();
CloudinaryConnect();

// Start the server
server.listen(process.env.PORT, () => {
    console.log(`Web server running on port ${process.env.PORT}`);
});
