var socket = io();

socket.on('connect', function(){
  console.log('Connected to server!');

  socket.emit('createMessage',{
    from:'Mich',
    text: 'I just logged in!'
  });
});

socket.on('disconnect', function(){
  console.log('Disconnected from server :(');
});


socket.on('newMessage',function(message){
  console.log('Message broadcasted!');
  console.log('From:',message.from);
  console.log('At:',new Date(message.createdAt).toString());
  console.log('message:',message.text);
});
