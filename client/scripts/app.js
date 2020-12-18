/* eslint-disable no-alert, no-console */

import '../styles/app.scss';

const app = angular.module('app', ['ngRoute']);

app.controller('MainCtrl', ['$scope', '$interval', '$http', function ($scope, $interval, $http) {
  $scope.arr = [];

  $interval(function () {
    $http.get('http://localhost:3000').then(function (res) {
      $scope.arr = res.data.arr;
    }, function (e) {
      // eslint-disable-next-line no-console
      console.error(e);
    });
  }, 3000);
}]);

const testApp = angular.module('testApp', []);

const TileController = function ($scope) {
  $scope.data = [];
};

testApp.controller('TileController', ['$scope', TileController]);
