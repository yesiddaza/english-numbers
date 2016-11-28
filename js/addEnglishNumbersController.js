window.onload = function() {
    var addButton = document.getElementById('addButton');
    addButton.addEventListener('click', function (event) {
       var firstNumber = document.getElementById('firstNumber').value;
       var secondNumber = document.getElementById('secondNumber').value;
       var answerLabel = document.getElementById('sumResult');
       answerLabel.innerText = firstNumber;
    });
};
