angular.module('halp-desk')
    .config(function ($routeProvider) {
  $routeProvider
  .when('/', {
    templateUrl: './CustomHtml/hello.html',
    controller: 'GetResponse'
  })
  .when('/next', {
    template: '<next-o></next-o>',
  });
});
