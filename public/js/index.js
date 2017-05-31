var socket = io();
socket.on('connect',function () {
    console.log('connected to server');
    socket.emit('createEmail',{
       to:'power',
        text:'fuck you to'
    });
});

socket.on('disconnect',function (){
    console.log('disconnected');
});

socket.on('newMessage',function (message) {
   console.log('new message arrived',message);
});