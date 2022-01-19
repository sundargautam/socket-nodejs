const user = JSON.parse(localStorage.getItem("user"));
const welcomeUser = document.createElement("p");
welcomeUser.innerHTML = `welcome to auctioin system <b> ${user?.name} </b>`;
document.querySelector(".user").appendChild(welcomeUser);
const socket = io({ query: { ...user } });

const joinPhoneAuction = (e) => {
  socket.emit("joinPhone");
};
const joinTvAuction = (e) => {
  socket.emit("joinTv");
};

const handleForm = (e) => {
  const bidAmount = document.getElementById("bid").value;
  socket.emit("makeBid", {
    productId: 1,
    auctionId: 1,
    bidAmount,
    room: "phone",
    ...user,
  });
  e.preventDefault();
};

socket.on("bidMessage", (message) => {
  console.log(message);
});

socket.on("success phone", (message) => {
  console.log(message);
});
socket.on("success tv");
