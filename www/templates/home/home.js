var app = angular.module('starter');

  app.controller('HomeCtrl', function($scope, $state, StudyService, StateLoaderService) {
    $scope.service = StudyService;

    StateLoaderService.loadStates(app.stateProvider);

    $scope.setstudyid = function (value) {
      StudyService.setstudyid(value);
      console.log('setstudyid : ' + value);
    };

    $scope.get_testid = function () {
     return $scope.Test
    };
    $scope.changePage = function () {
      $state.go(StateLoaderService.states.keys().next().value);
    };
    $scope.start = function () {
      $state.go('app.studyID')
    };
    $scope.export = function () {
      $state.go('app.export')
    };

  });
