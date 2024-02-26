import './Card.scss'

function Card({ day }) {
    return (
      <section className='card'>
        <div className='card__container'>
          <p className="card__day">{day.day_string}</p> 
          <section className='card__items-container'>
            <div className='card__space'>
              <h4 className='card__title'>Destination</h4>
              <p className="card__item">{day.location}</p> 
            </div>
            <div className='card__space'>
              <h4 className='card__title'>Budget</h4>
              <p className="card__item">{day.budget}</p> 
            </div>
          </section>
          <h4 className='card__title'>Description</h4>
          <p className="card__item">{day.description}</p> 
        </div>
      </section>
    )
  }

  export default Card