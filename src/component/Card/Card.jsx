import './Card.scss'

function Card({ day, activities }) {
    return (
      <div className="card">
        <div className='card__container'>
          <h2>{day}</h2>
          <ul>
            {activities.map((activity, index) => (
              <li key={index}>{activity}</li>
            ))}
          </ul>
        </div>
      </div>
    );
  }

  export default Card