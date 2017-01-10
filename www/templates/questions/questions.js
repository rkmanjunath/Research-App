angular.module('starter')

  .controller("questionsCtrl", function ($scope, $state, StudyService) {

    $scope.service = StudyService;
    console.log("StudyService.studyNum is @@@@@@@@" + StudyService.studyNum);
    $scope.changePage = function () {
      $state.go('app.camera');
    };

    $scope.backPage = function () {
      $state.go('app.studyID');
    };
  });
