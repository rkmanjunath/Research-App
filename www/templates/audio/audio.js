angular.module('starter')

  .controller('audioCtrl', function($scope,$state) {
    //$scope.service = StudyService;
    $scope.changePage = function () {
      $state.go('app.export');
    };

    $scope.backPage = function () {
      $state.go('app.camera');
    };
  });
