console.log("requiring server data in socket js");
var serverdata = require("./serverdata.js");
console.log("in socket js : required");
console.log("UserNames created at : "+serverdata.userNames.getCreated());
console.log("DbMsg created at : "+serverdata.dbMsg.getCreated());
// export function for listening to the socket
// module.exports = function (socket) {

var obj = serverdata.userNames;
console.log("get box in socket js : "+obj.getBox());  
console.log("set box to 'bye'");
obj.setBox("bye");
console.log("get box :"+obj.getBox());  


var userNames = serverdata.userNames;
var dbMsg = serverdata.dbMsg;



module.exports = function(socket) {
  var name = userNames.getGuestName();
  var now = new Date();
  console.log(now);
  console.log(name);
  console.log("socket server side init trigger");
  // send the new user their name and a list of users
  socket.emit('init', {
    name: name,
    users: userNames.get()
  });

  socket.emit('hello', {
    msg : "hello friend"
  });

  console.log("new guest arrived, so send him all msgs");
  socket.emit("response:allMsgs",{
    messages : dbMsg.getAllMsg()
  });

  // notify other clients that a new user has joined
  socket.broadcast.emit('user:join', {
    name: name
  });

  socket.on('test', function (data) {
    console.log("listening on event 'test', and receive data:");
    console.log(data);
  });

  // broadcast a user's message to other users
  socket.on('send:message', function (data) {
    console.log("username : "+name);
    console.log(data);
    socket.broadcast.emit('send:message', {
      user: name,
      text: data.message
    });
    dbMsg.addMsg({user: name, text: data.message});
    console.log("message is added "+dbMsg.getAllMsg().length);
  });

  // validate a user's name change, and broadcast it on success
  socket.on('change:name', function (data, fn) {
    if (userNames.claim(data.name)) {
      var oldName = name;
      userNames.free(oldName);

      name = data.name;
      
      socket.broadcast.emit('change:name', {
        oldName: oldName,
        newName: name
      });

      fn(true);
    } else {
      fn(false);
    }
  });

  // clean up when a user leaves, and broadcast it to other users
  socket.on('disconnect', function () {
    socket.broadcast.emit('user:left', {
      name: name
    });
    userNames.free(name);
    console.log("client disconnected "+name);
  });

  this.getAllUsers = function(){
    console.log("getting users ? ");
    return userNames.get();
  }

};



