import {React, useState} from 'react'
import './navbar.css'

const Navbar = ({onPageChange, onSuggesterChange, onCatalogueClick}) => {
    const [page, setPage] = useState('home')
    const [reRunIncrement, setReRunIncrement] = useState(0) 
    const [reRunIncrement2, setReRunIncrement2] = useState(0) 

    const handleChange = (event) => {
        const newState = event.target.innerHTML
        setPage(newState)

        onPageChange(newState)
    }

    const handleChangeSuggester = (event) => {
        const newState = event.target.value
        const num = 1

        setPage(newState)
        setReRunIncrement(prevState => prevState + num)

        onSuggesterChange(newState, reRunIncrement)
        // console.log(`navbar rerun is`, reRunIncrement)
    }

    const handleChangeSuggesterCatalogue = (event) => {
        const newState = event.target.innerHTML
        const num = 1

        setPage(newState)
        setReRunIncrement2(prevState => prevState + num)

        onCatalogueClick(newState, reRunIncrement2)
        // console.log(`navbar rerun is`, reRunIncrement)
    }

    return (
        <div className='app__navbar'>
            <h1>Video Game Suggester</h1>

            <div className='app__navbar-links'>
                <p><a href="#home" onClick={handleChange} className='app__navbar-links-a'>Home</a></p>
                <p><a href="#about" onClick={handleChange} className='app__navbar-links-a'>About</a></p>
                <p><a href="#catalogue" onClick={handleChangeSuggesterCatalogue} className='app__navbar-links-a'>Games Catalogue</a></p>
                <button onClick={handleChangeSuggester} value='Suggest A Game'>New Suggestion</button>
            </div>
        
        </div>
    )
}

export default Navbar
