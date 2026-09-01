import { useEffect, useState } from 'react'
import axios from 'axios'
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

const Persons = ({ persons }) => {
  return (<div>
    {persons.map(person => (<div key={person.id}>{person.name} {person.number}</div>))}
  </div>
  )
}


const App = () => {
  const [persons, setPersons] = useState([
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const [filtered, setFiltered] = useState(persons)
  const [filter, setFilter] = useState('')

  useEffect(() => {
    axios.get('http://localhost:3001/persons').then(
      response => {
        setPersons(response.data)
        setFiltered(response.data)
      }
    )
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const newB = { name: newName, number: newNumber, id: persons.length + 1 }

    if (persons.filter(x => x.name === newB.name).length === 0) {
      setPersons([...persons, newB])
      setFiltered([...filtered, newB])
      setNewName('')
      setNewNumber('')
    } else {
      alert(`${newB.name} is already added to phonebook`)
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
      <Filter filter={filter} filterPerson={filterPerson}></Filter>
      <h3>add a new</h3>
      <PersonForm addPerson={addPerson} newName={newName} addNewName={addNewName} newNumber={newNumber} addNewNumber={addNewNumber}></PersonForm>
      <h2>Numbers</h2>
      <Persons persons={filtered}></Persons>
    </div>
  )
}

export default App