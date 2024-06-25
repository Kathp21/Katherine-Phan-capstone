import { useNavigate } from 'react-router-dom'
import heroImage from '../../assets/images/hero.png'
import Button from '../Button/Button'
import './AboutUs.scss'

const AboutUs = () => {

    const navigate = useNavigate()

    const handleStartButton = () => {
        navigate('/user-input')
    }

    return (
        <section className='about-us'>
            <div className='about-us__image-container'>
                <img src={heroImage} alt='hero'/>
            </div>

            <div className='about-us__text-button-container'>
                <div className='about-us__text-container'>
                    <h1>Let trip crafters help plan your travel</h1>
                    <p>
                        We use AI and Machine Learning to tailor an itinerary based on your interests.
                    </p>
                </div>
                <Button
                    onClick={handleStartButton}
                    type="submit"
                    buttonText='Get started'
                    variant='button__get-start'
                />
            </div>


        </section>
    )
}

export default AboutUs