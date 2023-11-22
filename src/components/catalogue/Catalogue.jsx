import {React, useState, useEffect, useRef} from 'react'
import Card from '../card/Card'
import './catalogue.css'
import Suggester from '../suggester/Suggester'

const Catalogue = ({clientId, catalogueToStart, reRun}) => {
  const [allGamesNext, setAllGamesNext] = useState('')
  const [allGamesResults, setAllGamesResults] = useState([])
  const [allPlatforms, setAllPlatforms] = useState([])
  const [allGenres, setAllGenres] = useState([])
  const [allStores, setAllStores] = useState([])
  const [genre, setGenre] = useState('')
  const [platform, setPlatform] = useState('')
  const [rating, setRating] = useState('')
  const [store, setStore] = useState('')
  const [search, setSearch] = useState('')
  const [reset, setReset] = useState(false)
  const [showCatalogue, setShowCatalogue] = useState(true)
  const [selectedGame, setSelectedGame] = useState('')

  useEffect(() => {
    
    const resetStates = () => {
      setAllStores([])
      setAllGenres([])
      setAllGamesResults([])
      setAllPlatforms([])
    }

    const fetchAllGames = async () => {
      let urlSearch = ''
      let urlPlatform = ''
      let urlGenre = ''
      let urlRating = ''
      let urlStore = ''
      
      if(search){
        urlSearch = `&search=${search}`
      }

      if(platform){
        urlPlatform = `&platforms=${platform}`
      }

      if(genre){
        urlGenre = `&genres=${genre}`
      }

      if(rating){
        urlRating = `&metacritic=${rating},${rating + 10}`
      }

      if(store){
        urlStore = `&stores=${store}`
      }

      const url = `https://api.rawg.io/api/games?key=${clientId}&exclude_additions=true${urlSearch}${urlPlatform}${urlGenre}${urlRating}${urlStore}`
      const options = {
        method: "GET"
      }

      try {
        const response = await fetch(url, options)
        const result = await response.json()
        return result
      } catch (err) {
        console.log(err)
      }
    }

    const fetchAllPlatforms = async () => {
      const url = `https://api.rawg.io/api/platforms?key=${clientId}`
      const options = {
        method: "GET"
      }

      try {
        const response = await fetch(url, options)
        const result = await response.json()
        return result
      } catch (err) {
        console.log(err)
      }    
    }

    const fetchAllGenres = async () => {
      const url = `https://api.rawg.io/api/genres?key=${clientId}`
      const options = {
        method: "GET"
      }

      try {
        const response = await fetch(url, options)
        const result = await response.json()
        return result
      } catch (err) {
        console.log(err)
      }  
    }

    const fetchAllStores = async () => {
      const url = `https://api.rawg.io/api/stores?key=${clientId}`
      const options = {
        method: "GET"
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
      const tempAllGames = await fetchAllGames()
      const tempAllPlatforms = await fetchAllPlatforms()
      const tempAllGenres = await fetchAllGenres()
      const tempAllStores = await fetchAllStores()

      if(tempAllGames){
        setAllGamesResults(tempAllGames.results)
        setAllGamesNext(tempAllGames.next)
      }

      if(tempAllPlatforms) {
        setAllPlatforms(tempAllPlatforms.results)
      }

      if(tempAllGenres){
        setAllGenres(tempAllGenres.results)
      }

      if(tempAllStores){
        setAllStores(tempAllStores.results)
      }
    }

    resetStates()
    fetchAll()
  }, [search, platform, genre, rating, store, catalogueToStart])

  useEffect(() => {
    setReset(false)
  },[reset])

  useEffect(() => {
    setShowCatalogue(true)
  },[reRun])

  const ratingsArray = [
    {text:'1', number: 1},
    {text:'2', number: 2},
    {text:'3', number: 3},
    {text:'4', number: 4},
    {text:'5', number: 5},
    {text:'6', number: 6},
    {text:'7', number: 7},
    {text:'8', number: 8},
    {text:'9+', number: 9},
  ]

  
  const submitQuery = () => {
    if(document.getElementById('platforms').value !== 'Any'){
      setPlatform(document.getElementById('platforms').value)
    } 
    else 
      {setPlatform('')
    }

    if(document.getElementById('genres').value !== 'Any'){
      setGenre(document.getElementById('genres').value)
    }
    else {
      setGenre('')
    }

    if(document.getElementById('rating').value !== NaN){
      setRating(document.getElementById('rating').value * 10)
    }
    else {
      setRating('')
    }

    if(document.getElementById('stores').value !== 'Any'){
      setStore(document.getElementById('stores').value)
    }
    else {
      setStore('')
    }

    setSearch(document.getElementById('search').value)
  }

  const fetchLoadMoreGames = async () => {
    const url = allGamesNext
    const options = {
      method: "GET"
    }

    try {
      const response = await fetch(url, options)
      const result = await response.json()
      result.results.map((game) => {
        setAllGamesResults(prevState => [...prevState, game])
      })
      setAllGamesNext(result.next)
      return result
    } catch (err) {
      console.log(err)
    }  
  }

  const onEnterKey = (event) => {
    if (event.key == 'Enter') {
      submitQuery()
    }
  }

  const onResetButton = () => {
    document.getElementById('search').value = ''
    setPlatform('')
    setGenre('')
    setRating('')
    setStore('')
    setReset(true)
    submitQuery()
  }

  const passSelectedGame = (game) => {
    setSelectedGame(game.id)
    // console.log(`selectedGame is`,selectedGame)
    setShowCatalogue(false)
  }

  const catalogueToTrue = (boo) => {
    setShowCatalogue(boo)
  }

  // console.log(allGamesResults)
  // console.log(`search is`, search)
  // console.log(`platform is`, platform)
  // console.log(`genre is`, genre)
  // console.log(`rating is`, rating)
  // console.log(`store is`, store)
  // console.log(`show C is`,showCatalogue)

  if(showCatalogue)
  return (
    <div className='app__catalogue'>
    
      <h2>Browse games</h2>

      <div className='app__catalogue-filters'>
        <input type="text" id='search' className='app__catalogue-filters-search' placeholder=' search games...' onKeyDown={onEnterKey}/> 
        <form action="filters">

          <div className='app__catalogue-filters-top'>
            
            <div className='app__catalogue-filters-top-platforms'>
              <label for="platforms">Platform</label>
              <select name="platforms" id="platforms">
        
                <option value="Any">Any</option>

                {allPlatforms.map((platformMap) => {
                  if (platformMap.id == platform) {
                    return (
                    <option selected value={platformMap.id}>{platformMap.name}</option>
                    )
                  } 
                  return (                  
                    <option value={platformMap.id}>{platformMap.name}</option>
                  )
                })}
              </select>
            </div>

            <div className='app__catalogue-filters-top-genres'>
            <label for="genres">Genre</label>
            <select name="genres" id="genres">
              <option value="Any">Any</option>
              {allGenres.map((genreMap) => {
                if (genreMap.id == genre) {
                  return (
                  <option selected value={genreMap.id}>{genreMap.name}</option>
                  )
                } 
                return (                  
                  <option value={genreMap.id}>{genreMap.name}</option>
                )
              })}
            </select>
            </div>

            <div className='app__catalogue-filters-top-rating'>
            <label for="rating">Rating</label>
            <select name="rating" id="rating">
              <option value="Any">Any</option>
              {ratingsArray.map((ratingMap) => {
                if(ratingMap === rating){
                  return(
                    <option selected value={ratingMap.number}>{ratingMap.text}</option>
                    )
                }
                return (
                  <option value={ratingMap.number}>{ratingMap.text}</option>
                )
                
              })}
            </select>
            </div>


            <div className='app__catalogue-filters-top-stores'>
            <label for="stores">Store</label>
            <select name="stores" id="stores">
              <option value="Any">Any</option>
              {allStores.map((storeMap) => {
                if(storeMap.id == store) {
                  return (                
                    <option selected value={storeMap.id}>{storeMap.name}</option>
                  )
                }
                return (                
                  <option value={storeMap.id}>{storeMap.name}</option>
                )

              })}
            </select>
            </div>
          </div>

          <div className='app__catalogue-filters-bottom'>
            
            <button type='button' onClick={submitQuery}>Search</button>
            <input type="reset" onClick={onResetButton}/>
          </div>
        </form>
      </div>
      
      <div className='app__catalogue-content'>
        {allGamesResults.map((game) => {
          return(
            <Card parent='catalogue' passSelectedGame={passSelectedGame} image={game.background_image} name={game.name} id={game.id} released={game.released} rating={game.metacritic}/>
            )
        })}
      </div>

      <div className='app__catalogue-loadMore'>
        <button type='button' onClick={fetchLoadMoreGames}>Load more</button>
      </div>
    </div>
  )
  else {
    return (
      <Suggester catalogueToTrue={catalogueToTrue} clientId={clientId} gameId={selectedGame}/>
    )
  }
}

export default Catalogue
