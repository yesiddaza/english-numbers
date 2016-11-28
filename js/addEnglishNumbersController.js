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
    'ninety': 90,
};

var magnitudesArray = {
    'thousand': 1000,
    'million': 1000000,
    'billion': 1000000000,
    'trillion': 1000000000000,
};

var magnitudesStringsArray = ['','thousand','million', 'billion','trillion'];
var digitNumbersArray = ['zero','one','two','three','four', 'five','six','seven','eight','nine'];
var tenNumbersArray = ['ten','eleven','twelve','thirteen', 'fourteen','fifteen','sixteen','seventeen','eighteen','nineteen'];
var tenMultiplesArray = ['twenty','thirty','forty','fifty','sixty','seventy','eighty','ninety'];

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
