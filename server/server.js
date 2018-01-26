const express = require('express');
const http = require('http');
const path = require('path');
const socketIO = require('socket.io');
const { generateMessage } = require('./untilty/messages');
const { generatelocationMessage } = require('./untilty/locationMessage');
const { isRealString, doesUserNameExists } = require('./untilty/validator');
const { Users } = require('./untilty/Users');

const app = express();

const server = http.createServer(app);
const io = socketIO(server);
const users= new Users();
app.use(express.static(path.join(__dirname, '../public')));

io.on('connection', (socket) => {
    console.log("New user is connect");

    socket.on('join', (params,callback) => {
        if(!isRealString(params.name) || !isRealString(params.room)){
          return callback("Name and room name are required");

        }else if(doesUserNameExists(users.getUserList(params.room), params.name)){
            return callback("Equal name have user in group");
        }
        socket.join(params.room);
        users.reomveUser(socket.id);
        users.addUser(socket.id, params.name, params.room);
        io.to(params.room).emit('updateUserList', users.getUserList(params.room))
        socket.emit("newMessage", generateMessage("Admin", `Welocome new user ${params.name} in room ${ params.room}`));
        socket.broadcast.to(params.room).emit("newMessage", generateMessage("Admin", "New user "+ params.name +" is with us"));
        callback();
    });
        socket.on("createMessege", function (message,callback) {
            const user= users.getUser(socket.id);
            if(user && isRealString(message.text)) {
                io.to(user.room).emit('newMessage', generateMessage(user.name, message.text));
            }
            callback();
        });
        socket.on("createLocationMessage", (location)=> {
            const user= users.getUser(socket.id);
            if(user) {
                io.to(user.room).emit("newLocationMessage", generatelocationMessage( user.name, location.longitude, location.latitude));
            }
        });
    socket.on('disconnect', () => {
        console.log("User is disconnect ");
        var user= users.reomveUser(socket.id);
        if(user){
            io.to(user.room).emit('updateUserList', users.getUserList(user.room));
            io.to(user.room).emit('newMessage', generateMessage("Admin", `${user.name} has left`));

        }
    });


});
app.listen(process.env.PORT || 3000, function(){

    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});
