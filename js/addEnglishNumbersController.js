window.onload = function() {
    var addButton = document.getElementById('addButton');
    addButton.addEventListener('click', function (event) {
       var firstNumber = document.getElementById('firstNumber').value;
       var secondNumber = document.getElementById('secondNumber').value;
       var answerLabel = document.getElementById('sumResult');
       answerLabel.innerText = convertTextToNumber(firstNumber);
    });
};

function convertTextToNumber(text) {
    var words = "";
    textArray = text.toLowerCase().toString().split(/[\s-,]+/);
    for (var textItem = 0; textItem < textArray.length; textItem++) {
        if (IsExists(textArray[textItem]))
            words += (textArray[textItem]) + " ";
    }
    return words
}

function IsExists(variable) {
    return !((variable == null) || (variable == ""));
}
