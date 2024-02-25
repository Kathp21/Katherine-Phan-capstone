import './Card.scss'

function Card({ day }) {
    return (
      // <div className="card">
      //   <div className='card__container'>
      //     <h2>{day}</h2>
      //     <ul>
      //       {activities.map((activity, index) => (
      //         <li key={index}>{activity}</li>
      //       ))}
      //     </ul>
      //   </div>
      // </div>
    <div className="card">
      <h3>{day.day_string}</h3>
      <p>Destination: {day.destination}</p>
      <p>Duration: {day.duration} days</p>
      {day.budget && <p>Budget: ${day.budget}</p>}
      <p>Description: {day.description}</p>
    </div>
    );
  }

  export default Card