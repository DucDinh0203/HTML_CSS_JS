let input = '0';
let runningTotal = 0;
let previousOperator;
screen = document.querySelector('.screen');

function buttonClick(value){
  if(isNaN(parseInt(value))) {
    handleSymbol(value);
  } else {
    handleNumber(value);
  }
  rerender();
}

function handleNumber(value){
  if(input === '0') {
    input = value;
  } else {
    input += value;
  }
  // console.log(input);
};

function handleMath(value){
  if (input === '0') {
    // do nothing
    return;
  }

  const intInput = parseInt(input);  // convert a string to a number
  if (runningTotal === 0) {
    runningTotal = intInput;
  } else {
    flushOperation(intInput);
  }
  previousOperator = value;
  input = '0';
  // console.log(runningTotal);
}

function flushOperation(intInput){
  if (previousOperator === '+') {
    runningTotal += intInput;
  } else if (previousOperator === '-') {
    runningTotal -= intInput;
  } else if (previousOperator === '×') {
    runningTotal -= intInput;
  } else {
    runningTotal /= intInput;
  }
  console.log(previousOperator);
}

function handleSymbol(symbol){
  switch (symbol ){
    case 'C':
      input = '0';
      previousOperator = null;
      break;
    case '=':
      if (previousOperator === null) {
        // need do numbers to do math
        return;
      }
      flushOperation(parseInt(input));
      previousOperator = null;
      input = "" + runningTotal;
      runningTotal = 0;
      break;
    case '%':
      console.log("delete");
      break;
    case '+/-':
      console.log('negative');
      break;
    case '+':
    case '-':
    case '×':
    case '÷':
      handleMath(symbol);
      break;
    case '.':
      console.log('decimal');
      break;
  }
}


function init() {
  document
    .querySelector(".calc-buttons")
    .addEventListener("click", function (event) {
      buttonClick(event.target.innerText);
    });
}

function rerender(){
  screen.innerText = input;
}

init();