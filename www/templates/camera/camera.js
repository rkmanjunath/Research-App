angular.module('starter')

  //.controller('cameraCtrl', function($scope, Camera, StudyService) {
  .controller('cameraCtrl', function($scope, $state, $cordovaCamera, StudyService, $ionicPlatform) {
    $scope.service = StudyService;

    $scope.getPhoto = function() {
      var options = {
        quality: 75,
        targetWidth: 320,
        targetHeight: 320,
        saveToPhotoAlbum: false
      };
      $ionicPlatform.ready(function () {
        $cordovaCamera.getPicture(options).then(function(imgURI) {
          console.log("in camera");
          $scope.lastPhoto = imgURI;
        },function(err) {
          console.log(err)
        })

      });
    };
    $scope.changePage = function () {
      $state.go('app.audio');
    };

    $scope.backPage = function () {
      $state.go('app.test2');
    };
  });
