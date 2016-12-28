angular.module('starter')

  //.controller("test1Ctrl", function ($scope, $state, BasicInfoService, ionicDatePicker, GeoService) {
  .controller("test1Ctrl", function ($scope, $state, StudyService) {

    $scope.service = StudyService;
    $scope.Test = {
      TestID: ''

    };
    $scope.changePage = function () {
      $state.go('app.test1');
    };
    //$scope.changeToAssess = function () {
    //  $state.go('app.assessment_scales');
    //};
    //$scope.backPage = function () {
    //  $state.go('app.testID');
    //};


/*    $scope.Child.Todays_Date = new Date();

    $scope.openDatePicker = function () {
      var datePickerOptions = {
        callback: function (val) {
          $scope.Child.Todays_Date = new Date(val);
        },
        inputDate: $scope.Child.Todays_Date,
        closeOnSelect: false,
        templateType: 'popup',
        from: new Date(1990, 1, 1)
      };
      ionicDatePicker.openDatePicker(datePickerOptions);
    };

    $scope.setanswers = function (value) {
      BasicInfoService.setanswers(value);
      console.log('In Set answers : ' + value.Observer_Initials);
      console.log('In Set answers : ' + value.Todays_Date);

    };*/

/*    $scope.getAnswersForState = function () {
      return $scope.Child
    };*/
  });
