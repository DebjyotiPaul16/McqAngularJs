myMcqApp.directive('myResult', ['$compile', '$http', '$templateCache', function ($compile, $http, $templateCache) {

    return {
        restrict: 'ACE',
        scope: false,
        templateUrl: 'views/result.html'
    };
    }]);
myMcqApp.directive('myMcq', ['$compile', '$http', '$templateCache', function ($compile, $http, $templateCache) {

    return {
        restrict: 'ACE',
        scope: false,
        templateUrl: 'views/my-mcq.html'
    };
    }]);