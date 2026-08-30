
const Course = ({ courses }) => {
  return (
    <div>
      {courses.map((course) =>
        <div key={course.id}>
          <h1>{course.name}</h1>
          <Content parts={course.parts}></Content>
        </div>
      )
      }
    </div >
  )
}

const Content = ({ parts }) => {

  const total = parts.reduce((x, y) => x + y.exercises, 0)
  return (
    <div>
      {parts.map(part => <Part key={part.id} name={part.name} exercises={part.exercises}></Part>)}
      <div>total of {total} exercises</div>
    </div>
  )
}

const Part = ({ name, exercises }) => {
  return (
    <div>{name} {exercises}</div>
  )
}

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    },
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return <Course courses={courses} />
}

export default App