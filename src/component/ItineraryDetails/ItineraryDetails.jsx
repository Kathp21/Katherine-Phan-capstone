import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Card from "../Card/Card";
import './ItineraryDetails.scss';

const ItineraryDetails = () => {
    const { recommendation_id } = useParams();
    const [itineraryDetails, setItineraryDetails] = useState([]);
    const [error, setError] = useState('');
    const { REACT_APP_API_BASE_PATH_USER } = process.env;

    const navigate = useNavigate()

    useEffect(() => {
        const fetchItineraryDetails = async () => {
            try {
                const token = localStorage.getItem('authToken');
                const response = await axios.get(`${REACT_APP_API_BASE_PATH_USER}/itinerary-details/${recommendation_id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                setItineraryDetails(response.data)

            } catch (error) {
                console.error('Error fetching itinerary details:', error)
                setError('Failed to fetch itinerary details.')
            }
        }

        fetchItineraryDetails()
    }, [recommendation_id, REACT_APP_API_BASE_PATH_USER])

    const handleBackButton = () => {
        navigate('/dashboard')
    }

    return (
        <main>
            <h2 className="itinerary-details__headline">Itinerary Details</h2>
            <section className="itinerary-details">
                <div className="itinerary-details__container">
                    <h4 className="itinerary-details__row-heading">Day</h4>
                    <h4 className="itinerary-details__row-heading">Destination</h4>
                    <h4 className="itinerary-details__row-heading">Budget</h4>
                    <h4 className="itinerary-details__row-heading">Description</h4>
                </div>
                <div>
                    {error && <div className="alert alert-danger">{error}</div>}
                    {itineraryDetails.map(day => (
                        <Card key={day.itinerary_id} day={day} />
                    ))}  
                </div>
                <div className="itinerary-details__button">
                    <button onClick={handleBackButton}>Back</button>
                </div>
            </section>
        </main>
    );
};

export default ItineraryDetails;
