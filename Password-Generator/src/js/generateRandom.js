// Getting the button to js
const start = document.getElementById("start");

const output = document.getElementById("output");

// Listening for any clicks on the submit button
start.addEventListener("click", function() {

    // Getting updates on the checkmarks whenever button is pressed
    const lettersElement = document.getElementById("letter");
    const numbersElement = document.getElementById("number");
    const symbolsElement = document.getElementById("character");
    const uppercaseElement = document.getElementById("caps");

    const maxSize = document.getElementById("size").value;

    const lettersIncluded = lettersElement.checked;
    const numbersIncluded = numbersElement.checked;
    const symbolsIncluded = symbolsElement.checked;
    const uppercaseIncluded = uppercaseElement.checked;
    
    const password = setPassword(lettersIncluded, numbersIncluded, uppercaseIncluded, symbolsIncluded, maxSize);

    output.value = password

    navigator.clipboard.writeText(output.value);
    }
)

// Where passwords need to be made
function setPassword(letterIncluded, numbersIncluded, uppercaseIncluded, symbolsIncluded, maxSize) {
    
    let count = 0

    let array = [];

    let makePassword = 'Please select at least 1 checkbox';

    if (letterIncluded) {
        const letter = setLowtoHigh(97, 122)
        array = array.concat(letter)
        count += 1
    }
    
    if (numbersIncluded) {
        const number = setLowtoHigh(48, 57);
        array = array.concat(number)
        count += 1
    }
    
    if (uppercaseIncluded) {
        const uppercase = setLowtoHigh(65, 91);
        array = array.concat(uppercase)
        count += 1
    }
    
    if (symbolsIncluded) {
        const symbols = setLowtoHigh(33, 47).concat(setLowtoHigh(58, 65)).concat(setLowtoHigh(91, 96)).concat(setLowtoHigh(123, 126)).concat(setLowtoHigh(128, 131)).concat(setLowtoHigh(132, 133)).concat(setLowtoHigh(161, 172)).concat(setLowtoHigh(174, 253));
        array = array.concat(symbols)
        count += 1
    }

    if (count > 0) {
        let arraySize = array.length;

        if (maxSize > 32) {
            maxSize = 32;
        }

        makePassword = ''
        
        for (j=1; j<=maxSize; j++) {
            makePassword += array[Math.round(Math.random() * (arraySize - 1))]
        }
    }
    return makePassword
}

// Does all the arrays for free
function setLowtoHigh(low, high) {
    let array = [];
    for (i=low;i<high;i++) {
        array.push(String.fromCharCode(i))
    }
    return array
}

