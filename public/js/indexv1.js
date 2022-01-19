// const socket = io({query:{name:"sundar"}})   //if running on same port
/* 
*const socket = io('https://195.174.3.104:3000', { query: { myParam: 'myValue' } });
*if running on different port
*/
// const socket = io();
// socket.on('connect',()=>{
//     const connectionInfo = document.createElement("h1");
//     connectionInfo.innerHTML = "Welcome to Chat System";
//     document.querySelector(".notice").appendChild(connectionInfo);
// });


socket.on("visited site",(message)=>{
    const messageElement = document.createElement("li");
    messageElement.innerHTML = `From:<b>${message.from}</b>:${message.text}`;
    document.querySelector(".message").appendChild(messageElement); 
})