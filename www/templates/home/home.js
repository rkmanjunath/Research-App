angular.module('starter')

  //.controller('HomeCtrl', function($scope, $state, StudyService, $cordovaFile) {
  .controller('HomeCtrl', function($scope, $state, StudyService) {
    $scope.service = StudyService;

    $scope.setstudyid = function (value) {
      StudyService.setstudyid(value);
      console.log('setstudyid : ' + value);
    };

    //$scope.get_testid = function () {
    //  return $scope.Test
    //};
    $scope.changePage = function () {
      $state.go('app.questions');
    };
    $scope.start = function () {
      $state.go('app.studyID')
    };
    $scope.export = function () {
      $state.go('app.export')
    };

  });
