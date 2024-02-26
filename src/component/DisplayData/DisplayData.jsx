import Card from "../Card/Card"
import './DisplayData.scss'
import Loading from "../Loading/Loading"

function DisplayData({ inputData }) {
  if (!inputData) return <Loading/>

  return (
    <section className="itinerary">
      <div className="itinerary__container">
        <h4 className="itinerary__row-heading">Day</h4>
        <h4 className="itinerary__row-heading">Destination</h4>
        <h4 className="itinerary__row-heading">Budget</h4>
        <h4 className="itinerary__row-heading">Description</h4>
      </div>
      <ul className='itinerary__list'>
        {inputData.itinerary.map((item) => {
          return (
            <Card
              key={item.id}
              day={item}
            /> 
          )
        })}
      </ul>
    </section>
  )
}

export default DisplayData