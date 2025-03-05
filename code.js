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
    //if b is 0 divide by 1 instead
    return b == 0 || a == 0 ? 0 : a / b
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
    return result;
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

function saveValue(value) {
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
}

function saveOperand(value) {
    if (calculatorValues.operand === "") {
        calculatorValues.operand = value;
        displayValue(value, reset=false)
    }
}

function sumValues() {
    if (calculatorValues.number1 != "" && calculatorValues.number2 != "" && calculatorValues.operand != "") {
        let sum = operator(calculatorValues.number1, calculatorValues.number2, operand=calculatorValues.operand);
        if (!Number.isInteger(sum)) {
            sum = parseFloat(sum.toPrecision(10))
        }
        displayValue(sum, reset=true);
        calculatorValues.number1 = String(sum);
        calculatorValues.number2 = ""
        calculatorValues.operand = ""
    }
}

function deleteValue() {
    const display = document.querySelector('.display');
    let new_text = display.textContent;
    
    display.textContent = new_text.slice(0, new_text.length - 1);
    if (display.textContent === "") {
        display.textContent = "0";
    }
    if (calculatorValues.operand === "" && calculatorValues.number1 != "") {
        calculatorValues.number1 = calculatorValues.number1.slice(0, calculatorValues.number1.length - 1);
    }
    else if (calculatorValues.operand != "" && calculatorValues.number2 != "") {
        calculatorValues.number2 = calculatorValues.number2.slice(0, calculatorValues.number2.length - 1);
    } else {
        calculatorValues.operand = ""
    }
    
}

//number buttons
document.querySelectorAll('.number').forEach((el => {
    el.addEventListener('click', (e) => {
        saveValue(e.target.dataset.value);
        
    })
}))

//operand buttons
document.querySelectorAll('.operand').forEach((el => {
    el.addEventListener('click', (e) => {
        saveOperand(e.target.dataset.value)
    })
}))

//equals button
document.querySelector('.equals').addEventListener('click', () => {
    sumValues()
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
    if (calculatorValues.number1 != "" && calculatorValues.operand == "") {
        if (!calculatorValues.number1.includes(".")) {
             displayValue(".", reset=false);
            calculatorValues.number1 += "."
        }
       
    } else if (calculatorValues.number2 != "" && calculatorValues.operand != "") {
        if (!calculatorValues.number2.includes(".")) {
            displayValue(".", reset=false);
            calculatorValues.number2 += "."
        }
    }
})

//keyboard key detection
document.addEventListener('keydown', function(event) {
    numbers = ["0","1","2","3","4","5","6","7","8","9"];
    operands = ["+", "-", "/", "*"]
    //console.log(event.key)
    if (numbers.includes(event.key)) {
        saveValue(event.key);
    } else if (operands.includes(event.key)) {
        saveOperand(event.key)
    } else if (event.key === "Enter") {
        sumValues()
    } else if (event.key === "Backspace") {
        deleteValue()
    }
    
})

//back button
document.querySelector('.back').addEventListener('click', () => {
    deleteValue()
})