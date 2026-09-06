import axios from 'axios'
import { useEffect, useState } from 'react'

const Result = ({ state, result }) => {
  if (state === 404) {
    return (<div>Not found</div>)
  } else if (state === 0) {
    return (<div>Too many matches</div>)
  } else if (state === 1) {
    return (
      <div>
        {result.map(country =>
          <Country country={country}></Country>
        )
        }
      </div >)
  } else {
    return null
  }
}

const Country = ({ country }) => {
  const [hidden, setHidden] = useState(true)
  return hidden
    ? <div>{country.name.common} <button onClick={() => setHidden(!hidden)}>{hidden ? "show" : "hide"}</button></div>
    : <div>{country.name.common} <button onClick={() => setHidden(!hidden)}>{hidden ? "show" : "hide"}</button>
      <div>
        <h1>{country.name.common}</h1>
        <div>capital {country.capital[0]}</div>
        <div>area {country.area}</div>
        <div>
          <h2>Language</h2>
          <ul>
            {Object.values(country.languages).map(language => <li>{language}</li>)}
          </ul>
        </div>
        <img src={country.flags.png} alt={country.flags.alt}></img>
      </div>
    </div>
}

function App() {
  const [country, setCountry] = useState('')
  const [result, setResult] = useState([])
  const [state, setState] = useState(404)
  const url = 'https://studies.cs.helsinki.fi/restcountries/api'

  useEffect(() => {
    axios.get(`${url}/all`)
      .then(response => {
        console.log(country)
        const matches = response.data.filter(item => item.name.common.toLowerCase().includes(country.toLowerCase()))

        console.log(matches)
        setResult(matches)
        if (matches.length > 10) {
          setState(0)
        } else if (matches.length < 10) {
          setState(1)
        } else if (matches.length === 0) {
          setState(404)
        }
      })
  }, [country])

  const getCountry = (event) => {
    setCountry(event.target.value)
  }

  return (
    <div>
      <div>find countries <input value={country} onChange={getCountry}></input></div>
      <Result state={state} result={result}></Result>
    </div>
  )
}

export default App
