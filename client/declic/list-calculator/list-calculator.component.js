'use strict';

angular.
  module('declic.list-calculator')

  .component('listCalculator', {
    templateUrl: './declic/list-calculator/list-calculator.template.html',
    controller: ['$scope', '$routeParams', '$location', '$window', 'Calculator', ListCalculatorCtrl
      ],
    controllerAs: 'vm'
  });


function ListCalculatorCtrl($scope, $routeParams, $location, $window, Calculator) {
  var vm = this;
  vm.calculators = [];
  console.log("hello list calculator");
  vm.getCalculators = function() {
    Calculator.getCalculators()
      .then(function(calculators) {
        console.log("success");
        vm.calculators = calculators;
        console.log(vm.calculators);
      })
      .catch(function(error) {
        console.log("error in ctrl list calc");
        console.error(error);
      });
  };

  vm.redirectTo = function(url){
    console.log(JSON.stringify(url));
    // alert('hi url='+url);
    $window.location.href = url;
  }

  // console.log("hello list calculator 1 "+vm.calculators);
  vm.getCalculators();
  // console.log("hello list calculator 2 "+vm.calculators);

  vm.calculator = {
      _name : "No name",
      _nbPlayers :3
  }; 

  console.log("hey");
  console.log(document.getElementById("main"));

  vm.createCalculator = function(calculator){
    if(!calculator._name || calculator._nbPlayers < 3){
      console.log("condition not respected to create a new calc");
    }
    console.log("OK Condition");

    Calculator.createCalculator(calculator)
    .then(function(resp) {
      console.log("success creating ?");
      console.log(resp);
      console.log(JSON.stringify(resp));
      var idCreated = resp.id;
      document.getElementsByClassName("modal-backdrop fade show").remove();
      $window.location.href = "#/declic/calc/"+idCreated;
    })
    .catch(function(error) {
      console.log("error creating");
      console.error(error);
    });
  }

}