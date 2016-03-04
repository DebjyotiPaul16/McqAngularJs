var myMcqApp = angular.module('mcqTemplateDirective', ['ngMaterial', 'ngMessages', 'ngRoute']);

myMcqApp.config(['$routeProvider',
        function ($routeProvider) {
        $routeProvider.
        when('/result', {
            controller: 'AppCtrl',
            templateUrl: 'views/result.html'
                }).
        when('/check', {
            controller: "Ctrl",
            templateUrl: 'views/check.html'
                }).
        otherwise({
            redirectTo: '/'
                });
    }]);    