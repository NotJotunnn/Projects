// Base declaration
const input = document.querySelector('input');


// On keydown the event below activates
input.addEventListener('keydown', async (event) => {
    // Declaration
    const input = document.querySelector('input');

    // Checking to see if there is any data on the store
    const data = await fetch('http://localhost:8000/all').then(response => response.json()).catch(err => console.warn('Line 11: ', err));

    // Checking to see if Enter key was pressed, if so, add a new task
    if(event.key == "Enter") addTask();
    
    // Checking to see if Backspace key was pressed, if there is any data available to delete and if there are any values in the input, if so, delete the most recent task
    if(event.key == "Backspace" && await data.tasks.length > 0 && !input.value) removeRecentTask();
})

function addTask() {
    // Declaration
    const input = document.querySelector('input')
    
    // Checking to see if there is value on the input
    if(input.value) {
        // Adding it to the store
        fetch(`http://localhost:8000/add/${input.value}`).catch(err => console.warn('Line 27: ', err))

        // Cleaning leftovers in input
        input.value = ''

        // UI update
        showAddedTasks()
    }
}

async function showAddedTasks() {
    // Declarations
    const ul = document.querySelector('ul')

    // Getting the stored values
    const data = await fetch('http://localhost:8000/all').then(response => response.json()).catch(err => console.warn('Line 42: ', err))

    // Declaring them into a variable
    const array = data.tasks

    // Declaring variable to place data within the array to
    var pTextContent = ''

    // Simple counter to help locating each new list item
    var count = 0

    // HTML element creator
    array.map(arrItem => {
        pTextContent += `<li class="${count}" onclick="removeTask(${count})">${arrItem}</li>\n`
        count++
    })
    
    // Adding everything already got to the parent element
    ul.innerHTML = pTextContent

}

function removeTask(event) {
    // Declarations
    const ulItems = document.querySelectorAll('li')

    // Removing the selected list item from UI
    fetch(`http://localhost:8000/remove/${event}`)
        .then(ulItems[event].remove())
        .catch(err => console.warn('Line 71: ', err))
}

async function removeRecentTask() {
    // Declarations
    const ulItems = document.querySelectorAll('li')

    // Getting the length of the list
    const data = await fetch('http://localhost:8000/all')
    .then(response => response.json())
    .catch(err => console.warn('Line 81: ', err))

    // Setting it into a variable
    const size = data.tasks.length
    
    // Removing it from the UI
    ulItems[size - 1].remove()
    fetch(`http://localhost:8000/remove/${size}`).catch(err => console.warn('Line 88: ', err))

}

// Initial UI update to add reminiscent items from store
showAddedTasks()