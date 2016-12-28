var ap = angular.module('starter.services', []);

ap.factory('StudyService', function ($cordovaFile) {
  console.log("in factory Studyid");
  function StudyService() {
    var self = this;
    self.studyNum = "";
    self.set_testid = function (value) {
      console.log("StudyService.StudyService.setstudyid value is " + value);
      self.studyNum = value;
      console.log("self.studyNum set to " + value + " self.studyNum is now " + self.studyNum);
      //$cordovaFile.createDir(cordova.file.externalRootDirectory, 'Kemri/ResponseFiles/StudyID_' + self.studyNum, false)
      //  .then(function (dir) {
      //    console.log(dir, 'successfully created');
      //  }, (function (error) {
      //    console.log(error);
      //  }))
    }
  }

  return new StudyService();
});
