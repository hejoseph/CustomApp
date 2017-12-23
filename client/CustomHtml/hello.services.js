angular.module('hello.factory',[])
.factory('GetHello', function ($http) {

  var getMyResponse = function() {
    return $http({
      method: 'GET',
      url: '/api/getResponse'
    })
    .then(function(resp) {
      return resp.data;
    });
  };

  return {
    getMyReponse: getMyResponse
  };
});
