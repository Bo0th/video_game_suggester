import React from 'react'
import './home.css'

const Home = ({onPageChange}) => {

  const handleChange = (event) => {
    const newState = event.target.value
    onPageChange(newState)
}

  return (
    <div className='app__home'>
      <h1>Welcome</h1>
      <h2>Not sure what to play and need a suggestion?</h2>
      <h3>Click below to suggest a game or have a look through the catalogue</h3>
      <div className='app__home-buttons'>
        <button onClick={handleChange} value='Suggest A Game'>Suggest Game</button>
        <button onClick={handleChange} value='Games Catalogue'>Look Through Catalogue</button>
      </div>
    </div>
  )
}

export default Home
