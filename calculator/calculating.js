let input = '0';
let runningTotal = 0;
let previousOperator;
screen = document.querySelector('.screen');

function buttonClick(value){
  // if value is not a number
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
  } 
  else if (input.length == 20) {
    return alert("Your input is too long");
  } 
  else if (input.includes('-0')) {
    if(value === '0'){
      return;
    }
    else {
      input = input.substring(0, input.length-1) + value;
    }
  }
  else {
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
    runningTotal *= intInput;
  } else {
    runningTotal /= intInput;
  }
  console.log(previousOperator);
}

function setOperation(operation){
  var elements = document.getElementsByClassName("operator");

  for(var i = 0; i < elements.length; i++) {
    elements[i].style.backgroundColor  = "#e68a00";
  }

  if (operation === '+') {
    document.getElementById("plusOp").style.backgroundColor = "#ffd11a";
  } else if (operation === '-') {
    document.getElementById("subOp").style.backgroundColor = "#ffd11a";
  } else if (operation === '×') {
    document.getElementById("multiOp").style.backgroundColor = "#ffd11a";
  } else if (operation === '÷') {
    document.getElementById("divOp").style.backgroundColor = "#ffd11a";
  }
}

function backSpace(){
  if (input.length === 1){
    input = '0';
  } else {
    input = input.substring(0, input.length-1);
  }
}

function decimalValue(symbol){
  if (input.length == 1 && input === '0') {
    input += symbol;
  } else if (input.includes(symbol) && symbol === symbol) {
    return;
  } else {
    input += symbol;
  }
}

function plus_minus(key){ 
  // remove negative sign when hitting "+/-" twice
  if (input.includes(key) && key === key) {
    input = input.slice(1);
  } 
  // adding negative sign
  else {
    input = key + input;
  }
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
    case '←':
      backSpace();
      break;
    case '%':
      console.log("percentage");
      break;
    case '+/-':
      plus_minus('-');
      break;
    case '+':
    case '-':
    case '×':
    case '÷':
      // handleMath(symbol);
      setOperation(symbol);
      break;
    case '.':
      decimalValue(symbol);
      break;
  }
}

// every "click" actions are processed by this function
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