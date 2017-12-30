angular.module('factories')
.factory('Calculator', function ($http) {
  var getCalculators = function() {
    return $http({
      method: 'GET',
      url: '/api/getCalculators'
    })
    .then(function(resp) {
      console.log("calling /api/getCalculators");
      return resp.data;
    });
  };

  var getCalculator = function(id){
    return $http({
      method: 'GET',
      url: '/api/getCalculator?id='+id
    })
    .then(function(resp) {
      console.log("calling /api/getCalculator?id="+id);
      return resp.data;
    });
  }

  var saveCalculator = function(calc){
      console.log("telling service to save calc");
      return $http({
        method: 'POST',
        url: '/api/saveCalculator',
        data: calc
      })
      .then(function(resp){
          console.log("response from server after saving ...");
          console.log(resp.data);
      });
  }

  // var submitTicket = function(ticket) {
  //   return $http({
  //     method: 'POST',
  //     url: '/api/ticket',
  //     data: ticket
  //   });
  // };

  // var updateTicket = function(data) {
  //   return $http({
  //     method: 'PUT',
  //     url: '/api/ticket',
  //     data: data
  //   });
  // };

  // var deleteTicket = function(ticket) {
  //   return $http({
  //     method: 'POST',
  //     url: '/api/delete',
  //     data: ticket
  //   });
  // };

  return {
    getCalculators: getCalculators,
    getCalculator: getCalculator,
    saveCalculator: saveCalculator
    // getArchive: getArchive,
    // submitTicket: submitTicket,
    // updateTicket: updateTicket,
    // deleteTicket: deleteTicket
  };
});