const express = require("express");
const connectDB = require("./config/db");
const dotenv = require("dotenv");
const path = require("path");
const { chats } = require('./data/data.js');
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
const messageRoutes = require("./routes/messageRoutes");
const {notFound , errorHandler} = require("./middleware/errorMiddleware");
dotenv.config();
connectDB();
const app = express();
app.use(express.json());
// console.log(Array.isArray(chats));
app.get("/", (req, res) => {
    res.send("API is running successfully");
});
app.use('/api/user', userRoutes);
app.use('/api/chat', chatRoutes); 
app.use('/api/message', messageRoutes);

// Deployment
const __dirname1 = path.resolve();

  app.use(express.static(path.join(__dirname1, "/frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname1, "frontend", "build", "index.html"))
  );


// deployment end
app.use(notFound);
app.use(errorHandler);
const PORT = process.env.PORT || 5000;
const server = app.listen(5000, console.log("Server started on port 5000"));

const io = require("socket.io")(server, {
    pingTimeout: 60000,
    cors: {
        origin: "http://localhost:3000",
    }
});

io.on("connection", (socket) => {
  console.log("Connected to socket.io");
    socket.on("setup", (userData) => {
    socket.join(userData._id);
    socket.emit("connected");
    });

    socket.on("join chat", (room) => {
    socket.join(room);
    console.log("User Joined Room: " + room);
    });
     socket.on("typing", (room) => socket.in(room).emit("typing"));
    socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));
    
    socket.on("new message", (newMessageRecieved) => {
    var chat = newMessageRecieved.chat;

    if (!chat.users) return console.log("chat.users not defined");

    chat.users.forEach((user) => {
      if (user._id == newMessageRecieved.sender._id) return;

      socket.in(user._id).emit("message recieved", newMessageRecieved);
    });
    });
});

