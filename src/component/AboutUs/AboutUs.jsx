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
                    <h1>Let's trip crafters helps plan your travel</h1>
                    <p>Whether you're planning a weekend getaway or a month-long adventure, we deliver tailor-made travel recommendations
                        that align perfectly with your preferences. Just tell us your destination, the season you wish to travel, your budget, and what you 
                        love to do, and we'll craft a unique itinerary that fits your needs. Discover the joy of travel that is truly yours with 
                        Trip Crafters - where your journey begins with us 
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