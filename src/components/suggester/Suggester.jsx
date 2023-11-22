import {React, useState, useEffect} from 'react'
import Card from '../card/Card'
import ScreenshotScroll from '../screenshotScroll/ScreenshotScroll'
import './suggester.css'

const Suggester = ({reRun, clientId, platformId, gameId, catalogueToTrue}) => {
    const [refresh, setRefresh] = useState(false)  
    const [arraySize, setArraySize] = useState(0) 
    const [suggestedGame, setSuggestedGame] = useState('No game found')
    const [gameDescription, setGameDescription] = useState('No description found')
    const [gameGenre, setGameGenre] = useState(['No genres found'])
    const [storeURL, setStoreURL] = useState(['Not available for purchase'])
    const [suggestedGamePlatforms, setSuggestedGamePlatforms] = useState([{platform: {name:'No platforms found'}}])

    const [catalogueGameData, setCatalogueGameData] = useState({})
    const [catalogueDescription, setCatalogueDescription] = useState('No description found')
    const [catalogueGameDataGenres, setCatalogueGameDataGenres] = useState(['No genres found'])
    const [catalogueGameDataPlatforms, setCatalogueGameDataPlatforms] = useState([{platform: {name:'No platforms found'}}])
    const [catalogueGameDataStore, setCatalogueGameDataStore] = useState({url: 'Not available for purchase'})
    const [catalogueGameDataRating, setCatalogueGameDataRating] = useState('')
    const [catalogueGameDataReleased, setCatalogueGameDataReleased] = useState('')

    useEffect(() => {
      setRefresh(false)

      if (gameId) {
        const fetchCatalogueGameData = async () => {
          const url = `https://api.rawg.io/api/games/${gameId}?key=${clientId}`
          const options = {
            method: 'GET',
          }

          try { 
            const response = await fetch(url, options)
            const result = await response.json()
            return result
          } catch (err) {
            console.log(err)
          }
        }

        const fetchCatalogueStoreURL = async () => {
          const url = `https://api.rawg.io/api/games/${gameId}/stores?key=${clientId}&page_size=1&exclude_additions=true`;
          const options = {
              method: 'GET',
          }

          try { 
            const response = await fetch(url, options)
            const result = await response.json()
            return result
          } catch (err) {
            console.log(err)
          }
        }

        
        const fetchAll = async () => {
          const tempCatalogueGameData = await fetchCatalogueGameData()
          const tempCatalogueGameStores = await fetchCatalogueStoreURL()
          // console.log(`temp is`, tempCatalogueGameStores)

          if(tempCatalogueGameData){
            setCatalogueGameData(tempCatalogueGameData)
          }

          if(tempCatalogueGameData.description_raw){
            setCatalogueDescription(tempCatalogueGameData.description_raw)}

          if(tempCatalogueGameData.genres){
            setCatalogueGameDataGenres(tempCatalogueGameData.genres)}

          if(tempCatalogueGameData.platforms[0]) {
            setCatalogueGameDataPlatforms(tempCatalogueGameData.platforms)}
            
          if(tempCatalogueGameData.metacritic){
            setCatalogueGameDataRating(tempCatalogueGameData.metacritic)}
            
          if(tempCatalogueGameData.released){
            setCatalogueGameDataReleased(tempCatalogueGameData.released)}
            
          if(tempCatalogueGameStores.results[0]){
            setCatalogueGameDataStore(tempCatalogueGameStores.results[0])}
            
        }
        

        fetchAll()
        
      } 
      else { 
      
        let tempSuggestedGameResults = [0]       
        let randGame = 0
        let randPage = 0

        const resetStates = () => {
          setArraySize(0)
          setSuggestedGame('No game found')
          setGameDescription('No description found')
          setGameGenre(['No genres found'])
          setStoreURL(['Not available for purchase'])
          setSuggestedGamePlatforms([{platform: {name:'No platforms found'}}])
        }

        const fetchArraySize = async () => {
          

          const url = `https://api.rawg.io/api/games?key=${clientId}&page_size=40&platforms=${platformId}&exclude_additions=true`;
          const options = {
              method: 'GET',
          }

          try { 
            const response = await fetch(url, options)
            const result = await response.json()
            return result
          } catch (err) {
            console.log(err)
          }
        }

        const fetchSuggestedGame = async (count) => {
          randPage = (Math.floor(Math.random() * count/40))
          if(randPage > 250){
            randPage = (Math.floor(Math.random() * 250))
          } else if(randPage === 0) {
            randPage = 1
          }
          const url = `https://api.rawg.io/api/games?key=${clientId}&page_size=40&platforms=${platformId}&page=${randPage}&exclude_additions=true`;
          const options = {
              method: 'GET',
          }        

          try { 
            const response = await fetch(url, options)
            const result = await response.json()
            tempSuggestedGameResults = result.results
            // console.log(result)
            return result
          } catch (err) {
            console.log(err)
          }
        }

        const fetchGameDescription = async (game) => {
          const url = `https://api.rawg.io/api/games/${game}?key=${clientId}&description&exclude_additions=true`;
          const options = {
              method: 'GET',
          }

          try { 
            const response = await fetch(url, options)
            const result = await response.json()
            return result
          } catch (err) {
            console.log(err)
          }
        }

        const fetchStoreURL = async (game) => {
          const url = `https://api.rawg.io/api/games/${game}/stores?key=${clientId}&page_size=1&exclude_additions=true`;
          const options = {
              method: 'GET',
          }

          try { 
            const response = await fetch(url, options)
            const result = await response.json()
            return result
          } catch (err) {
            console.log(err)
          }
        }

        const fetchAll = async () => {
          const tempArraySize = await fetchArraySize()
          // console.log('fetch array size worked')
          const tempSuggestedGame = await fetchSuggestedGame(tempArraySize.count)
          // console.log('fetch suggested game worked')
          // console.log(tempSuggestedGameResults)


          if(tempSuggestedGameResults){
            randGame = (Math.floor(Math.random() * tempSuggestedGameResults.length))
            // console.log(`TSG is`,tempSuggestedGame)
            // console.log(`TSGR is`,tempSuggestedGameResults)
            // console.log(`RP is`,randPage)
          }

          if(tempSuggestedGame.results){
            const tempGameDescription = await fetchGameDescription(tempSuggestedGame.results[randGame].id)
            // console.log('fetch game description worked')
            const tempStoreURL = await fetchStoreURL(tempSuggestedGame.results[randGame].id)
            // console.log('fetch storeURL worked')
            setArraySize(tempArraySize.count)

            if(tempSuggestedGame.results){
              setSuggestedGame(tempSuggestedGame.results[randGame])
              // console.log(`RG is`,randGame)
            }

            if(tempSuggestedGame.results[randGame].platforms){
              setSuggestedGamePlatforms(tempSuggestedGame.results[randGame].platforms)
            }

            if(tempSuggestedGame.results[randGame].genres){
              setGameGenre(tempSuggestedGame.results[randGame].genres)
            }

            if(tempGameDescription.description_raw){
              setGameDescription(tempGameDescription.description_raw)
            }

            if(tempStoreURL.results[0]){
              setStoreURL([tempStoreURL.results[0]])
            }
          } 
          else {setGameDescription('Something went wrong, no game found. Please try again.')
          }
        }

        // console.log(suggestedGame)
        // console.log(suggestedGamePlatforms)
        resetStates()
        fetchAll()
      }
      
    }, [reRun, refresh])

    const handleClickCatalogueToTrue = () => {
      catalogueToTrue(true)
    }

    const refreshDom = () => {
      setRefresh(true)
    }

    // console.log(`gameData is`, catalogueGameData)
    // console.log(`gameDesc is`, catalogueDescription)
    // console.log(`gamePlat is`, catalogueGameDataPlatforms)
    // console.log(`gameGenre is`, catalogueGameDataGenres)
    // console.log(`gameRelease is`, catalogueGameDataReleased)
    // console.log(`gameStore is`, catalogueGameDataStore)
    // console.log(`gameRating is`, catalogueGameDataRating)

    if(gameId){ 
      return (
        <div className='app__suggester'>
          <div className='app__suggester-info'>

            <div className='app__suggester-info-left'>
            <button className='app__suggester-returnToSearch' type='button' onClick={handleClickCatalogueToTrue}>Return to search results...</button>
            <Card parent='suggester' image={catalogueGameData.background_image} name={catalogueGameData.name} released={catalogueGameDataReleased} rating={catalogueGameDataRating} />
            </div>
            
            <div className='app__suggester-info-content'>
              <h3>Description</h3>
              <p className='app__suggester-info-content-description'>{catalogueDescription}</p>
              <div className='app__suggester-info-content-addedInfo'>
                <div className='app__suggester-info-content-addedInfo-genres'>
                <h4>Genres:</h4>
                <div>
                    {catalogueGameDataGenres.map((genre) => {
                      return (
                        <p>{genre.name}</p>
                      )
                    })}
                  </div>
                </div>
                <div className='app__suggester-info-content-addedInfo-platforms'>
                  <h4>Platforms:</h4>
                  <div>
                    {catalogueGameDataPlatforms.map((platform) => {
                      return (
                        <p>{platform.platform.name}</p>
                      )
                    })}
                  </div>
                </div>
              </div>
              
              <div className='app__suggester-info-store'>
                {(catalogueGameDataStore.url === 'Not available for purchase') ? <h4>Unavailable for purchase</h4>
                : <h4>Purchase <a href={catalogueGameDataStore.url} target='_blank'>here</a></h4> }

              
              </div>
            
            </div>
          
          </div>

          <div>
            <ScreenshotScroll game={catalogueGameData} clientId={clientId}/>
          </div>



        </div>
      )
    } else {
      return (
        <div className='app__suggester'>
          <div className='app__suggester-info'>
            <button className='app__suggester-newSuggestion' type='button' onClick={refreshDom}>New Suggestion</button>
            <Card parent='suggester' image={suggestedGame.background_image} name={suggestedGame.name} released={suggestedGame.released} rating={suggestedGame.metacritic} />
            
            <div className='app__suggester-info-content'>
              <h3>Description</h3>
              <p className='app__suggester-info-content-description'>{gameDescription}</p>
              <div className='app__suggester-info-content-addedInfo'>
                <div className='app__suggester-info-content-addedInfo-genres'>
                <h4>Genres:</h4>
                <div>
                    {gameGenre.map((genre) => {
                      return (
                        <p>{genre.name}</p>
                      )
                    })}
                  </div>
                </div>
                <div className='app__suggester-info-content-addedInfo-platforms'>
                  <h4>Platforms:</h4>
                  <div>
                    {suggestedGamePlatforms.map((platform) => {
                      return (
                        <p>{platform.platform.name}</p>
                      )
                    })}
                  </div>
                </div>
              </div>
              
              <div className='app__suggester-info-store'>
                {(storeURL[0] === 'Not available for purchase') ? <h4>Unavailable for purchase</h4>
                : <h4>Purchase <a href={storeURL[0].url} target='_blank'>here</a></h4> }

              
              </div>
            
            </div>
          
          </div>

          <div>
            <ScreenshotScroll game={suggestedGame} clientId={clientId}/>
          </div>



        </div>
      )
    }

}

export default Suggester
