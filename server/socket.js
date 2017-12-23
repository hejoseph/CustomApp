// Keep track of which names are used so that there are no duplicates
var userNames = (function () {
  var names = {};
  console.log("socket server side, init cache names");
  var claim = function (name) {
    if (!name || names[name]) {
      return false;
    } else {
      names[name] = true;
      return true;
    }
  };

  // find the lowest unused "guest" name and claim it
  var getGuestName = function () {
    var name,
      nextUserId = 1;

    do {
      name = 'Guest ' + nextUserId;
      nextUserId += 1;
    } while (!claim(name));

    return name;
  };

  // serialize claimed names as an array
  var get = function () {
    var res = [];
    for (user in names) {
      res.push(user);
    }

    return res;
  };

  var free = function (name) {
    if (names[name]) {
      delete names[name];
    }
  };

  return {
    claim: claim,
    free: free,
    get: get,
    getGuestName: getGuestName
  };
}());

var dbMsg = (function(){
  console.log("init once msgs cache");
  var msgs = [];

  var getAllMsg = function(){
    return msgs;
  }

  var addMsg = function(msg){
    msgs.push(msg);
  }

  return {
      getAllMsg : getAllMsg,
      addMsg : addMsg
  };
}());

// export function for listening to the socket
// module.exports = function (socket) {

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

  console.log("new guest arrived, so send him all msgs");
  socket.emit("response:allMsgs",{
    messages : dbMsg.getAllMsg()
  });

  // notify other clients that a new user has joined
  socket.broadcast.emit('user:join', {
    name: name
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
  });
};
