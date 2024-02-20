import Button from '../Button/Button'
import './UserInput.scss'
import Slider from '../Slider/Slider'

function UserInput() {

    return(
        <section className='user-input'>
            <form>
                <div className='user-input__trip-info'>
                    <label htmlFor='tripDestination'/>
                    <input type='text' name='tripDestination' id='tripDestination' placeholder="Destination:" />
                </div>
                <div className='user-input__season-btn'>
                    <Button buttonText="Winter"/>
                    <Button buttonText="Spring"/>
                    <Button buttonText="Summer"/>
                    <Button buttonText="Fall"/>
                </div>
                <div className='user-input__trip-info'>
                    <label htmlFor='tripDuration'/>
                    <input type='text' name='tripDuration' id='tripDuration' placeholder="Duration:" />
                </div>
                <div>
                    <Slider/>
                </div>
            </form>
        </section>
    )
}

export default UserInput