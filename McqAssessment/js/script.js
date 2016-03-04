angular.module('mcqTemplateDirective', ['ngMaterial', 'ngMessages', 'ngRoute'])
    .config(['$routeProvider',
        function ($routeProvider) {
            $routeProvider.
            when('/result', {
                controller: 'AppCtrl',
                templateUrl: 'result.html'

            }).
            when('/check', {
                controller: "Ctrl",
                templateUrl: 'check.html'

            }).
            otherwise({
                redirectTo: '/'

            });
        }])
    .controller('AppCtrl', ['$scope', 'checkChecked', function ($scope, checkChecked) {

        $scope.questionsForResult = checkChecked.getValue();
        $scope.checkedArray=checkChecked.getCheckedValue();
        console.log($scope.checkedArray);
       // $scope.checkdArray= checkChecked.getCheckedValue();
        
      console.log($scope.questionsForResult);
}])

.controller('Ctrl', function ($scope) {

    })
    .controller('Controller', ['$scope', '$location', '$mdDialog', '$mdMedia', 'questionAPIservice', 'checkChecked', function ($scope, $location, $mdDialog, $mdMedia, questionAPIservice, checkChecked) {
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

        questionAPIservice.getQuestions().success(function (response) {
            //Dig into the responde to get the relevant data
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
  }])


.factory('questionAPIservice', function ($http) {
    var questionAPI = {};

    questionAPI.getQuestions = function () {
        return $http({
            method: 'JSONP',
            url: 'questionIndexed.json',
            params: {
                format: 'jsonp',
                json_callback: 'JSON_CALLBACK'
            }
        });
    }
    return questionAPI;
})

.service('checkChecked', function () {

        var serviceQuesions;
        var chekedArr=[];
        var checkedQuestion=[];
    
        this.setValue = function (questions) {
            serviceQuesions= questions;
           // console.log(serviceQuesions[0].options[0].checked);
            for(var i=0;i<serviceQuesions.length;i++)
                {
                    for(var j=0;j<serviceQuesions[i].options.length;j++)
                        {
                            if(serviceQuesions[i].options[j].checked === true)
                                {
                                   // console.log(value.value);
                                  //  chekedArr.push(serviceQuesions[i].options[j].value);
                                    checkedQuestion.push(serviceQuesions[i].options[j].value);
                                   // chekedArr["qstn"+(i+1)]=serviceQuesions[i].options[j].value;
                                }
                            
                        }
                    chekedArr.push( checkedQuestion);
                    checkedQuestion=[];
                
                }
            
//            angular.forEach(serviceQuesions, function (value, key) {
//                angular.forEach(value,function(value, key){
//                if (value.checked === true) {
//                    console.log(value.value);
//                    chekedArr.push(value.value);
//                }
//                });
//            });  
//           
            
            console.log(chekedArr);
        };
        
    
        this.getValue = function () {
            return serviceQuesions;
        };
        this.getCheckedValue = function () {
            return chekedArr;
        }

        this.selectValue = function (optionArray) {
            console.log(optionArray);
            var checkCounter = 0;
            angular.forEach(optionArray, function (value, key) {
                if (value.checked === true) {
//                    console.log(value.value);
                    checkCounter++;
                }
            });
            return checkCounter;
        };
        this.allData = function () {

            return "questions";

        };
        //  this.disabelOrNot= function(){
        //      
        //  };
    })
    .directive('myResult', ['$compile', '$http', '$templateCache', function ($compile, $http, $templateCache) {

        return {
            restrict: 'ACE',
            scope: false,
            templateUrl: 'result.html'
        };
    }])
    .directive('myMcq', ['$compile', '$http', '$templateCache', function ($compile, $http, $templateCache) {

        return {
            restrict: 'ACE',
            scope: false,
            templateUrl: 'my-mcq.html'
        };
    }]);