var userNames;
var dbMsg;

function UserNames(){
  var box = "hello";
  this.created = Date();
  var names = {};
  this.claim = function(name){
    if (!name || names[name]) {
      return false;
    } else {
      names[name] = true;
      return true;
    }
  };

  this.getBox = function(){
    return box;
  }

  this.setBox = function(boxname){
     box = boxname;
  }

  this.getGuestName = function(){
    var name,
      nextUserId = 1;

    do {
      name = 'Guest ' + nextUserId;
      nextUserId += 1;
    } while (!this.claim(name));

    return name;
  };

  this.get = function () {
    var res = [];
    for (user in names) {
      res.push(user);
    }

    return res;
  };

  this.getCreated = function(){
    console.log("getting created date in object userNames");
    return this.created;
  }

  console.log("socket server side, init cache names , size of names.length = "+this.get().length);

  this.free = function (name) {
    if (names[name]) {
      delete names[name];
    }
  };
};

function DbMsg(){
  this.created = Date();
  console.log("init once msgs cache");
  var msgs = [];

  this.getAllMsg = function(){
    return msgs;
  }

  this.getCreated = function(){
    console.log("getting created date in object DbMsg");
    return this.created;
  }

  this.addMsg = function(msg){
    msgs.push(msg);
  }
};

//use this function to get singleton object
function getUserNames(){

  if(typeof userNames == "undefined"){
    sleep(3000);
    userNames = new UserNames();
  }
  return userNames;
}

function getDbMsg(){
  if(typeof dbMsg == "undefined"){
    sleep(5000);
    dbMsg = new DbMsg();
  }
  return dbMsg;
}

// module.exports = {userNames : new userNames(), dbMsg : new dbMsg()};
exports.userNames = getUserNames();
exports.dbMsg = getDbMsg();


function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}