'use strict';

angular.
  module('declic.calculator')

  .filter('range', function() {
    return function(input, total) {
      total = parseInt(total);
      for (var i=0; i<total; i++) {
        input.push(i);
      }
      return input;
    };
  })

  .component('calculator', {
    templateUrl: './declic/calculator/calculator.template.html',
    controller: ['$scope', '$routeParams', '$location', '$window', 'Utils','Calculator', CalculatorCtrl
      ],
    controllerAs: 'vm'
  });

function CalculatorCtrl ($scope, $routeParams, $location, $window, Utils, Calculator) {
  var vm = this;
  var id = $routeParams.calcId;
  vm.calculator = {"_players":[]};
  vm.ranks = [];
  vm.getRound = function(){
      console.log("getting round");
      if(vm.calculator._players.length>0){
          return vm.calculator._players[0]._scores.length;
      }
      return 0;
  }

  vm.getTotalScore = function(player){
      // console.log("total score of player");
      var total = Utils.sumArray(player._scores);
      // console.log(total);
      // console.log(player);
      return total;
      // return Utils.sumArray(array);
  }

  vm.getAllScores = function(calculator){
      console.log("inside getAllScores");
      console.log(JSON.stringify(calculator));
      console.log("total player : "+calculator._players.length);
      console.log("nb score for player 1 "+calculator._players[0]._scores.length);
      var result = [];
      if(typeof calculator._players != "undefined"){
          console.log("there is an array");
          var players = calculator._players;
          for(var i = 0 ; i<players.length;i++){
              var total = vm.getTotalScore(players[i]);
              result.push(total);
          }
      }else{
          console.log("cannot access to undefined ");
      }
      return result;
  }

  vm.allPlayerScored = function(){
    if(vm.calculator._players.length==0) return false;
    for( var i=0;i<vm.calculator._players.length;i++){
      //console.log("reading index at "+vm.numRound);
      // //console.log(JSON.stringify(vm.players));
      if(vm.calculator._players[i]._scores[vm.numRound]==null){
        return false;
      }
    }
    return true;
  }

  //return 
  vm.getCalculator = function(id){
    Calculator.getCalculator(id)
      .then(function(calculator) {
        console.log("success");
        console.log("empty ? "+calculator == "");
        if(!calculator){
          console.log("calc empty");
          var errorMsg = "id '"+id+"' not found in the server, sorry mate :s";
          $window.location.href = "#/error/"+errorMsg;
        }
        vm.calculator = calculator;
        console.log("player at 0 ");
        vm.numRound = vm.getRound();
        vm.editingNames = Utils.initDefaultArray(vm.calculator._players.length, false);
        vm.updateRanks();
        copyState();
      })
      .catch(function(error) {
        console.log("error getting calc by id");
        console.error(error);
    });
  }
  vm.getCalculator(id);


  vm.editingNbPlayers = false;
  vm.settingNb = true;
  vm.portraitView = true;
  vm.numRound = 0;
  vm.playerOrder = 1;

  vm.range = function(n) {
      return new Array(n);
  };

  // socket.on('init', function (data) {
  //   console.log("on init data return : "+JSON.stringify(data));
  //   vm.name = data.name;
  //   vm.users = data.users;
  // });

  // socket.on('hello', function (data) {
  //   console.log("on init data return : "+JSON.stringify(data));
  //   vm.name = data.name;
  //   vm.users = data.users;
  // });

  var copyState = function(){
    //console.log("copying state, at this moment "+vm.players.length);
    vm.currentGameState = {
      players : angular.copy(vm.calculator._players),
      playerOrder : angular.copy(vm.playerOrder),
    };
    console.log("copied !");
    console.log(vm.currentGameState);
  }

  this.showmsg = function(){
    alert('hi');
  }

  vm.editNbPlayers = function(){
    //console.log("edit click");
    vm.editingNbPlayers = !vm.editingNbPlayers;
    vm.nbTemp = angular.copy(vm.nb);
  }
  // vm.validateNbPlayers = function(){
  //   if(vm.nb<3){
  //     vm.messageNbPlayers = "min nb players should be 3 ...";
  //     return;
  //   }
  //   vm.messageNbPlayers = "";
  //   for(var i = 1; i<=vm.nb ;i++){
  //     vm.players.push({
  //       name : "Player "+i,
  //       scores :[],
  //       total : 0,
  //       editingName : false,
  //       scored : false
  //     });
  //   }
  //   vm.settingNb = false;
  //   copyState();
  // }
  vm.updateNbPlayers = function(){
    //console.log("total nb player = " + vm.nbRealPlayers);
    vm.editingNbPlayers = !vm.editingNbPlayers;
  }

  vm.updateRanks = function(){
      vm.ranks = Utils.getRanks(vm.getAllScores(vm.calculator));
  }

  vm.cancelNbPlayers = function(){
    //console.log("nbTemps "+vm.nbTemp);
      vm.nb = vm.nbTemp;
      vm.editingNbPlayers = !vm.editingNbPlayers;
  }
  vm.switchView = function(){
    vm.portraitView = !vm.portraitView;
  }
  // var setPrevUrl = function(){
    // //console.log("setting prev url ...");
  // }

  vm.editingPlayerName = function(index){
    vm.editingNames[index] = true;
  }

  vm.setName = function(index){
    vm.editingNames[index] = false;
  }

  vm.addScore = function(index){
    console.log("index:"+index+" round:"+vm.numRound);
    vm.calculator._players[index]._scores[vm.numRound] = vm.playerOrder;
    // vm.calculator._players[index]._total+=vm.playerOrder;
    console.log("score added "+vm.playerOrder);
    vm.playerOrder+=1;
    console.log("inc");
    console.log(JSON.stringify(vm.calculator._players[index]));
    console.log(vm.calculator._players[index]._scores[vm.numRound]!=null);
    vm.updateRanks();
    // vm.players[index].scored = true;
  }

  vm.subScore = function(index){
    vm.calculator._players[index]._scores[vm.numRound] = -vm.playerOrder;
    // vm.calculator._players[index].total-=vm.playerOrder;
    vm.playerOrder+=1;
    vm.updateRanks();
    // vm.players[index].scored = true;
  }

  

  vm.onePlayerScore = function(){
    for(var i=0;i<vm.calculator._players.length;i++){
      if(vm.calculator._players[i]._scores[vm.numRound]!=null){
        return true;
      }
    }
    return false;
  }

  vm.validateRound = function(){
    //console.log("validate clicked");
    vm.numRound += 1;
    //console.log("round inc");
    vm.playerOrder = 1;
    //console.log("playerOrder reset");
    copyState();
    Calculator.saveCalculator(vm.calculator);
  }

  vm.resetRound = function(){
    //console.log("reset clicked");
    //console.log(JSON.stringify(vm.currentGameState));
    //console.log("players");
    //console.log(JSON.stringify(vm.players));
    //console.log("order");
    //console.log(JSON.stringify(vm.playerOrder));

    vm.calculator._players = angular.copy(vm.currentGameState.players);
    vm.playerOrder = angular.copy(vm.currentGameState.playerOrder);
  }

  console.log("vm = ");
  console.log(JSON.stringify(vm));

}

function init(calculator){

}