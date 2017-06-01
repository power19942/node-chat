var socket = io();
socket.on('connect',function () {
    console.log('connected to server');
});

socket.on('disconnect',function (){
    console.log('disconnected');
});

socket.on('newMessage',function (message) {
   console.log('new message arrived',message);
   var li = jQuery('<li></li>');
   li.text(`${message.from}: ${message.text}`);
   jQuery("#messages").append(li);
});

socket.emit('createMessage',{
    from:'power',
    text:'fo'
},function (data) {
    console.log(data);
});

socket.on('newLocationMessage',function (message) {
    var li = jQuery('<li></li>');
    var a = jQuery('<a target="_blank">My Location</a>');
    li.text(`${message.from}: `);
    a.attr('href',message.url);
    li.append(a);
    jQuery('#messages').append(li);
});

jQuery('#message-form').on('submit',function (e) {
    e.preventDefault();
    socket.emit('createMessage',{
        from:'user',
        text:jQuery('[name=message]').val()
    },function (data) {
        jQuery('[name=message]').text='';
    });
});

var locationBtn = jQuery('#send-location');
locationBtn.on('click',function (e) {
    if (!navigator.geolocation){
        return alert('no geo location')
    }
    navigator.geolocation.getCurrentPosition(function (position) {
        socket.emit('createLocationMessage',{
            latitude:position.coords.latitude,
            longitude:position.coords.longitude
        });
    },function () {
        alert('error while fetching location');
    })
});