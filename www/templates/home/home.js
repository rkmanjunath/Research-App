angular.module('starter')

  //.controller('HomeCtrl', function($scope, $state, StudyService, $cordovaFile) {
  .controller('HomeCtrl', function($scope, $state, StudyService) {
    $scope.service = StudyService;

    $scope.Test = {
      TestID: ''
    };
    $scope.set_testid = function (value) {
      StudyService.set_testid(value);
      console.log('In Set Testid : ' + value);
    };

    //$scope.get_testid = function () {
    //  return $scope.Test
    //};
    $scope.changePage = function () {
      $state.go('app.test1');
    };
    $scope.start = function () {
      $state.go('app.testID')
    };
    $scope.export = function () {
      $state.go('app.Export')
    };

  });
