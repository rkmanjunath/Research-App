angular.module('common.controllers', [])
  .controller("AppCtrl", function ($scope){

  })

  //&& window.resolveLocalFileSystemURL
  .controller('testsCtrl', function($scope, $cordovaFile){
      $scope.test_items = [];
      if (window.File && window.FileReader && window.FileList && window.Blob && window.resolveLocalFileSystemURL) {
        // Great success! All the File APIs are supported.
        console.log('yay it works')
      } else {
        alert('The File APIs are not fully supported in this browser.');
      }
      function listDir(path){
        window.resolveLocalFileSystemURL(path,
          function (fileSystem) {
            var reader = fileSystem.createReader();
            reader.readEntries(
              function (entries) {
                console.log(entries);
              },
              function (err) {
                console.log(err, 'there is an error in part 1');
              }
            );
          }, function (err) {
            console.log(err, 'there is an error in part 2');
          }
        );
      }
      console.log(listDir(cordova.file.externalRootDirectory + 'Kemri/QuestionFiles/'));
  });
