myMcqApp.service('checkChecked', function () {

    var serviceQuesions;
    var chekedArr = [];
    var checkedQuestion = [];

    this.setValue = function (questions) {
        serviceQuesions = questions;
        for (var i = 0; i < serviceQuesions.length; i++) {
            for (var j = 0; j < serviceQuesions[i].options.length; j++) {
                if (serviceQuesions[i].options[j].checked === true) {
                    checkedQuestion.push(serviceQuesions[i].options[j].value);
                }
            }
            chekedArr.push(checkedQuestion);
            checkedQuestion = [];
        }
        console.log(chekedArr);
    };
    this.getValue = function () {
        return serviceQuesions;
    };
    this.getCheckedValue = function () {
        return chekedArr;
    };
    this.selectValue = function (optionArray) {
        console.log(optionArray);
        var checkCounter = 0;
        angular.forEach(optionArray, function (value, key) {
            if (value.checked === true) {
                checkCounter++;
            }
        });
        return checkCounter;
    };
});