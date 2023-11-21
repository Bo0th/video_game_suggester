import React from 'react'
import { Link } from 'react-router-dom'
import './home.css'

const Home = () => {

  return (
    <div className='app__home'>
      <h1>Welcome</h1>
      <h2>Not sure what to play and need a suggestion?</h2>
      <h3>Click below to suggest a game or have a look through the catalogue</h3>
      <div className='app__home-buttons'>
        <Link to="/PlatformSelecter"><button  value='Suggest A Game'>Suggest Game</button></Link>
        <Link to="/Catalogue"><button value='Games Catalogue'>Look Through Catalogue</button></Link>
      </div>
    </div>
  )
}

export default Home
