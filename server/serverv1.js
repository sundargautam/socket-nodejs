const express = require("express");
const socketIo = require("socket.io");
const http = require("http");
const path = require("path");
const publicPath = path.join(__dirname, "/../public");
const app = express();
const server = http.createServer(app);
const io = socketIo(server);
app.use("/public", express.static(publicPath));

io.on("connection", (socket) => {
    console.log(socket.handshake.query);
  console.log("client connected successfully");
  socket.emit("visited site", {
    from: "Babaji Chat Bot",
    text: "welcome to chat User",
  });
  socket.broadcast.emit("visited site", {
    from: "Babaji Chat Bot",
    text: "New User has joined the chat",
  });
});

server.listen(8000, () => {
  console.log("listening at port 8080");
});
