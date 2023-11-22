import {React, useState} from 'react'
import './card.css'

const Card = ({image, name, released, rating, id, parent, platformSelecter, parentPlatformSelecter, passSelectedGame}) => {
  const [parentPlatform, setParentPlatform] = useState('')
  const [platform, setPlatform] = useState('')

  const cardParentPlatformSelecter = () => {
    const selectedPlatform = {name}
    // console.log(`selected platform is`, selectedPlatform)
    parentPlatformSelecter(selectedPlatform)
  }

  const cardPlatformSelecter = () => {
    const selectedPlatform = {name}
    // console.log(`selected platform is`, selectedPlatform)
    platformSelecter(selectedPlatform)
  }

  const cardPassSelectedGame = () => {
    const selectedGame = {id}
    passSelectedGame(selectedGame)
  }

  // console.log({image})

  if(parent === 'suggester'){
    return (
      <div className='app__card-suggester'>
        <div className='app__card-suggester-image'>
          {image === null ? 
            <p>Sorry no image found for this game</p>
            :
            <img src={image} alt="game image" />
          }
        </div>

        <div className='app__card-suggester-content'>
              <div className='app__card-suggester-content-left'>
                  <h4>{name}</h4>
                  <p>{released}</p>
              </div>

              {rating && 
                <div className='app__card-suggester-content-right'>
                <p>{rating/10} out of 10</p>
                </div>
              }
        </div>
      </div>
  )}
  else if (parent === 'parentPlatformSelecter') {
    return (
      <div className='app__card-parentPlatformSelecter' onClick={cardParentPlatformSelecter}>
        <div className='app__card-parentPlatformSelecter-image'>
          {image === null ? 
            <p>Sorry no image found for this game</p>
            :
            <img src={image} alt="game image" />
          }
        </div>

        <div className='app__card-parentPlatformSelecter-content'>
          <div className='app__card-parentPlatformSelecter-content-left'>
              <h4>{name}</h4>
              <p>{released}</p>
          </div>

          {rating && 
            <div className='app__card-parentPlatformSelecter-content-right'>
            <p>{rating/10} out of 10</p>
            </div>
          }
        </div>
      </div>
    )
  } 
  else if (parent === 'catalogue') {
    return (
      <div className='app__card-catalogue' onClick={cardPassSelectedGame}>
        <div className='app__card-catalogue-image'>
          {image === null ? 
            <p>Sorry no image found for this game</p>
            :
            <img src={image} alt="game image" />
          }
        </div>

        <div className='app__card-catalogue-content'>
          <div className='app__card-catalogue-content-left'>
              <h4>{name}</h4>
              
          </div>

          {rating && 
            <div className='app__card-catalogue-content-right'>
            <p>{released}</p>
            <p>{rating/10} out of 10</p>
            </div>
          }
        </div>
      </div>
    )
  }
  else {
    return (
      <div className='app__card-platformSelecter' onClick={cardPlatformSelecter}>
        <div className='app__card-platformSelecter-image'>
          {image === null ? 
            <p>Sorry no image found for this game</p>
            :
            <img src={image} alt="game image" />
          }
        </div>

        <div className='app__card-platformSelecter-content'>
          <div className='app__card-platformSelecter-content-left'>
              <h4>{name}</h4>
              <p>{released}</p>
          </div>

          {rating && 
            <div className='app__card-platformSelecter-content-right'>
            <p>{rating/10} out of 10</p>
            </div>
          }
        </div>
      </div>
    )
  }
}

export default Card
