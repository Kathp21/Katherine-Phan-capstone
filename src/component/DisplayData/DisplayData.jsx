import Card from "../Card/Card";
import parseItinerary from "../ParseItinerary/ParseItinerary";

function DisplayData({ inputData}) {
    if (!inputData) return <div>Loading...</div>;

    const itineraryData = parseItinerary(inputData);
  
    return (
      <div className="itinerary">
        {itineraryData.map((item, index) => (
          <Card key={index} day={item.day} activities={item.activities} />
        ))}
      </div>
    );
  }

  export default DisplayData