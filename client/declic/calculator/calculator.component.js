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
    controller: ['$scope', '$routeParams', '$location', 'socket', CalculatorCtrl
      ],
    controllerAs: 'vm'
  });


function CalculatorCtrl ($scope, $routeParams, $location, socket) {
  this.newVar = "my new var";
  $scope.profilName = "Jaysef";
  $scope.nb = 0;
  $scope.editingNbPlayers = false;
  $scope.nbRealPlayers = 0;
  $scope.players = [];
  $scope.settingNb = true;
  $scope.portraitView = true;
  $scope.numRound = 0;
  $scope.playerOrder = 1;

  $scope.range = function(n) {
      return new Array(n);
  };

  this.mymsg = "my msg this";

  socket.on('init', function (data) {
    console.log("on init data return : "+JSON.stringify(data));
    $scope.name = data.name;
    $scope.users = data.users;
  });

  socket.on('hello', function (data) {
    console.log("on init data return : "+JSON.stringify(data));
    $scope.name = data.name;
    $scope.users = data.users;
  });

  var copyState = function(){
    //console.log("copying state, at this moment "+$scope.players.length);
    $scope.currentGameState = {
      players : angular.copy($scope.players),
      playerOrder : angular.copy($scope.playerOrder),
    };
  }

  this.showmsg = function(){
    alert('hi');
  }

  $scope.editNbPlayers = function(){
    //console.log("edit click");
    $scope.editingNbPlayers = !$scope.editingNbPlayers;
    $scope.nbTemp = angular.copy($scope.nb);
  }
  $scope.validateNbPlayers = function(){
    if($scope.nb<3){
      $scope.messageNbPlayers = "min nb players should be 3 ...";
      return;
    }
    $scope.messageNbPlayers = "";
    for(var i = 1; i<=$scope.nb ;i++){
      $scope.players.push({
        name : "Player "+i,
        scores :[],
        total : 0,
        editingName : false,
        scored : false
      });
    }
    $scope.settingNb = false;
    copyState();
  }
  $scope.updateNbPlayers = function(){
    //console.log("total nb player = " + $scope.nbRealPlayers);
    $scope.editingNbPlayers = !$scope.editingNbPlayers;
  }
  $scope.cancelNbPlayers = function(){
    //console.log("nbTemps "+$scope.nbTemp);
      $scope.nb = $scope.nbTemp;
      $scope.editingNbPlayers = !$scope.editingNbPlayers;
  }
  $scope.switchView = function(){
    $scope.portraitView = !$scope.portraitView;
  }
  // var setPrevUrl = function(){
    // //console.log("setting prev url ...");
  // }

  $scope.editingPlayerName = function(index){
    $scope.players[index].editingName = true;
  }

  $scope.setName = function(index){
    $scope.players[index].editingName = false;
  }

  $scope.addScore = function(index){
    console.log("index:"+index+" round:"+$scope.numRound);
    $scope.players[index].scores[$scope.numRound] = $scope.playerOrder;
    $scope.players[index].total+=$scope.playerOrder;
    console.log("score added "+$scope.playerOrder);
    $scope.playerOrder+=1;
    console.log("inc");
    console.log(JSON.stringify($scope.players[index]));
    // $scope.players[index].scored = true;
  }

  $scope.subScore = function(index){
    $scope.players[index].scores[$scope.numRound] = -$scope.playerOrder;
    $scope.players[index].total-=$scope.playerOrder;
    $scope.playerOrder+=1;
    // $scope.players[index].scored = true;
  }

  $scope.allPlayerScored = function(){
    if($scope.players.length==0) return false;
    for( var i=0;i<$scope.players.length;i++){
      //console.log("reading index at "+$scope.numRound);
      // //console.log(JSON.stringify($scope.players));
      if($scope.players[i].scores[$scope.numRound]==null){
        return false;
      }
    }
    return true;
  }

  $scope.onePlayerScore = function(){
    for(var i=0;i<$scope.players.length;i++){
      if($scope.players[i].scores[$scope.numRound]!=null){
        return true;
      }
    }
    return false;
  }

  $scope.validateRound = function(){
    //console.log("validate clicked");
    $scope.numRound += 1;
    //console.log("round inc");
    $scope.playerOrder = 1;
    //console.log("playerOrder reset");
    copyState();
  }

  $scope.resetRound = function(){
    //console.log("reset clicked");
    //console.log(JSON.stringify($scope.currentGameState));
    //console.log("players");
    //console.log(JSON.stringify($scope.players));
    //console.log("order");
    //console.log(JSON.stringify($scope.playerOrder));

    $scope.players = angular.copy($scope.currentGameState.players);
    $scope.playerOrder = angular.copy($scope.currentGameState.playerOrder);
  }

}