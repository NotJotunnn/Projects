var counter = 0;

function increment() {
    counter++;

    showCounter();
}

function decrement() {
    counter--;
    
    showCounter();
}

function reset() {
    counter = 0;

    showCounter();
}

function showCounter() {
    const counterValue = document.getElementById('counter');

    const title = document.querySelector('title')

    title.innerHTML = `Counter! ${counter}`

    counter > 0 ? counterValue.setAttribute('style', `color: var(--positive);`) : counter < 0 ? counterValue.setAttribute('style', `color: var(--negative);`) : counterValue.setAttribute('style', `color: var(--main-black);`)

    counterValue.textContent = counter;
}