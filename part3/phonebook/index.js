const express = require("express")
const app = express()
app.use(express.json())

let phonebook = [
    {
        "id": "1",
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": "2",
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": "3",
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": "4",
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    }
]

app.get("/api/persons", (request, response) => {
    response.json(phonebook)
})

app.get("/info", (request, response) => {
    const count = phonebook.length
    response.send(`
        <div>
            <div>Phonebook has info for ${count} people</div>
            <div>${new Date().toLocaleString()}</div>
        <div>
        `)
})

app.get("/api/persons/:id", (request, response) => {
    const id = request.params.id
    const person = phonebook.find(p => p.id === id)

    person === undefined
        ? response.status(404).end()
        : response.json(person)
})

app.delete("/api/persons/:id", (request, response) => {
    const id = request.params.id
    phonebook = phonebook.filter(p => p.id !== id)

    response.status(204).end
})

app.post("/api/persons/", (request, response) => {
    const body = request.body

    if (!body.name) {
        response.status(400).json({
            "error": `name missing`
        })
    }
    else if (!body.number) {
        response.status(400).json({
            "error": `number missing`
        })
    }
    else if (phonebook.find(p => p.name === body.name || p.number === body.number)) {
        response.status(400).json({
            "error": `already exist number and name`
        })
    }
    else {
        const person = {
            "id": String(Math.random()),
            "name": body.name,
            "number": body.number
        }

        phonebook = phonebook.concat(person)
        response.json(person)
    }
})

const Port = 3001
app.listen(Port, () => {
    console.log(`running on port ${Port}`)
})