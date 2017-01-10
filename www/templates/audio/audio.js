angular.module('starter')

  .controller('audioCtrl', function($scope, $state, StudyService) {

    $scope.service = StudyService;
    console.log("in audioCtrl ");
    $scope.playfilepath = "";
    $scope.fullfilepath = "";
    $scope.filepath = "";
    //$scope.service = StudyService;
    $scope.trial_index = 0;

    // Wait for device API libraries to load
    document.addEventListener("deviceready", onDeviceReady, false);
   // device APIs are available
    function onDeviceReady() {
      console.log("in onDeviceReady");
    }


// doesn't use Media plugin
    $scope.recorder = new Object;
    $scope.recorder.seconds = 0;
    $scope.recorder.interval = null;

    $scope.recorder.stop = function() {
     console.log("in Media3trl stop **** ");
     clearInterval($scope.recorder.interval);
     $scope.recorder.seconds = 0;

     window.plugins.audioRecorderAPI.stop(resolveOnSuccess, captureFail);
     console.log("stop:" + window.plugins.audioRecorderAPI);
     // NB:  stopRecord in AudioRecorderAPI.java calls release

     };

    $scope.recorder.record = function(element) {
      console.log("in audioCtrl record ");
      if ($scope.recorder.seconds ){
        return;
      }
      $scope.recorder.seconds = 60;
      $scope.recorder.interval = setInterval(function () {
        var msg = document.getElementById(element);
        //$scope.recorder.msg = '';
        if ($scope.recorder.seconds  == 0) {
          //alert(el.innerHTML = "countdown's over!");
          msg.innerHTML = "countdown's over!";
          //$scope.recorder.msg = "Time out!";
          clearInterval($scope.recorder.interval);
          $scope.recorder.seconds = 0;
          return;
        }

        var second_text = $scope.recorder.seconds  > 1 ? 'seconds' : 'second';
        msg.innerHTML = $scope.recorder.seconds  + ' ' + second_text + ' remaining';
        //$scope.recorder.msg = $scope.recorder.seconds + ' ' + second_text + ' remaining';
        $scope.recorder.seconds--;

      }, 1000);

      // record 60 seconds if no stop: if use this arg list then take out stop button to avoid accidental crash
      //window.plugins.audioRecorderAPI.record(success, fail, 60);
      // stop only with stop button to avoid accidental crash: timeout in java file is set to 3 min if no stop
      //window.plugins.audioRecorderAPI.record(resolveOnSuccess, captureFail, 60);
      window.plugins.audioRecorderAPI.record(resolveOnSuccess, captureFail, 60);
      console.log("record:" + window.plugins.audioRecorderAPI);

    };
    $scope.recorder.playback = function() {
      alert("in audioCtrl playback " );
      console.log("in audioCtrl playback ");
      window.plugins.audioRecorderAPI.playback(function(msg) {
        // complete
        alert('ok ' + msg);
        console.log('ok ' + msg);
      }, function(msg) {
        // failed
        alert('failed: ' + msg);
        console.log('failed: ' + msg);
      });
    };


    resolveOnSuccess = function(savedFilePath) {
      var fileName = savedFilePath.split('/').pop();
      console.log('file name:', fileName);
      var oldDir = savedFilePath.split('/');
      oldDir.length = oldDir.length - 1;
      oldDir = 'file:' + oldDir.join('/');
      console.log('old dir: ', oldDir);
      var directory = cordova.file.externalRootDirectory + '/Kemri/ResponseFiles/StudyID_' + $scope.service.studyNum;
      var trial_index = 0;
      $cordovaFile.copyFile(oldDir, fileName, directory, $scope.service.studyNum+$state.current.name+'_trial_'+$scope.trial_index+'.m4a')
        .then(function (success) {
          $scope.trial_index+=1;
          console.log('success:', success);
        }, function (error) {
          console.log('error: ', error);
        });
    };

    captureFail = function (msg) {
      alert('in captureFail &&&: ');
      console.log('in captureFail: ' + msg);
      alert(msg);
    };


    $scope.changePage = function () {
      $state.go('app.export');
    };

    $scope.backPage = function () {
      $state.go('app.camera');
    };
  });
