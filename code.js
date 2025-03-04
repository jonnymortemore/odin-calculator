calculatorValues = {
    "number1": "",
    "number2": "",
    "operand": ""
}


function add(a, b) {
    return a + b
}

function subtract (a, b) {
    return a - b
}

function multiply(a, b) {
    return a * b
}

function divide(a, b) {
    return a / b
}

function operator(a, b, operator) {
    let result = 0
    a = parseFloat(a)
    b = parseFloat(b)
    switch(operator) {
        case "+":
            result = add(a, b);
            break;
        case "-":
            result = subtract(a, b);
            break;
        case "*":
            result = multiply(a, b);
            break;
        case "/":
            result = divide(a, b)
            break;
    }
    return result
}

function displayValue(value, reset) {
    const display = document.querySelector('.display')
    if (reset) {
        display.innerText = value
    }
    else {
        display.innerText += value
    }
    
}

//number buttons
document.querySelectorAll('.number').forEach((el => {
    el.addEventListener('click', (e) => {
        let value = e.target.dataset.value;
        console.log(value);
        if (calculatorValues.operand === "") {
            if (calculatorValues.number1 == "") {
                displayValue(value, reset=true)
                calculatorValues.number1 = value;
            } else {
                displayValue(value, reset=false);
                calculatorValues.number1 += value;
            };
        }
        else  {
            if (calculatorValues.number2 == "") {
                calculatorValues.number2 = value;
            } else {
                calculatorValues.number2 += value;
            };
            displayValue(value, reset=false);
        }
    })
}))

//operand buttons
document.querySelectorAll('.operand').forEach((el => {
    el.addEventListener('click', (e) => {
        let value = e.target.dataset.value;
        if (calculatorValues.operand === "") {
            calculatorValues.operand = value;
            displayValue(value, reset=false)
        }
    })
}))

//equals button
document.querySelector('.equals').addEventListener('click', () => {
    if (calculatorValues.number1 != 0 && calculatorValues.number2 != 0 && calculatorValues.operand != "") {
        sum = operator(calculatorValues.number1, calculatorValues.number2, operand=calculatorValues.operand);
        displayValue(sum, reset=true);
        calculatorValues.number1 = sum;
        calculatorValues.number2 = ""
        calculatorValues.operand = ""
    }
})

//clear button
document.querySelector('.clear').addEventListener('click', () => {
    displayValue(0, reset=true);
    calculatorValues.number1 = "";
    calculatorValues.number2 = ""
    calculatorValues.operand = ""
})

//decimal button

document.querySelector('.decimal').addEventListener('click', () => {
    if (calculatorValues.number1 != 0 && calculatorValues.operand == "") {
        displayValue(".", reset=false);
        calculatorValues.number1 += "."
    } else if (calculatorValues.number2 != 0 && calculatorValues.operand != "") {
        displayValue(".", reset=false);
        calculatorValues.number2 += "."
    }
    
})