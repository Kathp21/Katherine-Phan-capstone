function Card({ day, activities }) {
    return (
      <div className="card">
        <h2>{day}</h2>
        <ul>
          {activities.map((activity, index) => (
            <li key={index}>{activity}</li>
          ))}
        </ul>
      </div>
    );
  }

  export default Card