// 'use strict';

// Register `phoneList` component, along with its associated controller and template
angular.
  module('hello').
  component('nextO', {
    templateUrl: 'CustomHtml/next.template.html',
    controller: ['$scope',
      function PhoneListController($scope) {
        $scope.next = "next friend josepha";
      }
    ]
  });
