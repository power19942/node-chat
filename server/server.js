const path = require("path");
const publicPath = path.join(__dirname,'../public');
const express = require("express");
const socketiO = require("socket.io");
const http = require("http");

const {generateMessage,generateLocationMessage} = require('./utils/message');
const port = process.env.PORT || 1234;
var app = express();
var server = http.createServer(app);
var io = socketiO(server);

io.on('connection',(socket)=>{
   console.log('new user connected');
       
       socket.on('createMessage',(message,callback)=>{
          console.log('create message',message);
          io.emit('newMessage',generateMessage(message.from,message.text));
           callback('this is from server');
           //socket.broadcast.emit('newMessage',generateMessage(message.from,message.text))
       });

    socket.on('createLocationMessage',(cords)=>{
        io.emit('newLocationMessage',generateLocationMessage('Admin',cords.latitude,cords.longitude));
    });


   socket.on('disconnect',()=>{
      console.log('user disconnected');
   })
});

app.use(express.static(publicPath));

server.listen(port,function () {
   console.log(`app runing on ${port}`);
});