import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Card from "../Card/Card";

const ItineraryDetails = () => {
    const { recommendation_id } = useParams();
    const [itineraryDetails, setItineraryDetails] = useState([]);
    const [error, setError] = useState('');
    const { REACT_APP_API_BASE_PATH_USER } = process.env;

    useEffect(() => {
        const fetchItineraryDetails = async () => {
            try {
                const token = localStorage.getItem('authToken');
                const response = await axios.get(`${REACT_APP_API_BASE_PATH_USER}/current-user/itinerary-details/${recommendation_id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setItineraryDetails(response.data);
            } catch (error) {
                console.error('Error fetching itinerary details:', error);
                setError('Failed to fetch itinerary details.');
            }
        };

        fetchItineraryDetails();
    }, [recommendation_id, REACT_APP_API_BASE_PATH_USER]);

    return (
        <div>
            <h2>Itinerary Details</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            {itineraryDetails.map(day => (
                <Card key={day.id} day={day} />
            ))}
        </div>
    );
};

export default ItineraryDetails;
