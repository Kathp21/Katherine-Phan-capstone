import Card from "../Card/Card";
import parseItinerary from "../ParseItinerary/ParseItinerary";
import './DisplayData.scss'

function DisplayData({ inputData}) {
    if (!inputData) return <div>Loading...</div>;

  const { itineraryData, costData } = parseItinerary(inputData);

  return (
    <div>
      <div className="itinerary">
        {itineraryData.map((item, index) => (
          <Card key={index} day={item.day} activities={item.activities}/>
        ))}
      </div>
      <div className="itinerary__cost-container">
        <div className="itinerary__cost">
          {costData.title && <h2>{costData.title}</h2>}
          <ul>
            {costData.details.map((detail, index) => (
              <li key={index}>{detail}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default DisplayData