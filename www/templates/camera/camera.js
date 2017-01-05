angular.module('starter')

  .controller('cameraCtrl', function($scope,$state) {
    //$scope.service = StudyService;
    $scope.changePage = function () {
      $state.go('app.audio');
    };

    $scope.backPage = function () {
      $state.go('app.questions');
    };
  });
