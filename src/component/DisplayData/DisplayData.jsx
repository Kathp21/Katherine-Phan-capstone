import Card from "../Card/Card";
import './DisplayData.scss'

function DisplayData({ inputData }) {
  if (!inputData) return <div>Loading...</div>;

  return (
    <div className="itinerary">
      <div className="itinerary__info">
        {inputData.itinerary.map((item, index) => (
          <Card key={index} day={item}/>
        ))}
      </div>
      {/* <div className="itinerary__cost-container">
        <div className="itinerary__cost">
          {item.budget && <h2>{item.budget}</h2>}
          <ul>
            {costData.details.map((detail, index) => (
              <li key={index}>{detail}</li>
            ))}
          </ul>
        </div>
      </div> */}
    </div>
  );
}

export default DisplayData