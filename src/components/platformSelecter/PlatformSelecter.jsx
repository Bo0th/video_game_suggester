import {React, useState, useEffect} from 'react'
import Card from '../card/Card'
import Suggester from '../suggester/Suggester'
import './platformSelecter.css'

const PlatformSelecter = ({reRun, clientId}) => {
    const [platformArray, setPlatformArray] = useState([])
    const [parentPlatformArray, setParentPlatformArray] = useState([])
    const [selectedPlatformArray, setSelectedPlatformArray] = useState([])
    const [parentPlatform, setParentPlatform] = useState('')
    const [platform, setPlatform] = useState('')
    const [platformId, setPlatformId] = useState (0)

    useEffect(() => {
        const fetchAllPlatforms = async () => {
            const url = `https://api.rawg.io/api/platforms?key=${clientId}`
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

        const resetStates = () => {
            setPlatformArray([])
            setParentPlatformArray([])
            setSelectedPlatformArray([])
            setParentPlatform('')
            setPlatform('')
            setPlatformId(0)
        }

        const fetchParentPlatforms = async () => {
            const url = `https://api.rawg.io/api/platforms/lists/parents?key=${clientId}`
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
            const tempPlatforms = await fetchAllPlatforms()
            const tempParentPlatforms = await fetchParentPlatforms()
            setPlatformArray(tempPlatforms.results)
            setParentPlatformArray(tempParentPlatforms.results)
        }
        
        resetStates()
        fetchAll()
    }, [])

    useEffect(() => {
        for(let i = 0; i<parentPlatformArray.length;i++){
            if(parentPlatformArray[i].name == parentPlatform){
                setSelectedPlatformArray(parentPlatformArray[i].platforms)
            }
        }

        for(let i = 0; i<platformArray.length;i++){
            if(platformArray[i].name == platform){
                setPlatformId(platformArray[i].id)
            }
        }
    })

    const selectedParentPlatform = (parentPlatform) => {
        setParentPlatform(parentPlatform.name)
        // console.log(`parentPlatform is`,parentPlatform)
    }

    const selectedPlatform = (platform) => {
        setPlatform(platform.name)
    }

    // console.log(`parentPlatformArray is`, parentPlatformArray)
    // console.log(`parentPlatform is`, parentPlatform)
    // console.log(`platform rerun is`, reRun)
    // console.log(`selectedPlatformArray is`, selectedPlatformArray)
    // console.log(`platform is`, platform)
    // console.log(`platformID is`, platformId)
    // console.log(`platformA is`, platformArray)

    
    if(selectedPlatformArray.length === 0){
        return (
        <div className='app__platformSelecter'>
            <h1>Which platform will you be playing on?</h1>
            <div className='app__platformSelecter-platforms'>
                {parentPlatformArray.map((platform) => {
                    return (
                        <Card parent='parentPlatformSelecter' parentPlatformSelecter={selectedParentPlatform} name={platform.name} image={platform.image_background}/>
                    )
                })}
            </div>
        </div>
    )}
    else if(selectedPlatformArray.length > 0 && platformId === 0){
        return (    
            <div className='app__platformSelecter'>
                <h1>Which platform will you be playing on?</h1>
                <div className='app__platformSelecter-platforms'>
                    {selectedPlatformArray.map((platform) => {
                        return (
                            <Card parent='platformSelecter'  platformSelecter={selectedPlatform} name={platform.name} image={platform.image_background}/>
                        )
                    })}
                </div>
            </div>
        )
    }
    else {
        return (
            <Suggester reRun={reRun} clientId={clientId} platformId={platformId}/>
        )
    }
}

export default PlatformSelecter
