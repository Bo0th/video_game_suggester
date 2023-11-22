import {React, useState} from 'react'
import {Link} from 'react-router-dom'
import { TfiMenu } from "react-icons/tfi";
import './navbar.css'


const Navbar = ({onCatalogueClick}) => {
    const [displayMenu, setDisplayMenu] = useState(false)

    const handleChangeSuggesterCatalogue = () => {
        onCatalogueClick(1)
        setDisplayMenu(false)
    }

    return (
        <div className='app__navbar'>
            <h1>Video Game Suggester</h1>

            <div className='app__navbar-links'>
                <p><Link to="/" className='app__navbar-links-a'>Home</Link></p>
                <p><Link to="/AboutUs" className='app__navbar-links-a'>About</Link></p>
                <p><Link to="/Catalogue" onClick={handleChangeSuggesterCatalogue} className='app__navbar-links-a'>Games Catalogue</Link></p>
                <Link to='PlatformSelecter'><button onClick={handleChangeSuggesterCatalogue} value='Suggest A Game'>New Suggestion</button></Link>
            </div>
            
            <div id='app__navbar-smallscreenMenuIcon'>
                {!displayMenu && 
                    <Link to='PlatformSelecter'><button onClick={handleChangeSuggesterCatalogue} value='Suggest A Game'>New Suggestion</button></Link>
                }
                <TfiMenu className='menuIcon' onClick={() => {setDisplayMenu(!displayMenu)}}/>
            </div>

            
                {displayMenu && 
                    <div className='app__navbar-links-smallscreen'>                  
                        <p><Link to="/" className='app__navbar-links-a' onClick={() => {setDisplayMenu(false)}}>Home</Link></p>
                        <p><Link to="/AboutUs" className='app__navbar-links-a' onClick={() => {setDisplayMenu(false)}}>About</Link></p>
                        <p><Link to="/Catalogue" onClick={handleChangeSuggesterCatalogue} className='app__navbar-links-a' >Games Catalogue</Link></p>
                        <Link to='PlatformSelecter'><button onClick={handleChangeSuggesterCatalogue} value='Suggest A Game'>New Suggestion</button></Link>
                    </div>
                }
            
        
        </div>
    )
}

export default Navbar
