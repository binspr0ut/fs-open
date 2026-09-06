import { useEffect, useState } from 'react'
import axios from 'axios'
import phonebook from './services/phonebook'

const Notification = ({ message }) => {
  if (message == null)
    return null

  return (
    <div className='success'>
      {message}
    </div>
  )

}

const Error = ({ message }) => {
  if (message == null)
    return null

  return (
    <div className='error'>
      {message}
    </div>
  )

}

const Filter = ({ filter, filterPerson }) => {
  return (<div>
    filter: <input value={filter} onChange={filterPerson} />
  </div>)
}

const PersonForm = ({ addPerson, newName, addNewName, newNumber, addNewNumber }) => {
  return (<form onSubmit={addPerson}>
    <div>
      name: <input value={newName} onChange={addNewName} />
    </div>
    <div>
      number: <input value={newNumber} onChange={addNewNumber} />
    </div>
    <div>
      <button type="submit" >add</button>
    </div>
  </form>)

}

const Person = ({ person, deletePerson }) => {
  return (
    <div>
      {person.name} {person.number} <button onClick={deletePerson}>delete</button>
    </div >
  )
}


const App = () => {
  const [persons, setPersons] = useState([
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const [filtered, setFiltered] = useState(persons)
  const [filter, setFilter] = useState('')

  const [errorMessage, setErrorMessage] = useState(null)
  const [sucessMessage, setSuccessMessage] = useState(null)

  useEffect(() => {
    phonebook.getAll().then(
      response => {
        setPersons(response.data)
        setFiltered(response.data)
      }
    )
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const newB = { name: newName, number: newNumber, id: persons.length + 1 }
    const find = persons.find(person => person.name === newName)
    console.log(find)
    if (find !== undefined) {
      if (window.confirm(`Replace ${find.name}?`)) {
        const newB = { name: newName, number: newNumber, id: find.id }
        phonebook.update(newB, find.id).then(response => {
          setPersons(persons.map(person => person.id === find.id ? response.data : person))
          setFiltered(filtered.map(person => person.id === find.id ? response.data : person))
          setNewName('')
          setNewNumber('')
          setSuccessMessage(`'${newB.name}' updated`)
          setTimeout(() => {
            setSuccessMessage(null)
          }, 5000)
        }).catch(error => {
          setErrorMessage(`${error}.    ${newB.name} deleted`)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        }
        )
      }
    } else {
      phonebook.create(newB)
        .then(response => {
          setPersons([...persons, response.data])
          setFiltered([...filtered, response.data])
          setNewName('')
          setNewNumber('')

          setSuccessMessage(`'${newB.name}' added`)
          setTimeout(() => {
            setSuccessMessage(null)
          }, 5000)
        }
        )
    }
  }

  const deletePerson = (id) => {
    const person = persons.find(person => person.id === id)
    if (window.confirm(`Delete ${person.name}?`)) {
      phonebook.deletePerson(id).then(
        response => {
          setPersons(persons.filter(person => person.id !== id))
          setFiltered(filtered.filter(person => person.id !== id))

        }
      )
    }
  }

  const filterPerson = (event) => {
    setFilter(event.target.value)
    setFiltered(persons.filter(person => person.name.toLowerCase().includes(event.target.value.toLowerCase())))
  }

  const addNewNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const addNewName = (event) => {
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Error message={errorMessage}></Error>
      <Notification message={sucessMessage}></Notification>
      <Filter filter={filter} filterPerson={filterPerson}></Filter>
      <h3>add a new</h3>
      <PersonForm addPerson={addPerson} newName={newName} addNewName={addNewName} newNumber={newNumber} addNewNumber={addNewNumber}></PersonForm>
      <h2>Numbers</h2>
      {filtered.map(person =>
        <Person key={person.id} person={person} deletePerson={() => deletePerson(person.id)}></Person>
      )}
    </div>
  )
}

export default App