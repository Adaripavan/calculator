const display = document.getElementById('display');
const historyList = document.getElementById('historyList');
const historySection = document.getElementById('history');
let currentInput = '';
let degreeMode = true;

// Load history from localStorage on page load
document.addEventListener('DOMContentLoaded', loadHistory);

function appendNumber(number) {
    currentInput += number;
    display.value = currentInput;
}

function appendOperator(operator) {
    currentInput += ` ${operator} `;
    display.value = currentInput;
}

function appendDot() {
    if (!currentInput.includes('.')) {
        currentInput += '.';
        display.value = currentInput;
    }
}

function clearDisplay() {
    currentInput = '';
    display.value = '';
}

function backspace() {
    currentInput = currentInput.slice(0, -1);
    display.value = currentInput;
}

function calculateResult() {
    try {
        const result = eval(currentInput.replace(/√/g, 'Math.sqrt')
                                        .replace(/log/g, 'Math.log10')
                                        .replace(/sin/g, 'Math.sin')
                                        .replace(/cos/g, 'Math.cos')
                                        .replace(/tan/g, 'Math.tan')
                                        .replace(/\^/g, '**'));
        display.value = result;
        addToHistory(`${currentInput} = ${result}`);
        currentInput = result.toString();
    } catch (error) {
        display.value = 'Error';
        currentInput = '';
    }
}

function appendFunction(func) {
    currentInput += `${func}(`;
    display.value = currentInput;
}

function addToHistory(entry) {
    const listItem = document.createElement('li');
    listItem.textContent = entry;
    historyList.appendChild(listItem);

    // Save history to localStorage
    saveHistory(entry);
}

function toggleHistory() {
    if (historySection.style.display === 'none' || historySection.style.display === '') {
        historySection.style.display = 'block';
    } else {
        historySection.style.display = 'none';
    }
}

function toggleMode() {
    degreeMode = !degreeMode;
    const modeButton = document.querySelector('button[onclick="toggleMode()"]');
    modeButton.textContent = degreeMode ? 'DEG' : 'RAD';
    // Logic to handle degree/radian mode in calculations
}

function saveHistory(entry) {
    let history = JSON.parse(localStorage.getItem('calcHistory')) || [];
    history.push(entry);
    localStorage.setItem('calcHistory', JSON.stringify(history));
}

function loadHistory() {
    let history = JSON.parse(localStorage.getItem('calcHistory')) || [];
    history.forEach(entry => {
        const listItem = document.createElement('li');
        listItem.textContent = entry;
        historyList.appendChild(listItem);
    });
}

function clearHistory() {
    localStorage.removeItem('calcHistory');
    historyList.innerHTML = '';
}

document.addEventListener('keydown', (event) => {
    const key = event.key;
    if (!isNaN(key)) {
        appendNumber(key);
    } else if (['+', '-', '*', '/', '^'].includes(key)) {
        appendOperator(key);
    } else if (key === 'Enter') {
        calculateResult();
    } else if (key === 'Backspace') {
        backspace();
    } else if (key === 'c' || key === 'C') {
        clearDisplay();
    } else if (key === '(' || key === ')') {
        appendOperator(key);
    } else if (key === '.') {
        appendDot();
    }
});
