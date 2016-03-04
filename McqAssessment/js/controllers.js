/*** controller for result page ***/

myMcqApp.controller('AppCtrl', ['$scope', 'checkChecked', function ($scope, checkChecked) {

    $scope.questionsForResult = checkChecked.getValue();
    $scope.checkedArray = checkChecked.getCheckedValue();
//    console.log($scope.checkedArray);
//    console.log($scope.questionsForResult);
}]);

myMcqApp.controller('Controller', ['$scope', '$location', '$mdDialog', '$mdMedia', 'questionAPIservice', 'checkChecked', function ($scope, $location, $mdDialog, $mdMedia, questionAPIservice, checkChecked) {
    $scope.showResult = true;
    $scope.showResultPage = true;
    $scope.status = '';
    $scope.customFullscreen = $mdMedia('xs') || $mdMedia('sm');
    $scope.counter = 0;
    $scope.checkboxDisabledOnSubmit = false;
    $scope.isDisabledNext = false;
    $scope.isDisabledPrev = false;
    $scope.isDisabledSubmit = false;
    $scope.checked = 0;
    $scope.type = 'mcq';
    
    //get data from json through questionAPIservice service
    
    questionAPIservice.getQuestions().success(function (response) {
        $scope.questions = response.questions;
        $scope.qstn = $scope.questions[$scope.counter].value;
        $scope.optionsArr = $scope.questions[$scope.counter].options;
        $scope.isDisabledPrev = true;
        $scope.isDisabledNext = true;
        $scope.isDisabledSubmit = true;
        // console.log($scope.questions);
    });
    $scope.go = function () {
        checkChecked.setValue($scope.questions);
        $location.path('/result');

    }

    $scope.showConfirm = function (ev) {
        // Appending dialog to document.body to cover sidenav in docs app
        var confirm = $mdDialog.confirm()
            .clickOutsideToClose(true)
            .title('Would you like to see the result?')
            .textContent('After this you will not be able to see the questions again')
            .ariaLabel('Lucky day')
            .targetEvent(ev)
            .ok('Go On')
            .cancel('No, hold it');

        $mdDialog.show(confirm).then(function () {

            $scope.status = 'You decided to get rid of your debt.';
            $scope.showResultPage = false;
            $scope.go();
        }, function () {
            $scope.status = 'You decided to keep your debt.';

        });
    };

    $scope.nextQuestions = function () {
        // $scope.checked=checkChecked.selectValue($scope.optionsArr);
        $scope.checked = 0;
        $scope.counter++;
        $scope.isDisabledPrev = false;
        $scope.isDisabledNext = true;
        $scope.qstn = $scope.questions[$scope.counter].value;
        $scope.optionsArr = $scope.questions[$scope.counter].options;
        $scope.isDisabledSubmit = false;

        if (checkChecked.selectValue($scope.optionsArr) != 0) {
            $scope.checkboxDisabledOnSubmit = true;
            $scope.isDisabledSubmit = true;
            $scope.isDisabledNext = false;
            $scope.isDisabledPrev = false;
        } else {
            $scope.checkboxDisabledOnSubmit = false;
            $scope.isDisabledSubmit = true;
        }

        //  console.log($scope.optionsArr);

        if ($scope.counter === 2) {
            $scope.isDisabledNext = true;
        }
    };



    $scope.prevQuestions = function () {
        $scope.counter--;
        $scope.qstn = $scope.questions[$scope.counter].value;
        $scope.optionsArr = $scope.questions[$scope.counter].options;
        $scope.checked = checkChecked.selectValue($scope.optionsArr);

        if ($scope.checked != 0) {
            $scope.isDisabledNext = false;
            $scope.isDisabledPrev = false;
        } else {
            $scope.isDisabledNext = false;
        }

        $scope.isDisabledSubmit = true;
        $scope.checkboxDisabledOnSubmit = true;
        if ($scope.counter === 0) {
            $scope.isDisabledPrev = true;
        }
    }

    $scope.checkboxDisabled = function (ev) {
        $scope.checkboxDisabledOnSubmit = true;
        if ($scope.counter == 2) {
            $scope.showResult = false;
            $scope.isDisabledNext = true;
            $scope.type = 'result';
        } else {
            $scope.isDisabledNext = false;
        }

        $scope.isDisabledSubmit = true;
    }

    $scope.shouldBeDisabled = function (option) {

        if (checkChecked.selectValue($scope.optionsArr) != 0) {
            $scope.isDisabledSubmit = false;
        } else {
            $scope.isDisabledSubmit = true;
        }

        if (option.checked)
            $scope.checked++;
        else
            $scope.checked--;
    };
  }]);