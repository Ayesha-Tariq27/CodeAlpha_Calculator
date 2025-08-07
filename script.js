const numberButtons = document.querySelectorAll('button:not(.operation):not(#clear):not(#delete):not(#equals)');
const operationButtons = document.querySelectorAll('.operation');
const equalsButton = document.getElementById('equals');
const deleteButton = document.getElementById('delete');
const allClearButton = document.getElementById('clear');
const previousOperandTextElement = document.getElementById('previous-operand');
const currentOperandTextElement = document.getElementById('current-operand');

let currentOperand = '';
let previousOperand = '';
let operation = undefined;

function clear() {
    currentOperand = '';
    previousOperand = '';
    operation = undefined;
    updateDisplay();
}

function del() {
    currentOperand = currentOperand.toString().slice(0, -1);
    updateDisplay();
}

function appendNumber(number) {
    if (number === '.' && currentOperand.includes('.')) return;
    currentOperand = currentOperand.toString() + number.toString();
    updateDisplay();
}

function chooseOperation(op) {
    if (currentOperand === '') return;
    if (previousOperand !== '') {
        compute();
    }
    operation = op;
    previousOperand = currentOperand;
    currentOperand = '';
}

function compute() {
    let computation;
    const prev = parseFloat(previousOperand);
    const current = parseFloat(currentOperand);
    if (isNaN(prev) || isNaN(current)) return;
    switch (operation) {
        case '+':
            computation = prev + current;
            break;
        case '-':
            computation = prev - current;
            break;
        case '*':
            computation = prev * current;
            break;
        case '/':
            computation = prev / current;
            break;
        default:
            return;
    }
    currentOperand = computation;
    operation = undefined;
    previousOperand = '';
    updateDisplay();
}

function updateDisplay() {
    currentOperandTextElement.innerText = currentOperand || '0';
    previousOperandTextElement.innerText = previousOperand + (operation || '');
}

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        appendNumber(button.innerText);
    });
});

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        chooseOperation(button.innerText);
    });
});

equalsButton.addEventListener('click', compute);
allClearButton.addEventListener('click', clear);
deleteButton.addEventListener('click', del);

// Keyboard Support
document.addEventListener('keydown', e => {
    if (!isNaN(e.key) || e.key === '.') {
        appendNumber(e.key);
    }
    if (['+', '-', '*', '/'].includes(e.key)) {
        chooseOperation(e.key);
    }
    if (e.key === 'Enter' || e.key === '=') compute();
    if (e.key === 'Backspace') del();
    if (e.key === 'Escape') clear();
});
