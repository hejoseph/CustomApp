
var utils;

function Utils(){
    this.getDate = function(){
        return (new Date()).toLocaleString("FR");
    }
    this.sleep = function(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }
}

function getUtils(){
    console.log("getting utils");
  if(typeof utils == "undefined"){
    console.log("undefined utils");
    utils = new Utils();
  }
  return utils;
}

module.exports = getUtils();