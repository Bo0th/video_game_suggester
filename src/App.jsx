import {React, useState, useEffect} from 'react'
import './app.css'
import { Navbar, Home, AboutUs, Catalogue, Suggester, PlatformSelecter } from './components'

const clientId = 'd6ea8185a00440b7bc9838ee18665d59'

const App = () => {
  const [page, setPage] = useState('Home')
  const [reRunIncrement, setReRunIncrement] = useState(0) 
  const [reRunIncrement2, setReRunIncrement2] = useState(0) 

  const handlePageStateChange = (newState) => {
    setPage(newState)
  }

  const handleSuggesterChange = (newState, num) => {
    setPage(newState)
    setReRunIncrement(prevState => prevState + num)
    // console.log(`app rerun is`, reRunIncrement)
  }

  const onCatalogueClick = (newState, num) => {
    setPage(newState)
    setReRunIncrement2(prevState => prevState + num)
  }

  // console.log(page)

  return (
    <div className='app'>
      <Navbar onPageChange={handlePageStateChange} onSuggesterChange={handleSuggesterChange} onCatalogueClick={onCatalogueClick}/>
      
    
        {page === 'Home' ? <Home onPageChange={handlePageStateChange}/> : ''}
        {page === 'About' ? <AboutUs /> : ''}
        {page === 'Games Catalogue' ? <Catalogue reRun2={reRunIncrement2} clientId={clientId}/> : ''}
        {page === 'Suggest A Game' ? <PlatformSelecter reRun={reRunIncrement} clientId={clientId}/> : ''}
   


    </div>
  )
}

export default App
