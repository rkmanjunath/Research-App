angular.module('starter')

  //.controller("test1Ctrl", function ($scope, $state, BasicInfoService, ionicDatePicker, GeoService) {
  .controller("test2Ctrl", function ($scope, $state) {

    //$scope.service = StudyService;
    //$scope.Test = {
    //  TestID: ''
    //
    //};
    $scope.changePage = function () {
      $state.go('app.camera');
    };

    $scope.backPage = function () {
      $state.go('app.test1');
    };
  });
