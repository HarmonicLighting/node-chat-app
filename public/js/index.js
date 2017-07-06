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

socket.on('newEmail',function(email){
  console.log('New email',email);
});

socket.on('newMessage',function(message){
  console.log('Message broadcasted!');
  console.log('From:',message.from);
  console.log('On:',new Date(message.createdOn).toString());
  console.log('message:',message.text);
});
