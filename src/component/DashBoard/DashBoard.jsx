import { useState, useEffect } from "react";
import useAuth from "../contexts/AuthContext";
import { useNavigate } from 'react-router-dom';
import './DashBoard.scss';
import axios from "axios";
import Button from "../Button/Button";
import IconWithNumber from "../IconWithNumber/IconWithNumber";


const Dashboard = () => {
    const [error, setError] = useState('')
    const [userData, setUserData] = useState(null)
    const [ titles, setTitles ] = useState(null)

    const { logout, isLoggedIn } = useAuth()
    const navigate = useNavigate()
    const { REACT_APP_API_BASE_PATH_USER } = process.env

    useEffect(() => {
        const fetchItineraryTitle = async (token) => {
            try {
                const response = await axios.get(`${REACT_APP_API_BASE_PATH_USER}/itinerary-title`, {
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

                setUserData(response.data); // Set the fetched user data
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
        <section className="dashboard">
            <div className="dashboard__card">
                <div className="dashboard__card-body">
                    {error && <div className="dashboard__alert dashboard__alert--danger">{error}</div>}
                    {userData && (
                        <div className="dashboard__username">
                            Welcome back {userData?.first_name}!
                        </div>
                    )}
                    
                    {titles && titles.length > 0 && (
                        <div>
                            <h3>Your Itineraries:</h3>
                            <div className="dashboard__list-container">
                                <ol type="1" className="dashboard__itinerary-list">
                                    {titles.map((title, index) => (
                                        <li className="dashboard__items" 
                                            key={title.recommendation_id} 
                                            onClick={() => handleTitleClick(title.recommendation_id)}>
                                            <IconWithNumber number={index + 1}/>
                                            <div className="dashboard__item-content">
                                                <strong>{title.title}</strong>
                                            </div>
                                        </li>
                                    ))}
                                </ol>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <div className="dashboard__button-container">
                <Button
                    buttonText="Log Out" 
                    variant="button__log-out button__log-out--link" 
                    type='submit' 
                    onClick={handleLogout}
                />
            </div>
        </section>
    );
};

export default Dashboard