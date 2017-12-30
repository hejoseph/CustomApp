//this is a calculator object, equivalent to a declic solo game
var Utils = require("../utils.js");
var Player = require("./player.js");
function Calculator(){
    //use when inside calculator view
    this._id = Date.now();
    this._players = [];
    this._started = Utils.getDate();
    this._open = true;
    this._name = "no name";
    this._atRound = 0;
    
    this.addPlayer = function(player){
        this._players.push(player);
    }

    this.regenId = function(){
        this._id = Date.now();
    }

    this.createPlayers = function(nb){
        for(var i = 0; i<nb; i++){
            this.addPlayer(new Player("Player "+(i+1)));
        }
    }
}

module.exports = Calculator;