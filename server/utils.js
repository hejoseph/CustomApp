
var utils;

Date.prototype.addHours = function(h) {    
   this.setTime(this.getTime() + (h*60*60*1000)); 
   return this;   
}

function Utils(){
    this.getDate = function(){
        return (new Date()).addHours(1).toLocaleString("FR");
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