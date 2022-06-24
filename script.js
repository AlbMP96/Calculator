const buttonsCont = document.querySelector('#buttons');
const buttons = buttonsCont.childNodes;

const screen = document.querySelector('#screen');
const secondScreen = document.querySelector('#second-screen');

let screenText;

let numX;
let numY;
let memory;
let operation;

for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', () => {

        switch (buttons[i].className) {
//Write the number on the screens--------------------------------------------------------------------------------------
            case 'number':
                if (screen.textContent == 0 || operation == 'finished') {
                    if (operation == 'finished') {
                        secondScreen.textContent = '';
                    }
                    screen.textContent = '';
                }

                screenText = screen.textContent;
                screen.textContent = screenText + buttons[i].textContent;
                break;
//Show/Do the operations-------------------------------------------------------------------------------------------------
            case 'operation':
                if (numX == undefined) {
                    secondScreen.textContent = screen.textContent + buttons[i].textContent;
                    numX = screen.textContent;
                    clearScreen();
                } else {
                    numY = screen.textContent;
                    secondScreen.textContent = operations(operation) + buttons[i].textContent;
                    memory = numX;
                    numX = operations(operation);
                    numY = memory;
                    clearScreen();
                }
                operation = buttons[i].id;
                break;
//Finish the operations-------------------------------------------------------------------------------------------------
            case 'equal':
                if (operation != undefined && numX != undefined) {
                    numY = screen.textContent;
                    secondScreen.textContent += screen.textContent + buttons[i].textContent;
                    screen.textContent = operations(operation);
                    numX = screenText.textContent;
                }
                operation = 'finished';
                break;
//Clear the screen------------------------------------------------------------------------------------------------------
            case 'clear':
                if (buttons[i].id == 'clear-everything') {
                    clearScreen();
                    secondScreen.textContent = '';
                    numX = undefined;
                    numY = undefined;
                    memory = undefined;
                    operation = undefined;
                } else if (buttons[i].id == 'clear-screen') {
                    clearScreen();
                }
                break;
        }
    })
}

//-------------------------------------------------------------------------------------------------------------
function operations(operation) {
    if (operation != 'finished') {
        switch (operation) {
            case 'add':
                return add(numX, numY);
            case 'subtract':
                return subtract(numX, numY);
            case 'multiply':
                return multiply(numX, numY);
            case 'division':
                return division(numX, numY);

        }
    }
}

function clearScreen() {
    return screen.textContent = '0';
}


//--------------------------------------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------------------------------------
function add(x, y) {
    x = toFloat(x);
    y = toFloat(y);

    return x + y;
}

function subtract(x, y) {
    x = toFloat(x);
    y = toFloat(y);

    return x - y;
}

function multiply(x, y) {
    x = toFloat(x);
    y = toFloat(y);

    return (x * y).toFixed(2);
}

function division(x, y) {
    x = toFloat(x);
    y = toFloat(y);

    return (x / y).toFixed(2);
}

function toFloat(x) {
    return Number.parseFloat(x);
}