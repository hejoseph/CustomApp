angular.module('hello', ['factories'])
.controller('GetResponse', function ($scope, $location, $route, GetHello, socket) {
    

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

    socket.emit('test', {
      name: "mynamejoseph"
    }, function (result) {
      if (!result) {
        console.log('cannot send "test event"');
      } else {
        console.log("sucessfully sent");
      }
    });

});
