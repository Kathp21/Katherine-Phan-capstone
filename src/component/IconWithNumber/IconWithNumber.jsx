import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapMarker } from '@fortawesome/free-solid-svg-icons'
import './IconWithNumber.scss'

const IconWithNumber = ({ number }) => {
    return (
        <section className='icon-with-number'>
            <FontAwesomeIcon icon={faMapMarker} className='icon-with-number__icon'/>
            <span className='icon-with-number__number'>{number}</span>
        </section>
    )
}

export default IconWithNumber