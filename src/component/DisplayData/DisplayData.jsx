import Card from "../Card/Card"
import './DisplayData.scss'
import Loading from "../Loading/Loading"
import RegisterSaveItinerary from "../RegisterSaveItinerary/RegisterSaveItinerary"
import React, { useState, useEffect } from 'react'

function DisplayData({ inputData, isFirstLoad }) {

  const [newItineraryGenerated, setNewItineraryGenerated ] = useState(false)

  useEffect(() => {
    if(inputData) {
      console.log("New itinerary generated");
      setNewItineraryGenerated(true)

      setTimeout(() => {
        setNewItineraryGenerated(false)
        localStorage.setItem('newItineraryGenerated', 'false')
        console.log("Reset newItineraryGenerated flag");
      }, 100)
    }
  }, [inputData])

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
      <RegisterSaveItinerary itineraryData={inputData} newItineraryGenerated={newItineraryGenerated}/>
    </section>
  )
}

export default DisplayData