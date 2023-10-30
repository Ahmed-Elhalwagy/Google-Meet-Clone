"use strict";
exports.__esModule = true;
/* eslint-disable @typescript-eslint/no-unused-vars */
var react_router_dom_1 = require("react-router-dom");
var react_1 = require("react");
function App(_a) {
    var socket = _a.socket;
    var _b = react_1.useState(""), inputRoom = _b[0], setInputRoom = _b[1];
    var navigate = react_router_dom_1.useNavigate();
    var handleCreateRoom = function () {
        var roomId;
        socket.emit('room:create', { userId: socket.id });
        socket.on('room:created', function (_a) {
            var room = _a.room;
            console.log(room);
            roomId = room;
            navigate("/" + roomId);
        });
    };
    var hadnleJoinRoom = function (e, roomId) {
        e.preventDefault();
        socket.emit('room:join', { roomId: roomId, userId: socket.id });
        socket.on('room:joined', function (_a) {
            var roomId = _a.roomId;
            navigate("/" + roomId);
        });
        socket.once("join:not-found", function () {
            console.log("Room not found");
        });
    };
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { className: "bg-slate-500" },
            React.createElement("button", { onClick: handleCreateRoom }, "Create a room"),
            React.createElement("form", { onSubmit: function (e) { return hadnleJoinRoom(e, inputRoom); } },
                React.createElement("input", { type: "text", value: inputRoom, placeholder: "Enter the Room Id", onChange: function (e) { return setInputRoom((e.target.value).trimStart()); } }),
                React.createElement("button", null, "Join Room")))));
}
exports["default"] = App;
