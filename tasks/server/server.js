import express from 'express';
import { readFileSync, writeFileSync } from 'fs';

const app = express()
const PORT = 8000

const data = readFileSync('./server/store.json')
const array = JSON.parse(data)

app.listen(PORT, () => console.log(`Starting... On port: ${PORT}`))

app.use(express.static('./client'));


// Gets array
app.get('/all', (request, response) => response.send(array))

// Adds to array
app.get('/add/:task', (request, response) => {
    var data = request.params;
    var task = data.task

    array.tasks.push(task)
    
    const answer = JSON.stringify(array, null, 2)

    writeFileSync('./server/store.json', answer, () => response.send("done"))
})


// Removes from array
app.get('/remove/:number', (request, response) => {
    var data = request.params;
    var number = data.number;
    
    array.tasks.splice(number - 1, 1)

    const answer = JSON.stringify(array, null, 2)

    writeFileSync('./server/store.json', answer, () => response.send("done"))
})