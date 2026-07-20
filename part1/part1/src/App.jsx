const Hello = (props) => {
  console.log(props)
  return (
    <div>
      <p>hello {props.name}, im {props.age}</p>
    </div>
  )
}

const App = () => {
  const friends = [
    { name: 'peter', age: 4 },
    { name: 'maya', age: 10 }
  ]

  return (
    <div>
      <p>{friends[0].name}</p>
      <p>{friends[0].age}</p>
    </div>
  )
}

export default App;