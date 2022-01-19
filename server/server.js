const express = require("express");
const socketIo = require("socket.io");
const http = require("http");
const path = require("path");
const publicPath = path.join(__dirname, "/../public");
const app = express();
const server = http.createServer(app);
const io = socketIo(server);
app.use("/public", express.static(publicPath));

const bidingHistory = []; //this simulates our biding database

const room = ["phone", "tv"]; //avilable rooms

io.on("connection", (socket) => {
  console.log(socket.handshake.query.id, socket.handshake.query.name); //with this id i can change status of user in database
  socket.on("makeBid", (params) => {
    const { productId, auctionId, bidAmount, room, name, id } = params;

    bidingHistory.push({ ...params });
    console.log(bidingHistory);
    if (bidAmount >= Math.max(...bidingHistory.map((o) => o.bidAmount))) {
      socket.broadcast
        .to(room)
        .emit("bidMessage", "someone has bidded more than you");
    } else {
      socket.to(room).emit("bidMessage", `${name} participated in bidding`);
    }
  });

  socket.on("joinPhone", () => {
    console.log("triggered phone auction");
    socket.join(room[0]);
    socket.broadcast.to(room[0]).emit("success phone", "new member on phone");
  });

  socket.on("joinTv", () => {
    console.log("triggered tv auction");
    socket.join(room[1]);
    socket.to(room[0]).emit("success tv", "new member on tv");
  });

  socket.on("disconnect", () => {
    console.log(
      socket.handshake.query.id,
      socket.handshake.query.name,
      "disconnected"
    ); //with this id i can change status of user in database
  });
});
server.listen(8080, () => {
  console.log("listening at port 8080");
});
