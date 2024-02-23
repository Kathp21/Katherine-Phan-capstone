import Button from '../Button/Button'
import './UserInput.scss'
import Slider from '../Slider/Slider'
import axios from 'axios'
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

function UserInput(props) {

    // const { REACT_APP_API_BASE_PATH } = process.env
    const formRef = useRef()
    // const [ input, setInput ] = useState([])
    const [ selectedSeason, setSelectedSeason] = useState([])
    const [ selectedInterests, setSelectedInterests ] = useState([])
    const [ sliderValue, setSliderValue ] = useState(0)
    const navigate = useNavigate();
    const [isActive, setIsActive] = useState(true)

    const seasons = ['Spring', 'Summer', 'Fall', 'Winter']

    const handleSeasonClick = (season) => {
        if (selectedSeason.includes(season)) {
            setSelectedSeason(selectedSeason.filter(indSeason => indSeason !== season))
        } else {
            return setSelectedSeason([...selectedSeason, season])
        }
    }

    const interests = ['Cusine', 'Adventures', 'Nature', 'culture']

    const handleInterestClick = (interest) => {
        if (selectedInterests.includes(interest)) {
            setSelectedInterests(selectedInterests.filter(indInterest => indInterest === interest))
        } else {
            return setSelectedInterests([...selectedInterests, interest])
        }
    };
    
    const handleSliderChange = (newValue) => {
        setSliderValue(newValue);
    };

    const handleFormSubmit = (e) => {
        e.preventDefault()
        navigate('/recommendations')
        setIsActive(false)

        addUserInput(e)
    }

    const addUserInput = async (e) => {
        e.preventDefault()

        const userInput = {
            destination: formRef.current.tripDestination.value,
            season: selectedSeason,
            duration: formRef.current.tripDuration.value,
            budget: sliderValue,
            interests: selectedInterests,
            additionalInfo: formRef.current.additionalInfo.value
        }

        // try {
        //     const url = `${REACT_APP_API_BASE_PATH}/api/chat-completion`
        //     let newInput = await axios.post(url, userInput)
        //     setInput([...input, newInput.data])
        //     console.log(newInput.data)
        // } catch(error) {
        //     console.error(error)
        // }

        props.onAddUserInput(userInput)
    }

    return(
        <section className='user-input'>
            <form onSubmit={addUserInput} ref={formRef} className='user-input__container'>
                <div className='user-input__trip-info'>
                    <label htmlFor='tripDestination'/>
                    <input type='text' name='tripDestination' id='tripDestination' placeholder="Destination:" action="" />
                </div>
                <section className='user-input__options-container'>
                    <div className='user-input__options-btn'>
                        {seasons.map((season) => (
                            <Button 
                                key={season}
                                onClick={() => handleSeasonClick(season)}
                                label={season}
                                variant={`${selectedSeason.includes(season) ? 'selected' : 'not-selected'}`}
                            >
                            </Button>
                        ))}
                    </div>
                </section>
                <div className='user-input__trip-info'>
                    <label htmlFor='tripDuration'/>
                    <input type='text' name='tripDuration' id='tripDuration' placeholder="Duration:" />
                </div>
                <div className='user-input__budget-container'>
                    <div className='user-input__budget'>
                        <Slider value={sliderValue} onChange={handleSliderChange}/>
                    </div>
                </div>
                <section className='user-input__options-container'>
                    <div className='user-input__options-btn'>
                        {interests.map((interest) => (
                            <Button key={interest}
                                onClick={() => handleInterestClick(interest)}
                                label={interest}
                                variant={`${selectedInterests.includes(interest) ? 'selected' : 'not-selected'}`}
                            >
                            </Button>
                        ))}
                    </div>
                </section>
                <div className='user-input__trip-info'>
                    <label htmlFor='additionalInfo'/>
                    <input type='text' name='additionalInfo' id='additionalInfo' placeholder="Additional information:" />
                </div>
            </form>
            <div className='user-input__suggestions'>
                <Button onClick={handleFormSubmit} buttonText="Recommendations" variant="button__suggestions"/>
            </div>
        </section>
    )
}

export default UserInput