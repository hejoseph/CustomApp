var Calculator = require("./calculator.js");
var declic;
function Declic(){
    this.calculators = {};

    this.createCalculator = function(calc_name, nb_player){
        var calc = new Calculator();
        calc._name = calc_name;
        calc.createPlayers(nb_player);
        while(this.exists(calc._id)){
            calc.regenId();
        }
        this.calculators[calc._id] = calc;
        return calc._id;
    }
    //id and calculator object, save it in hashmap
    this.saveCalculator = function(calculator){
        console.log("saving calc obj ...");
        var id = calculator._id;
        if(this.exists(id)){
            console.log("replacing existing object");
            this.calculators[id] = calculator;
            console.log(calculator);
        }
    }

    this.exists = function(id){
    if (!id || this.calculators[id]) {
        console.log("id "+id+" already exist");
        return true;
    } else {
        console.log("id "+id+" does not exist");
        return false;
    }
  };
}
//singleton db
function getDeclic(){
  console.log("getting declic");
  if(typeof declic == "undefined"){
    console.log("undefined declic, so create a new one");
    declic = new Declic();
  }
  return declic;
}

module.exports = getDeclic();