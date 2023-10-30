"use strict";
exports.__esModule = true;
// import MainVideo from "./components/MainVideo";
var ChatBox_1 = require("./components/ChatBox");
// import MainVideo from "./components/MainVideo";
var getCurrentRoomID = function () {
    var path = window.location.pathname.split('/');
    if (path[path.length - 1] === '')
        return path[path.length - 2];
    else
        return path[path.length - 1];
};
function Room(_a) {
    var socket = _a.socket;
    var roomId = getCurrentRoomID();
    if (roomId === undefined)
        return;
    socket.emit('room:join', { roomId: roomId, userId: socket.id });
    // socket.on("connect", ()=>{
    //   console.log('Socket ID:' , socket.id);
    // });
    //   socket.on("disconnect", ()=>{
    //   console.log('Your are Disconnected')});
    // socket.on("user-connected", ()=>{
    //   console.log("User Connected");
    // })
    return (React.createElement("div", null,
        React.createElement(ChatBox_1["default"], { socket: socket, roomId: roomId })));
}
exports["default"] = Room;
