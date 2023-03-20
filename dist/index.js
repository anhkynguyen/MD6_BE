"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router_1 = require("./src/router/router");
const body_parser_1 = __importDefault(require("body-parser"));
const data_source_1 = require("./src/data-source");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
data_source_1.AppDataSource.initialize().then(() => {
    console.log('database connected');
});
app.use((0, cors_1.default)());
app.use(express_1.default.static('./public'));
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use('', router_1.router);
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
const { createServer } = require("http");
const fs = require('fs');
const { Server } = require("socket.io");
const mimeTypes = {
    "html": "text/html",
    "js": "text/javascript",
    "css": "text/css"
};
const httpServer = createServer(function (req, res) {
    if (req.url === '/') {
        res.writeHead(200, { "Content-Type": "text/html" });
        fs.createReadStream('./views/trangchu.html').pipe(res);
    }
    const filesDefences = req.url.match(/\.js|.css/);
    if (filesDefences) {
        const extension = mimeTypes[filesDefences[0].toString().split('.')[1]];
        res.writeHead(200, { 'Content-Type': extension });
        fs.createReadStream(__dirname + "/" + req.url).pipe(res);
    }
});
const io = new Server(httpServer);
const users = {};
io.on('connection', socket => {
    socket.on('new-user', name => {
        users[socket.id] = name;
        socket.broadcast.emit('user-connected', name);
    });
    socket.on('send-chat-message', message => {
        socket.broadcast.emit('chat-message', { message: message, name: users[socket.id] });
    });
    socket.on('disconnect', () => {
        socket.broadcast.emit('user-disconnected', users[socket.id]);
        delete users[socket.id];
    });
});
httpServer.listen(3000, 'localhost', function () {
    console.log('Server running in http://localhost:3000');
});
//# sourceMappingURL=index.js.map