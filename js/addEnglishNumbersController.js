var smallAccumulator, bigAccumulator, invalidElement;

window.onload = function() {
    var addButton = document.getElementById('addButton');
    addButton.addEventListener('click', function (event) {
        invalidElement = "";
        var firstNumber = document.getElementById('firstNumber').value;
        var secondNumber = document.getElementById('secondNumber').value;
        var answerLabel = document.getElementById('sumResult');
        answerLabel.innerText = toWords(firstNumber);
    });
};

function toWords(number) {
    number = number.toString().replace(/[\, ]/g,'');
    if (number != parseFloat(number))
        return 'not a number';
    numberLength = number.length;
    if (numberLength > 15)
        return 'too big';
    var numberArray = number.split('');
    var numberString = '';
    var unfinishedCents = false;
    for (var numberPosition=0; numberPosition < numberLength; numberPosition++) {
        console.log(numberArray[numberPosition] + " " + numberPosition + " " + " " + numberLength + " " + (numberLength-numberPosition) + " " + unfinishedCents);
        var positionRightToLeft =  numberLength-numberPosition;
        if ( IsNumberInTensPosition(positionRightToLeft) ) {
            if (numberArray[numberPosition] == '1') {
                numberString += tenNumbersArray[Number(numberArray[numberPosition+1])] + ' ';
                numberPosition++;
                unfinishedCents = true;
            }
            else if (numberArray[numberPosition]!=0) {
                numberString += tenMultiplesArray[numberArray[numberPosition]-2] + ' ';
                unfinishedCents = true;
            }
        }
        else if (numberArray[numberPosition]!=0) {
            numberString += digitNumbersArray[numberArray[numberPosition]] +' ';
            if ( IsNumberInHundredsPosition(positionRightToLeft) )
                numberString += 'hundred and ';
            unfinishedCents = true;
        }
        if (IsNumberInUnitsPosition(numberLength-numberPosition)) {
            if (unfinishedCents)
                numberString += magnitudesStringsArray[(numberLength-numberPosition-1)/3] + ' ';
                unfinishedCents = false;
        }
    }
    numberString.replace(/\s+/g,' ');
    if (numberString.substring(numberString.length - 6) == (' and  '))
        numberString = numberString.substring(0, numberString.length - 6);

    numberString = putHyphensToString(numberString);

    return numberString;
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
    if (IsExists(invalidElement))
        return "zero";
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
