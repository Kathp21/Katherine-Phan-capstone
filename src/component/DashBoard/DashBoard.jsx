import { useState, useEffect } from "react";
import useAuth from "../contexts/AuthContext";
import { useNavigate } from 'react-router-dom';
import './DashBoard.scss';
import axios from "axios";
import Button from "../Button/Button";
import IconWithNumber from "../IconWithNumber/IconWithNumber";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faPenToSquare, faSave, faPen} from '@fortawesome/free-solid-svg-icons'


const Dashboard = () => {
    const [ error, setError ] = useState('')
    const [ userData, setUserData ] = useState(null)
    const [ titles, setTitles ] = useState(null)
    const [ showCheckboxes, setShowCheckboxes ] = useState(false)
    const [ showEditTitleIcon, setShowEditTitleIcon ] = useState(false)
    const [ selectedItineraries, setSelectedItineraries ] = useState([])
    const [ newTitle, setNewTitle ] = useState('')
    const [ editMode, setEditMode ] = useState(null)

    const { logout, isLoggedIn } = useAuth()
    const navigate = useNavigate()
    const { REACT_APP_API_BASE_PATH } = process.env

    useEffect(() => {

        const fetchItineraryTitle = async (token) => {
            try {
                const response = await axios.get(`${REACT_APP_API_BASE_PATH}/api/users/itinerary-title`, {
                    headers: {
                        Authorization: `Bearer ${token}` // Include JWT token in the request headers
                    }
                })
                setTitles(response.data)
            } catch (error) {
                console.error('Error fetching titles:', error)
            } 
        }

        const fetchUserData = async (token) => {
            try {
                const response = await axios.get(`${REACT_APP_API_BASE_PATH}/api/users/current-user`, {
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
    }, [isLoggedIn, navigate, REACT_APP_API_BASE_PATH]); 
    
    const handleTitleClick = (recommendation_id) => {
        navigate(`/${recommendation_id}`);
    }

    const handleEditIcon = (event) => {
        event.preventDefault()
        setShowCheckboxes(prevShowCheckboxes => !prevShowCheckboxes)
        setShowEditTitleIcon(prevShowEditTitleIcon => !prevShowEditTitleIcon)
    }

    const handleEditTitle = (recommendation_id, currentTitle) => {
        setEditMode(recommendation_id)
        setNewTitle(currentTitle)
    }

    const handleSaveIcon = async (recommendation_id) => {
        try {
            const token = localStorage.getItem('authToken')
            await axios.put(`${REACT_APP_API_BASE_PATH}/api/itineraries/${recommendation_id}`,
            { title : newTitle},
            {
                headers: {
                    Authorization: `Bearer ${token}` // Include JWT token in the request headers
                }
            })

            setTitles(titles.map(title => 
                title.recommendation_id === recommendation_id ? {...title, title: newTitle} : title
            ))

            setEditMode(null)
            setNewTitle('')
        } catch (error) {
            console.error('Error updating title:', error);
            setError('Failed to update title.');
        }
    }

    const handleTrashCanClick = async (event) => {
        event.preventDefault()
        if(showCheckboxes) {
            await handleDelete()
        }
    }

    const handleCheckboxChange = ( recommendation_id) => {
        setSelectedItineraries(prevSelected => {
            if (prevSelected.includes(recommendation_id)) {
                return prevSelected.filter(id => id !== recommendation_id)
            } else {
                return [...prevSelected, recommendation_id]
            }
        })
    }

    const handleDelete = async () => {
        try {
            const token = localStorage.getItem('authToken')
            
            //Iterate over selectedItineraies and send a delete request for each 
            const deleteRequests = selectedItineraries.map(recommendation_id =>
                axios.delete(`${REACT_APP_API_BASE_PATH}/api/itineraries/${recommendation_id}`, {
                    headers: {
                        Authorization: `Bearer ${token}` // Include JWT token in the request headers
                    }
                })
            )

            //Wait for all delete requests to complete 
            await Promise.all(deleteRequests)
            
            //Remove the deleted itineraries from the state 
            setTitles(prevTitles =>  prevTitles.filter(title => 
                !selectedItineraries.includes(title.recommendation_id)))

            //Clear the selected items
            setSelectedItineraries([])
        } catch (error) {
            console.error('Error deleting itineraries:', error)
            setError('Failed to delete itineraries.')
        }
    }

    const handleLogout = async (event) => {
        event.preventDefault()
        setError('')

        try {
            await logout()
            navigate('/login')
        } catch {
            setError('Failed to log out');
        }
    }

    return (
        <section className="dashboard">
            <div className="dashboard__card">
                <div className="dashboard__card-body">
                    {error && <div className="dashboard__alert dashboard__alert--danger">{error}</div>}
                    {userData ? (
                        <div className="dashboard__username">
                            Welcome back {userData?.first_name}!
                        </div>
                    ) : (
                        <div className="dashboard__username-placeholder">
                            &nbsp;
                        </div>
                    )}

                    {titles ? (

                        titles.length > 0 ? (
                            <div>
                                <div className="dashboard__header-container">
                                    <h3>Your Itineraries:</h3>
                                    <div className="dashboard__icon-container">
                                        {showCheckboxes && (
                                            <FontAwesomeIcon 
                                                icon = {faTrashCan}
                                                onClick={handleTrashCanClick}
                                                className="dashboard__icon"
                                            />
                                        )}
                                        <FontAwesomeIcon 
                                            icon={faPenToSquare} 
                                            onClick={handleEditIcon}
                                            className="dashboard__icon"
                                        />

                                    </div>
                                </div>
                                <div className="dashboard__list-container">
                                    <ol type="1" className="dashboard__itinerary-list">
                                        {titles.map((title, index) => (
                                            <label className="dashboard__items" 
                                                key={title.recommendation_id}>
                                                {showCheckboxes && (
                                                
                                                        <input
                                                            type="checkbox"
                                                            className="dashboard__checkbox"
                                                            onChange={() => handleCheckboxChange(title.recommendation_id)}
                                                            checked={selectedItineraries.includes(title.recommendation_id)}
                                                        />

                                                    )}
                                                <IconWithNumber number={index + 1}/>
                                                {/* <div className="dashboard__item-content" onClick={() => handleTitleClick(title.recommendation_id)}>
                                                    <strong>{title.title}</strong>
                                                </div> */}
                                                {editMode === title.recommendation_id ? (
                                                <div className="dashboard__item-content">
                                                    <div className="dashboard__item-input-container">
                                                        <input 
                                                            type="text" 
                                                            value={newTitle} 
                                                            onChange={(e) => setNewTitle(e.target.value)} 
                                                            className="dashboard__input"
                                                        />
                                                        <FontAwesomeIcon 
                                                            icon={faSave} 
                                                            onClick={() => handleSaveIcon(title.recommendation_id)} 
                                                            className="dashboard__icon" 
                                                        />
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="dashboard__item-content">
                                                    <div className="dashboard__item-input-container">
                                                        <strong onClick={() => handleTitleClick(title.recommendation_id)}>{title.title}</strong>
                                                        {showEditTitleIcon && (
                                                            <FontAwesomeIcon 
                                                            icon={faPen} 
                                                            onClick={() => handleEditTitle(title.recommendation_id, title.title)} 
                                                            className="dashboard__icon" 
                                                            />
                                                        )}

                                                    </div>

                                                </div>
                                            )}
                                            </label>
                                        ))}
                                    </ol>
                                </div>
                            </div>
                    ) : (
                        <div>
                            <h3>Your Itineraries:</h3>
                            <p>No itineraries saved in your account.</p>
                        </div>
                    )
                    ) : (
                        <div className="dashboard__itineraries-placeholder">
                            &nbsp;
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
    )
}

export default Dashboard