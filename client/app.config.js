angular.module('halp-desk')
    .config(function ($routeProvider) {
  $routeProvider
  .when('/', {
    templateUrl: './declic/main.template.html'
  })
  .when('/declic', {
    templateUrl: '/declic.html'
  })
  .when('/declic/list-calc', {
    template: '<list-calculator></list-calculator>'
  })
  .when('/declic/calc/:calcId', {
    template: '<calculator></calculator>'
  })
  .when('/error/:errorMsg', {
    templateUrl: './error.template.html',
    controller: ['$scope', '$routeParams', function ErrorCtrl($scope, $routeParams){
        $scope.errorMsg = $routeParams.errorMsg;
    }],
  })
  // .when('/declic/calc/create', {
  //   templateUrl: './declic/calculator/create/creating.template.html'
  // })
  .when('/next', {
    template: '<next-o></next-o>',
  });
});
