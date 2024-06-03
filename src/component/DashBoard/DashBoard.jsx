import { useState, useEffect } from "react";
import useAuth from "../contexts/AuthContext";
import { useNavigate } from 'react-router-dom';
import './DashBoard.scss';
import axios from "axios";
// import Card from "../Card/Card";

const Dashboard = () => {
    const [error, setError] = useState('');
    const { logout, isLoggedIn } = useAuth();
    const [userData, setUserData] = useState(null);
    // const [ itineraries, setItineraries ] = useState(null)
    const [ titles, setTitles ] = useState(null)
    
    const navigate = useNavigate();
    const { REACT_APP_API_BASE_PATH_USER } = process.env;

    useEffect(() => {
        // const fetchItineraries = async (token) => {
        //     try {
        //         const response = await axios.get(`${REACT_APP_API_BASE_PATH_USER}/current-user/itineraries`, {
        //             headers: {
        //                 Authorization: `Bearer ${token}`
        //             }
        //         });
        //         console.log(response.data)
        //         setItineraries(response.data) // Set the fetched itineraries data
        //     } catch (error) {
        //         console.error('Error fetching itineraries:', error)
        //         setError('Failed to fetch itineraries.')
        //     }
        // };

        const fetchItineraryTitle = async (token) => {
            try {
                const response = await axios.get(`${REACT_APP_API_BASE_PATH_USER}/current-user/itinerary-title`, {
                    headers: {
                        Authorization: `Bearer ${token}` // Include JWT token in the request headers
                    }
                })
                console.log(response.data)
                setTitles(response.data)
            } catch (error) {
                console.error('Error fetching titles:', error)
                setError('Failed to fetch titles.')
            }
        }

        const fetchUserData = async (token) => {
            try {
                const response = await axios.get(`${REACT_APP_API_BASE_PATH_USER}/current-user`, {
                    headers: {
                        Authorization: `Bearer ${token}` // Include JWT token in the request headers
                    }
                })
                console.log('Token:', token);
                console.log(response.data)
                setUserData(response.data); // Set the fetched user data
                // fetchItineraries(token)
                fetchItineraryTitle(token)
            } catch (error) {
                console.error('Error fetching user data:', error)
                setError('Failed to fetch user data.')
            }
        }

        if (!isLoggedIn) {
            navigate('/login')
        } else {
            const token = localStorage.getItem('authToken'); // Retrieve token from localStorage
            fetchUserData(token)
        }
    }, [isLoggedIn, navigate, REACT_APP_API_BASE_PATH_USER]); 

    // const handleTitleClick = async (recommendation_id) => {
    //     try {
    //         const token = localStorage.getItem('authToken');
    //         const response = await axios.get(`${REACT_APP_API_BASE_PATH_USER}/current-user/itinerary-details/${recommendation_id}`, {
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 'Authorization': `Bearer ${token}`
    //             }
    //         });
    //         setSelectedItinerary(response.data);
    //     } catch (error) {
    //         console.error('Error fetching itinerary details:', error);
    //         if (error.response) {
    //             console.error('Response data:', error.response.data);
    //             console.error('Response status:', error.response.status);
    //             console.error('Response headers:', error.response.headers);
    //         } else if (error.request) {
    //             console.error('Request data:', error.request);
    //         } else {
    //             console.error('Error message:', error.message);
    //         }
    //         setError('Failed to fetch itinerary details.');
    //     }
    // };
    
    const handleTitleClick = (recommendation_id) => {
        navigate(`/itinerary-details/${recommendation_id}`);
    }

    const handleLogout = async () => {
        setError('')

        try {
            await logout()
            navigate('/login')
        } catch {
            setError('Failed to log out');
        }
    };

    return (
        <section>
            <div className="dashboard-card">
                <div className="card-body">
                    {error && <div className="alert alert-danger">{error}</div>}
                    {userData && (
                        <div>
                            Welcome back <strong>{userData?.first_name}</strong>
                        </div>
                    )}
                    {/* <a href="/update-profile" className="btn btn-primary w-100 mt-3">
                        Update Profile
                    </a> */}
                    {titles && titles.length > 0 && (
                        <div>
                            <h3>Your Itineraries:</h3>
                            <ul>
                                {titles.map(title => (
                                    <li key={title.recommendation_id} onClick={() => handleTitleClick(title.recommendation_id)}>{title.title}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
            {/* {selectedItinerary && (
                <div>
                    <h4>Itinerary Details:</h4>
                    {selectedItinerary.map(day => (
                    <Card key={day.id} day={day} /> // Adjust key if necessary
                    ))}
                </div>
            )} */}
            <div className="w-100 text-center mt-2">
                <button className="btn btn-link" onClick={handleLogout}>
                    Log Out
                </button>
            </div>
        </section>
    );
};

export default Dashboard