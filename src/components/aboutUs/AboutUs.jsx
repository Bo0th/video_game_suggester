import React from 'react'
import './aboutUs.css'

const AboutUs = () => {
  return (
    <div className='app__aboutUs'>
      <h1>About this video game suggester</h1>
      <p>Not sure what to play?</p> 
      <p>Need someone to make a suggestion?</p>
      <p>Then look no further, click on the 'New Suggestion' button in the top right corner of the screen or use the button on the home page to select a platform and be suggested a game to play. We'll provide info on the game including some screenshots and a metacritic rating, some games will even have links to purchase them from well known stores such as Steam or Epic.</p>
      <br />
      <p>If being suggested a random game doesn't sound like your cup of tea then have a look through the Games Catalogue, use the filters to find a game that looks good to you.</p>
      <br />
      <p>The video game suggester is a fantastic way to expose yourself to new games or rediscover old gems from your childhood, I hope you find something good!</p>
      <br />
      <p id='app__aboutUs-happy'>Happy gaming!</p>
      <br />
      <p className='app__aboutUs-rawg'>All info on this website is provided by the RAWG API </p>
    </div>
  )
}

export default AboutUs
