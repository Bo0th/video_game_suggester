import {React, useState, useEffect, useRef} from 'react'
import './screenshotScroll.css'

const clientId = '7fc8a0016c8e452c9133a2d43a13e2eb'


const ScreenshotScroll = ({game, clientId}) => {
  const [screenshotArray, setScreenshotArray] = useState([])

  useEffect(() => {
      const url = `https://api.rawg.io/api/games/${game.id}/screenshots?key=${clientId}&page_size=100`;
      const options = {
          method: 'GET',
      }
    
      fetch(url, options)
      .then(response=> response.json())
      .then(result => {setScreenshotArray(result.results)})  
    }, [game])

    const scrollRef = useRef(null)

    const scroll = (direction) => {
      const {current} = scrollRef
  
      if(direction === 'left') {
        current.scrollLeft -= 640
      } else {
        current.scrollLeft += 640
      }  
    }

    console.log(screenshotArray)

  return (
    <div className='app__screenshotScroll'>
      <h1>Screenshots </h1>

      {screenshotArray.length === 0 ?
        <p>Sorry no screenshots were found for this game</p>
        : 
        <div className='app__screenshotScroll-content'>
          <div className='app__screenshotScroll-content-arrow_container' onClick={() => scroll('left')}>
            <h1>&lt;</h1>
          </div>
          <div className='app__screenshotScroll-content-gallery' ref={scrollRef}>
                      
              {screenshotArray.map((screenshot) => {
                return (
                  <a href={screenshot.image} target='_blank'>
                    <img src={screenshot.image} alt="screenshot"  />
                  </a>
                )
              })
            }             
          </div>
          <div className='app__screenshotScroll-content-arrow_container' onClick={() => scroll('right')}>
            <h1>&gt;</h1>
          </div>
        </div>
      }   
      
    </div>
  )
}

export default ScreenshotScroll
