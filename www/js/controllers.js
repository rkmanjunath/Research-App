angular.module('common.controllers', [])
  .controller("AppCtrl", function ($scope, StateLoaderService) {
    $scope.showMore = false;
    $scope.toggleMore = function () {
      $scope.showMore = !$scope.showMore;
      var stateUris = [];
      StateLoaderService.states.forEach(function(value, key, map) {
        var stateUri = '#' + key.replace('.', '/');
        stateUris.push({uri: stateUri, name: key.split('.')[1]});
      });
      $scope.stateUris = stateUris;
      console.log(stateUris);
    };
  })

  .controller('questionsCtrl', function ($scope, $state, QuestionService, StudyService, StateLoaderService) {
    $scope.service = StudyService;
    $scope.questions = QuestionService.getQuestions($state.current.name);

    var keys = StateLoaderService.states.keys();
    var prevStateName = 'app.studyID';
    var STATE_PROPERTIES = {};
    for (var i = 0; i < StateLoaderService.states.size; i++) {
      var currentStateName = keys.next().value;
      STATE_PROPERTIES[currentStateName] = {
        prevState: prevStateName,
        prevStateName: prevStateName.split('.')[1],
        nextState: '',
        nextStateName: '',
        viewName: currentStateName.split('.')[1]
      };
      if (i != 0) {
        STATE_PROPERTIES[prevStateName].nextState = currentStateName;
        STATE_PROPERTIES[prevStateName].nextStateName = currentStateName.split('.')[1]
      }
      prevStateName = currentStateName;
    }
    STATE_PROPERTIES[prevStateName].nextState = 'app.camera';
    STATE_PROPERTIES[prevStateName].nextStateName = 'camera';
    STATE_PROPERTIES['app.camera'] = {
      prevState: prevStateName,
      prevStateName: prevStateName.split('.')[1],
      nextState: 'app.audio',
      nextStateName: 'audio',
      viewName: 'Audio'
    };

    $scope.stateProperties = STATE_PROPERTIES[$state.current.name];

    $scope.setanswers = function (qarray) {
      QuestionService.setanswers(qarray, $state.current.name);
      var questionsForState = QuestionService.getAnswersForState($state.current.name);
      for (var i = 0; i < questionsForState.length; i++) {
        console.log(questionsForState[i].name + ": " + questionsForState[i].ans);
      }
    };

    $scope.changePage = function () {
      $state.go($scope.stateProperties.nextState);
    };

    $scope.backPage = function () {
      $state.go($scope.stateProperties.prevState);

    };
  });
