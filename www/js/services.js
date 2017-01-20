var ap = angular.module('starter.services', []);

ap.factory('StudyService', function () {
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

// ap.factory('SaveService', function ($cordovaFile, StudyService, QuestionService) {
//   function SaveService() {
//     var self = this;
//     self.save = function (stateName) {
//       console.log('the statename is: ', stateName);
//       var questionsArray = QuestionService.getAnswersForState(stateName);
//       console.log('self.questions: ', QuestionService.questions, 'questionsArray: ', questionsArray);
//       if (StudyService.studyNum != '') {
//         var idNumber = StudyService.studyNum;
//       } else {
//         window.alert("Failed to save data; please enter the Study ID");
//         return
//       }
//       console.log('The studyID has been applied to this factory; Study ID: ', idNumber);
//       var testID = stateName;
//       var answerKey = '';
//       for (i = 0; i < questionsArray.length; i++) {
//         answerKey += questionsArray[i].name + ',';
//         answerKey += questionsArray[i].ans + '\n';
//       }
//
//       document.addEventListener('deviceready', function () {
//         $cordovaFile.createDir(cordova.file.externalRootDirectory, 'Kemri/ResponseFiles/StudyID_' + idNumber, false)
//           .then(function (dir) {
//               console.log(dir, 'successfully created');
//               $cordovaFile.writeFile(cordova.file.externalRootDirectory + 'Kemri/ResponseFiles/StudyID_' + idNumber, idNumber + '_' + testID + '.csv', answerKey + (new Date()) + "\n", false)
//                 .then(function (success) {
//                   console.log(success, 'written in new dir')
//                 }, function (eWriteFile) {
//                   console.log(eWriteFile, 'error writing file in new dir')
//                 })
//             },
//             function (eCreateDir) {
//               console.log(eCreateDir, 'directory may already exist');
//               $cordovaFile.writeFile(cordova.file.externalRootDirectory + 'Kemri/ResponseFiles/StudyID_' + idNumber, idNumber + '_' + testID + '.csv', answerKey + (new Date()) + "\n", false)
//                 .then(function (file) {
//                     console.log(file, 'successfully written')
//                   },
//                   function (eWriteFile) {
//                     console.log(eWriteFile, 'error creating file');
//                     $cordovaFile.writeExistingFile(cordova.file.externalRootDirectory + 'Kemri/ResponseFiles/StudyID_' + idNumber, idNumber + '_' + testID + '.csv', answerKey + (new Date()) + "\n")
//                       .then(function (existingFile) {
//                           console.log(existingFile, 'updated')
//                         },
//                         function (eExistingFile) {
//                           console.log(eExistingFile, 'error writing to existing file')
//                         });
//                   });
//             });
//       });
//     }
//   }
//
//   return new SaveService();
// });

ap.factory('StateLoaderService', function() {
  function StateLoaderService() {
    var self = this;
    self.states = new Map();
    self.statesLoaded = false;

    self.loadStates = function(stateProvider) {
      if (self.statesLoaded) {
        return;
      }
      console.log('Loading states ...');
      //set var device to false if not using a device
      var device = true;
      var questionsDirPath = '';
      if (!device) {
        questionsDirPath = '/Data';
      } else {
        questionsDirPath = 'file:///android_asset/www/Data';
      }
      window.resolveLocalFileSystemURL(questionsDirPath, function (fileSystem) {
        var reader = fileSystem.createReader();
        reader.readEntries(function (entries) {
          console.log(entries);
          for (count = 0; count < entries.length; count++) {
            textfile = entries[count].name;
            stateName = 'app.' + textfile.split('.')[0];
            self.states.set(stateName, entries[count]);
          }
          console.log(self.states);
          self.states.forEach(function (value, key, map) {
            stateProvider.state(key, {
              url: '/' + key.split('.')[1],
              views: {
                'menuContent': {
                  templateUrl: 'templates/questions/questions.html',
                  controller: 'questionsCtrl'
                }
              }
            });
          });
          self.statesLoaded = true;
        }, function (err) {
          console.log(err);
        });
      }, function (err) {
        console.log(err);
      });
    }
  }

  return new StateLoaderService();
});

ap.factory('QuestionService', function ($http, StateLoaderService) {

  function QuestionService() {
    var self = this;
    // Associative array from state to array of questions
    self.questions = [];

    self.getQuestions = function (stateName) {
      if (stateName in self.questions) {
        return self.questions[stateName];
      }

      var questionsForState = [];
      var entry = StateLoaderService.states.get(stateName);
      // Read the file here and process it
      function readFile(file) {
        var reader = new FileReader();

        reader.onloadend = function () {
          var questionStrs = this.result.split(/\r|\n/);
          for (count = 0; count < questionStrs.length; count++) {
            if (questionStrs[count]) {
              var parts = questionStrs[count].split('|');
              questionsForState.push({
                name: parts[0],
                question: parts[1],
                type: parts[2],
                ans: ''
              });
            }
          }
        };

        reader.readAsText(file);
      }

      entry.file(readFile, function () {console.log('Error reading file state file')});
      self.questions[stateName] = questionsForState;
      return questionsForState;
    };


    self.setanswers = function (qarray, stateName) {
      var questionsForState = self.questions[stateName];
      for (index = 0; index < qarray.length; index++) {
        questionsForState[index].ans = qarray[index].ans;
      }
    };

    self.getAnswersForState = function (stateName) {
      if (StateLoaderService.states.has(stateName)) {
        return self.questions[stateName];
      }
    };
    self.getAllAnswers = function () {
      return self.questions;
    }
  }

  return new QuestionService();
});

