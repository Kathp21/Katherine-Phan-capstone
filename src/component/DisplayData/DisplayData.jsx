import Card from "../Card/Card"
import './DisplayData.scss'
import Loading from "../Loading/Loading"
import Login from '../Login/Login'
import Register from "../Register /Register"

function DisplayData({ inputData, isFirstLoad }) {
  if (!inputData && isFirstLoad) return <Loading text="PLEASE SUBMIT INFO"/>

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
              key={item.day_string}
              day={item}
            /> 
          )
        })}
      </ul>
      <p>Want to save your travel itinerary?</p>
      <Register/>
    </section>
  )
}

export default DisplayData