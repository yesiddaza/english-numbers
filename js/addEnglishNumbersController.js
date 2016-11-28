var smallAccumulator, bigAccumulator, invalidElement, numberLength, numberArray, numberString, unfinishedCents;

window.onload = function() {
    var addButton = document.getElementById('addButton');
    addButton.addEventListener('click', function (event) {
        invalidElement = "";
        var firstNumber = document.getElementById('firstNumber').value;
        var secondNumber = document.getElementById('secondNumber').value;
        var answerLabel = document.getElementById('sumResult');
        answerLabel.innerText = addTextNumbers(firstNumber, secondNumber);
    });
};

function addTextNumbers(firstNumber, secondNumber) {
    var answer = convertTextToNumber(firstNumber) + convertTextToNumber(secondNumber);
    if (IsExists(invalidElement))
        return "zero";
    return convertNumberToText(answer);
}

function convertNumberToText(number) {
    number = number.toString().replace(/[\, ]/g,'');
    if ((number != parseFloat(number)) || (number.Length > 15))
        return 'not possible to complete';
    initializeVariables(number);
    setNumberString();
    return putFormat(numberString);
}

function putFormat(string) {
    string = deleteFinalAndInString(string);
    string = putHyphensToString(string);
    return string
}

function setNumberString() {
    for (var numberPosition = 0; numberPosition < numberLength; numberPosition++) {
        var positionRightToLeft =  numberLength - numberPosition;
        if ( IsNumberInTensPosition(positionRightToLeft) )
            numberPosition = getNewPositionInTensPosition(numberPosition);
        else if (numberArray[numberPosition] != 0)
            setNumberStringWithDigits(positionRightToLeft, numberPosition);
        if (IsNumberInUnitsPosition(numberLength-numberPosition))
            setNumberStringInUnitsPosition(numberPosition);
    }
}

function getNewPositionInTensPosition(numberPosition) {
    if (numberArray[numberPosition] == '1') {
        numberString += tenNumbersArray[Number(numberArray[numberPosition + 1])] + ' ';
        numberPosition++;
        unfinishedCents = true;
    }
    else if (numberArray[numberPosition] != 0) {
        numberString += tenMultiplesArray[numberArray[numberPosition] - 2] + ' ';
        unfinishedCents = true;
    }
    return numberPosition;
}

function setNumberStringWithDigits(positionRightToLeft, numberPosition) {
    numberString += digitNumbersArray[numberArray[numberPosition]] + ' ';
    if ( IsNumberInHundredsPosition(positionRightToLeft) )
        numberString += 'hundred and ';
    unfinishedCents = true;
}

function setNumberStringInUnitsPosition(numberPosition) {
    if (unfinishedCents)
        numberString += magnitudesStringsArray[(numberLength-numberPosition - 1) / 3] + ' ';
    unfinishedCents = false;
}

function initializeVariables(number) {
    numberLength = number.length;
    numberArray = number.split('');
    numberString = '';
    unfinishedCents = false;
}

function IsNumberInUnitsPosition(position) {
    return position % 3 == 1;
}

function IsNumberInTensPosition(position) {
    return position % 3 == 2;
}

function IsNumberInHundredsPosition(position) {
    return position % 3 == 0;
}

function deleteFinalAndInString(string) {
    string.replace(/\s+/g,' ');
    if (string.substring(string.length - 6) == (' and  '))
        string = string.substring(0, string.length - 6);
    return string;
}

function putHyphensToString(string) {
  for (var tenMultiple=0; tenMultiple < tenMultiplesArray.length; tenMultiple++) {
      for (var digitNumber=0; digitNumber < digitNumbersArray.length; digitNumber++) {
          if (string.includes( tenMultiplesArray[tenMultiple] + " " + digitNumbersArray[digitNumber] )) {
              var searchString = tenMultiplesArray[tenMultiple] + " " + digitNumbersArray[digitNumber];
              var replaceString = tenMultiplesArray[tenMultiple] + "-" + digitNumbersArray[digitNumber];
              string = string.split( searchString ).join( replaceString );
          }
      }
  }
  return string;
}

function convertTextToNumber(text) {
    var textArray = text.toLowerCase().toString().split(/[\s-,]+/);
    bigAccumulator = 0;
    smallAccumulator = 0;
    for (var textItem = 0; textItem < textArray.length; textItem++) {
        if (IsExists(textArray[textItem]))
            addTextNumberToGetNumber(textArray[textItem]);
    }
    return bigAccumulator + smallAccumulator;
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
    if ((!IsExists(number)) && (word != "hundred")) {
        completeSumWithGreatestNumbers(word);
    }
}

function getNumberByWordInArray (word, array) {
    return array[word];
}

function completeSumWithGreatestNumbers (word) {
    var number = getNumberByWordInArray(word, magnitudesArray);
    if (IsExists(number)) {
        bigAccumulator = bigAccumulator + smallAccumulator * number;
        smallAccumulator = 0;
    }
    else {
        invalidElement = word;
    }
}
