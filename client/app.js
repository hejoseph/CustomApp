angular.module('halp-desk', [
  'halp-desk.factories',
  'factories',
  'btford.socket-io',
  'hello.factory',
  'halp-desk.open',
  'halp-desk.archive',
  'ngRoute',
  'hello'
])
.config(function ($routeProvider) {
  $routeProvider
  // .when('/', {
  //   templateUrl: './CustomHtml/hello.html',
  //   controller: 'OpenController'
  // })
  .when('/open', {
    templateUrl: './open/open.html',
    controller: 'OpenController'
  })
  .when('/archive', {
    templateUrl: './archive/archive.html',
    controller: 'ArchiveController'
  })
  .otherwise({
    redirectTo: '/open'
  });
});
