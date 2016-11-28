var numbersArray = {
    'zero': 0,
    'one': 1,
    'two': 2,
    'three': 3,
    'four': 4,
    'five': 5,
    'six': 6,
    'seven': 7,
    'eight': 8,
    'nine': 9,
    'ten': 10,
    'eleven': 11,
    'twelve': 12,
    'thirteen': 13,
    'fourteen': 14,
    'fifteen': 15,
    'sixteen': 16,
    'seventeen': 17,
    'eighteen': 18,
    'nineteen': 19,
    'twenty': 20,
    'thirty': 30,
    'forty': 40,
    'fifty': 50,
    'sixty': 60,
    'seventy': 70,
    'eighty': 80,
    'ninety': 90
};

var smallAccumulator;

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
    textArray = text.toLowerCase().toString().split(/[\s-,]+/);
    smallAccumulator = 0;
    for (var textItem = 0; textItem < textArray.length; textItem++) {
        if (IsExists(textArray[textItem]))
            addTextNumberToGetNumber(textArray[textItem]);
    }
    return smallAccumulator;
}

function IsExists(variable) {
    return !((variable == null) || (variable == ""));
}

function addTextNumberToGetNumber(word) {
    var number = getNumberByWordInArray(word, numbersArray);
    smallAccumulator = (IsExists(number))? smallAccumulator + number : (word == "hundred")? smallAccumulator * 100 : smallAccumulator;
    if (word == "and") {
      return;
    }
}

function getNumberByWordInArray (word, array) {
    return array[word];
}
