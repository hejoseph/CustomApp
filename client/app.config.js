angular.module('halp-desk')
    .config(function ($routeProvider) {
  $routeProvider
  .when('/', {
    templateUrl: './declic/main.template.html'
  })
  .when('/declic', {
    templateUrl: '/declic.html'
  })
  .when('/declic/calc', {
    template: '<calculator></calculator>'
  })
  // .when('/declic/calc/create', {
  //   templateUrl: './declic/calculator/create/creating.template.html'
  // })
  .when('/next', {
    template: '<next-o></next-o>',
  });
});
