const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
var emoji = require('node-emoji')
const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

var users = new Users();

app.use(express.static(publicPath));

io.on('connection', (socket) => {

  socket.on('join',(params,callback)=>{
    if (!isRealString(params.name) || !isRealString(params.room)) {
      return callback('Name and room name are required '+emoji.get('disappointed_relieved'));
    }

    if(users.userNameExists(params.name)){
      return callback('The user name <'+params.name+'> was already taken. Please use another one '+emoji.get('disappointed_relieved'));
    }

    socket.join(params.room);
    users.removeUser(socket.id);
    users.addUser(socket.id,params.name,params.room);

    io.to(params.room).emit('updateUserList',users.getUserList(params.room));

    socket.emit('newMessage',generateMessage('Admin',params.name+', welcome to the chat App! '+emoji.get('smiley')));
    socket.broadcast.to(params.room).emit('newMessage',generateMessage('Admin','user '+params.name+' has joined! '+ emoji.get('star')));
    callback();
  });

  socket.on('createMessage',(message,callback)=>{
    var user = users.getUser(socket.id);

    if(user != null && isRealString(message.text)){
      io.to(user.room).emit('newMessage',generateMessage(user.name,message.text));
    }
    callback();
  });

  socket.on('createLocationMessage', (coords) => {
    var user = users.getUser(socket.id);
    if (user != null) {
      io.to(user.room).emit('newLocationMessage',generateLocationMessage(user.name,coords.latitude,coords.longitude));
    }
  });

  socket.on('disconnect', () => {
    var user = users.removeUser(socket.id);
    if (user != null){
      io.to(user.room).emit('updateUserList', users.getUserList(user.room));
      io.to(user.room).emit('newMessage', generateMessage('Admin', user.name+' has left '+emoji.get('moon')));
    }
  });
});


server.listen(port,()=>{
  console.log('Server is up on port',port);
});
