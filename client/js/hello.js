/* eslint-disable */

angular.module('hello', ['ngRoute']).config(($routeProvider, $httpProvider) => {
  $routeProvider.when('/', {
    templateUrl: 'home.html',
    controller: 'home',
    controllerAs: 'controller'
  }).otherwise('/');

  $httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
  $httpProvider.defaults.headers.common.Accept = 'application/json';

}).controller('navigation', ($rootScope, $http, $location, $route) => {
  const self = this;

  self.tab = (route) => {
    return $route.current && route === $route.current.controller;
  };

  $http.get('user').then((response) => {
    if (response.data.name) {
      $rootScope.authenticated = true;
    } else {
      $rootScope.authenticated = false;
    }
  }, () => {
    $rootScope.authenticated = false;
  });

  self.credentials = {};

  self.logout = () => {
    $http.post('logout', {}).finally(() => {
      $rootScope.authenticated = false;
      $location.path("/");
    });
  };
}).controller('home', ($http) => {
  const self = this;
  $http.get('idpapi/v1').then((response) => {
    self.greeting = response.data;
  });
});
