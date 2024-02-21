import Button from '../Button/Button'
import './UserInput.scss'
import Slider from '../Slider/Slider'

function UserInput() {

    return(
        <section className='user-input'>
            <form className='user-input__container'>
                <div className='user-input__trip-info'>
                    <label htmlFor='tripDestination'/>
                    <input type='text' name='tripDestination' id='tripDestination' placeholder="Destination:" />
                </div>
                <section className='user-input__season-container'>
                    <div className='user-input__season-btn'>
                        <Button buttonText="Winter"/>
                        <Button buttonText="Spring"/>
                        <Button buttonText="Summer"/>
                        <Button buttonText="Fall"/>
                    </div>
                </section>
                <div className='user-input__trip-info'>
                    <label htmlFor='tripDuration'/>
                    <input type='text' name='tripDuration' id='tripDuration' placeholder="Duration:" />
                </div>
                <div className='user-input__budget-container'>
                    <div className='user-input__budget'>
                        <Slider/>
                    </div>
                </div>
            </form>
            <div className='user-input__suggestions'>
                <Button buttonText="Recommendations" variant="button__suggestions"/>
            </div>
        </section>
    )
}

export default UserInput