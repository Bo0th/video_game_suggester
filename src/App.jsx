import {React, useState, useEffect} from 'react'
import './app.css'
import { Navbar, Home, AboutUs, Catalogue, Suggester, PlatformSelecter } from './components'
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'

const clientId = 'd6ea8185a00440b7bc9838ee18665d59'

const App = () => {
  const [reRunIncrement, setReRunIncrement] = useState(0) 

  const onCatalogueClick = (num) => {
    setReRunIncrement(prevState => prevState + num)
  }

  return (
    <Router>
      <div className='app'>
      
        <Navbar onCatalogueClick={onCatalogueClick}/>
        
        <Switch>
          <Route exact path='/'>
            <Home />
          </Route>
          <Route path='/AboutUs'>
            <AboutUs />
          </Route>
          <Route path='/Catalogue'>
            <Catalogue  reRun={reRunIncrement} clientId={clientId} />
          </Route>
          <Route path='/PlatformSelecter'>
            <PlatformSelecter  reRun={reRunIncrement} clientId={clientId} />
          </Route>    
        </Switch>

      </div>
    </Router>
  )
}

export default App
