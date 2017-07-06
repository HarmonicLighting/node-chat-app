var socket = io();

socket.on('connect', function(){
  console.log('Connected to server!');

  // socket.emit('createMessage',{
  //   from:'Mich',
  //   text: 'I just logged in!'
  // });
});

socket.on('disconnect', function(){
  console.log('Disconnected from server :(');
});


socket.on('newMessage',function(message){
  console.log('Message broadcasted!');
  console.log('From:',message.from);
  console.log('At:',new Date(message.createdAt).toString());
  console.log('message:',message.text);
  var li = jQuery('<li></li>');
  li.text(`${message.from}: ${message.text}`);

  jQuery('#messages').append(li);
});

jQuery('#message-form').on('submit', function(e){
  e.preventDefault();

  socket.emit('createMessage',{
    from: 'User',
    text: jQuery('[name=message]').val()
  }, function(){

  });
});
