import { useState, useEffect } from 'react'
import Note from './components/Note'
import axios from 'axios'
import noteService from './services/notes'

const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState("new note")
  const [showAll, setShowAll] = useState(true)

  useEffect(() => {
    console.log("effect")
    noteService.getAll()
      .then(response => {
        setNotes(response.data)
      })
  }, [])
  console.log('render', notes.length, 'notes')

  const addNote = (event) => {
    event.preventDefault()
    const newObject = {
      content: newNote,
      important: Math.random() < 0.5,
    }
    axios.post("http://localhost:3001/notes", newObject)
      .then(response => {
        console.log(response)
        setNotes(notes.concat(newObject))
        setNewNote('')
      })
  }

  const toggle = (id) => {
    const note = notes.find(note => note.id === id)
    const cNote = { ...note, important: !note.important }

    noteService.update(id, cNote).then(response => {
      setNotes(notes.map(note => note.id === id ? response.data : note))
    })
  }

  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important === true)

  const addNewNote = (event) => {
    console.log(event.target.value)
    setNewNote(event.target.value)
  }

  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? "important" : "all"}
        </button>
      </div>
      <ul>
        {notesToShow.map((note) => (
          <Note key={note.id} note={note} toggle={() => toggle(note.id)} />
        ))}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={addNewNote} />
        <button type='submit'>save</button>
      </form>
    </div>
  )
}

export default App
