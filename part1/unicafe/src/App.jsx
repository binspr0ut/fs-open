import { useState } from 'react'

const Button = ({ handleClick, text }) => {
  return (
    <button onClick={handleClick}>{text}</button>
  )
}

const StatisticLine = ({ value, text }) => {
  return (
    <table>
      <tbody>
        <tr>
          <th>{text}</th>
          <th>{value}</th>
        </tr>
      </tbody>
    </table>
  )
}

const Statistics = ({ good, neutral, bad, all }) => {
  if (all === 0) {
    return (
      <div>
        <h1>statistics</h1>
        <div>No feedback given</div>
      </div>
    )
  } else {
    return (
      <div>
        <h1>statistics</h1>
        <StatisticLine text="good" value={good} />
        <StatisticLine text="neutral" value={neutral} />
        <StatisticLine text="bad" value={bad} />
        <StatisticLine text="all" value={all} />
        <StatisticLine text="average" value={all !== 0 ? ((good * 1) + (bad * -1)) / all : 0} />
        <StatisticLine text="positive" value={all !== 0 ? (good / all) * 100 : 0} />
      </div>
    )
  }

}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)

  const addGood = () => {
    console.log('before -> good: ', good)
    const updatedGood = good + 1
    setGood(updatedGood)
    setAll(all + 1)
    console.log('after -> good: ', updatedGood)
  }

  const addNeutral = () => {
    console.log('before -> neutral: ', neutral)
    const updatedNeutral = neutral + 1
    setNeutral(updatedNeutral)
    setAll(all + 1)
    console.log('after -> neutral: ', updatedNeutral)
  }

  const addBad = () => {
    console.log('before -> bad: ', bad)
    const updatedBad = bad + 1
    setBad(updatedBad)
    setAll(all + 1)
    console.log('after -> bad: ', updatedBad)
  }

  return (
    <div>
      <div>
        <h1>give feedback</h1>
        <Button handleClick={addGood} text={"good"} />
        <Button handleClick={addNeutral} text={"neutral"} />
        <Button handleClick={addBad} text={"bad"} />
      </div>
      <Statistics good={good} neutral={neutral} bad={bad} all={all}></Statistics>
    </div >
  )
}

export default App