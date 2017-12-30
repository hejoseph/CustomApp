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



}