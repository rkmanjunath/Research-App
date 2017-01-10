var ap = angular.module('starter.services', []);

ap.factory('StudyService', function () {
  console.log("in factory Studyid");
  function StudyService() {
    var self = this;
    self.studyNum = "";
    self.setstudyid = function (value) {
      console.log("setstudyid value is " + value);
      self.studyNum = value;
      console.log("self.studyNum set to " + self.studyNum );
    }
  }
  return new StudyService();
});

ap.factory('Camera', ['$q', function ($q) {

  return {
    getPicture: function (options) {
      var q = $q.defer();

      navigator.camera.getPicture(function (result) {
        // Do any magic you need
        q.resolve(result);
      }, function (err) {
        q.reject(err);
      }, options);

      return q.promise;
    }
  }
}]);
