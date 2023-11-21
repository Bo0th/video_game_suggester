import {React} from 'react'
import {Link} from 'react-router-dom'
import './navbar.css'


const Navbar = ({onCatalogueClick}) => {

    const handleChangeSuggesterCatalogue = () => {
        onCatalogueClick(1)
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
        
        </div>
    )
}

export default Navbar
