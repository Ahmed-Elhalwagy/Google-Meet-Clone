"use strict";
exports.__esModule = true;
var express_1 = require("express");
var dotenv_1 = require("dotenv");
var cors_1 = require("cors");
var http_1 = require("http");
var peer_1 = require("peer");
var socket_io_1 = require("socket.io");
var uuid_1 = require("uuid");
var nanoid_1 = require("nanoid");
dotenv_1["default"].config();
var app = express_1["default"]();
var server = http_1["default"].createServer(app);
var peerServer = peer_1.ExpressPeerServer(server);
var groups = [];
var io = new socket_io_1.Server(server, {
    cors: {
        origin: process.env.FRONT_URL
    }
});
app.use(cors_1["default"]({
    'origin': '*',
    'preflightContinue': true
}));
app.use('/peerjs', peerServer);
var port = process.env.PORT || 5000;
io.engine.generateId = function (req) {
    return uuid_1.v4();
};
io.on('connection', function (socket) {
    console.log("A user connected on sockek => ", socket.id);
    socket.on("disconnect", function () {
        console.log("disconnected user => ", socket.id);
    });
    socket.on('room:create', function () {
        var room = nanoid_1.nanoid(8);
        groups.push(room);
        console.log('Room created => ', room);
        socket.emit('room:created', { room: room });
    });
    socket.on('room:join', function (_a) {
        var roomId = _a.roomId, userId = _a.userId;
        console.log('Room joined => ', roomId);
        if (groups.includes(roomId)) {
            socket.emit('room:joined', { roomId: roomId });
            socket.join(roomId);
            console.log("User " + socket.id + " joined room " + roomId);
        }
        else {
            console.error("Invalid Room ID");
            socket.emit("join:not-found");
        }
        socket.on('disconnect', function () {
            socket.to(roomId).emit('user-disconnected', userId);
        });
    });
    socket.on('chat message', function (payload) {
        io.to(payload.roomId).emit("chat message", payload);
        console.log(payload.userId + " Sent " + payload.msg + " to room " + payload.roomId);
    });
});
server.listen(port, function () {
    console.log("Server is running on port " + port);
});
app.get('/room/:id', function (req, res) {
});
