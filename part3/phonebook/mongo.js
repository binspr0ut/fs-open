const mongoose = require('mongoose')

console.log(process.argv.length)
if (process.argv.length < 3) {
    console.log('give password as an argument')
    process.exit(1)
}
consol
const password = process.argv[2]

const url = `mongodb+srv://plattenecho_db_user:${password}@cluster0.tzirpbm.mongodb.net/phonebook?appName=Cluster0`

mongoose.set(`strictQuery`, false)

const personSchema = mongoose.Schema(
    {
        name: String,
        number: String
    }
)

const Person = mongoose.model(`Person`, personSchema)

mongoose.connect(url, { family: 4 })
    .then(() => {
        console.log('connected to MongoDB')
    })
    .catch(error => {
        console.log('error connecting to MongoDB:', error.message)
    })

if (process.argv.length === 3) {
    Person.find({}).then(result => {
        result.map(note => {
            console.log(note)
        })
        mongoose.connection.close()
    })
}

if (process.argv.length === 5) {
    const person = new Person({
        name: process.argv[3],
        number: process.argv[4]
    })

    person.save().then(result => {
        console.log(`Added ${person.name} number ${person.number} to phonebook`)
        mongoose.connection.close()
    })
}
