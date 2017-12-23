angular.module('hello', [])
.controller('GetResponse', function ($scope, $location, $route, GetHello) {
    

    $scope.GetHello = function() {
        GetHello.getMyReponse()
      .then(function(rep) {
        console.log("ok");
        $scope.rep = rep;
        console.log($scope.rep);
      })
      .catch(function(error) {
        console.error(error);
      });
    };

    $scope.GetHello();

    console.log("debug");
    $scope.hello = "hello my friend ";
});
