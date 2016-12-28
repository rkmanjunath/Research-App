angular.module('starter')

  .controller('exportCtrl', function($scope,$state) {
    //$scope.service = StudyService;

    $scope.backPage = function () {
      $state.go('app.audio');
    };
  });
