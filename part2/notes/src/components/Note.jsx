const Note = ({ note, toggle }) => {
  const label = note.important ? 'make not important' : 'make important'

  return <li>
    {note.content}
    <button onClick={toggle}>{label}</button>
  </li>
}

export default Note
