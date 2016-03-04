myMcqApp.factory('questionAPIservice', function ($http) {
    var questionAPI = {};

    questionAPI.getQuestions = function () {
        return $http({
            method: 'JSONP',
            url: 'data/questionIndexed.json',
            params: {
                format: 'jsonp',
                json_callback: 'JSON_CALLBACK'
            }
        });
    }
    return questionAPI;
});
