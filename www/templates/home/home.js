angular.module('starter')

  .controller('HomeCtrl', function($scope, $state, StudyService, $cordovaFile) {
    $scope.service = StudyService;

    $scope.start = function () {
      $state.go('app.studyID')
    };
    $scope.export = function () {
      $state.go('app.Export')
    };

    var kemriDirectory = function () {
      document.addEventListener('deviceready', function () {
        $cordovaFile.createDir(cordova.file.externalRootDirectory, 'Kemri', false)
          .then(function(dir) {
            console.log(dir, 'successfully created');
            kemriDirectoryQuestions(); //ensures asynchronous functions are called in order
          }, function(error) {
            console.log(error);
            kemriDirectoryQuestions();
          });
      });
    };

    var kemriDirectoryQuestions = function () {
      document.addEventListener('deviceready', function () {
        $cordovaFile.createDir(cordova.file.externalRootDirectory, 'Kemri/QuestionFiles', false)
          .then(function(dir) {
            console.log(dir, 'successfully created');
            $cordovaFile.copyFile('file:///android_asset/www/locales/android/data/questions','motor-tests.txt',cordova.file.externalRootDirectory+'/Kemri/QuestionFiles','motor-tests.txt')
              .then(function(file) {
                  console.log(file, 'successfully added')},
                function(error) {console.log(error, 'motor-txt')});
            $cordovaFile.copyFile('file:///android_asset/www/locales/android/data/questions','paper-pen.txt',cordova.file.externalRootDirectory+'/Kemri/QuestionFiles','paper-pen.txt')
              .then(function(file) {
                  console.log(file, 'successfully added')},
                function(error) {console.log(error, 'paper-pen')});
            $cordovaFile.copyFile('file:///android_asset/www/locales/android/data/questions','PSED1.txt',cordova.file.externalRootDirectory+'/Kemri/QuestionFiles','PSED1.txt')
              .then(function(file) {
                  console.log(file, 'successfully added')},
                function(error) {console.log(error, 'PSED1')});
            $cordovaFile.copyFile('file:///android_asset/www/locales/android/data/questions','PSED2.txt',cordova.file.externalRootDirectory+'/Kemri/QuestionFiles','PSED2.txt')
              .then(function(file) {
                  console.log(file, 'successfully added')},
                function(error) {console.log(error, 'PSED2')});
            $cordovaFile.copyFile('file:///android_asset/www/locales/android/data/questions','PSED3.txt',cordova.file.externalRootDirectory+'/Kemri/QuestionFiles','PSED3.txt')
              .then(function(file) {
                  console.log(file, 'successfully added')},
                function(error) {console.log(error, 'PSED3')});
            $cordovaFile.copyFile('file:///android_asset/www/locales/android/data/questions','SSQ.txt',cordova.file.externalRootDirectory+'/Kemri/QuestionFiles','SSQ.txt')
              .then(function(file) {
                  console.log(file, 'successfully added')},
                function(error) {console.log(error, 'SSQ')});
            kemriDirectoryResponses(); //ensures asynchronous functions are called in order
          }, function(error) {
            console.log(error);
            kemriDirectoryResponses();
          });
      });
    };

    var kemriDirectoryResponses = function () {
      document.addEventListener('deviceready', function () {
        $cordovaFile.createDir(cordova.file.externalRootDirectory, 'Kemri/ResponseFiles', false)
          .then(function(dir) {
            console.log(dir, 'successfully created')
          }, function(error) {
            console.log(error, 'hopefully this means that the dir already exists')
          });
      });
    };

    kemriDirectory();
  });
