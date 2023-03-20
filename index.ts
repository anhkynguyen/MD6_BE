import express from "express";
import {router} from './src/router/router';
import bodyParser from "body-parser";
import {AppDataSource} from "./src/data-source";
import cors from "cors";


const app = express();

AppDataSource.initialize().then(() => {
    console.log('database connected');
});
app.use(cors());
app.use(express.static('./public'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('', router);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
})

//////////////////////////////////////////////////////////////
const { createServer } = require("http");
const fs = require('fs');
const { Server } = require("socket.io");

const mimeTypes = {
    "html": "text/html",
    "js": "text/javascript",
    "css": "text/css"
};

const httpServer = createServer(function (req, res){
    if (req.url === '/') {
        res.writeHead(200, { "Content-Type": "text/html" });
        fs.createReadStream('./views/trangchu.html').pipe(res)
    }
    /* đọc file css/js*/
    const filesDefences = req.url.match(/\.js|.css/);
    if (filesDefences) {
        const extension = mimeTypes[filesDefences[0].toString().split('.')[1]];
        res.writeHead(200, { 'Content-Type': extension });
        fs.createReadStream(__dirname + "/" + req.url).pipe(res)
    }
});

const io = new Server(httpServer);

const users = {}

io.on('connection', socket => {
    socket.on('new-user', name => {
        users[socket.id] = name
        socket.broadcast.emit('user-connected', name)
    })
    socket.on('send-chat-message', message => {
        socket.broadcast.emit('chat-message', { message: message, name: users[socket.id] })
    })
    socket.on('disconnect', () => {
        socket.broadcast.emit('user-disconnected', users[socket.id])
        delete users[socket.id]
    })
})

httpServer.listen(3000, 'localhost', function (){
    console.log('Server running in http://localhost:3000')
})