import { useState, useEffect } from "react";
import useAuth from "../contexts/AuthContext";
import { useNavigate } from 'react-router-dom';
import './DashBoard.scss';
import axios from "axios";

// export default function Dashboard() {
//     const [ error, setError ] = useState('')
//     const { user , logout, isLoggedIn } = useAuth()
//     const [userData, setUserData] = useState(null);
//     const navigate = useNavigate()
//     const { REACT_APP_API_BASE_PATH_USER } = process.env

//     useEffect(() => {
//        if(!isLoggedIn) {
//         navigate('/login')
//        } else{
//         const token = localStorage.getItem('token') // Retrieve token from localStorage
//         fetchUserData(token);
//        }
//     }, [isLoggedIn, fetchUserData, navigate]); // Empty dependency array to fetch data once on mount

//     const fetchUserData = async (token) => {
//         try {
//             // Make API call to fetch user data from backend
//             const response = await axios.get(`${REACT_APP_API_BASE_PATH_USER}/current-user`, {
//                 headers: {
//                     Authorization: `Bearer ${token}` // Include JWT token in the request headers
//                 }
//             }); 
            
//             const userData = response.data; // Assuming response contains user data
            
//             console.log(userData);
//             setUserData(userData)
//         } catch (error) {
//             console.error('Error fetching user data:', error);
//             setError('Failed to fetch user data.');
//         }
//     }

//     // useEffect(() => {
//     //     // Fetch user data when the Dashboard component mounts
//     //     fetchUserData();
//     // }, []); // Empty dependency array to fetch data once on mount


//     async function handleLogout() {
//         setError('')

//         try {
//             await logout()
//             // history.push('/login')
//             navigate('/login')
//         } catch {
//             setError("Failed to log in")
//         }
//     }

//     return (
//         <section>
//             <div className="dashboard-card">
//                 <div className="card-body">
//                     <h2 className="text-center mb-4">Profile</h2>
//                     {error && <div className="alert alert-danger">{error}</div>}
//                     <strong>Email:</strong> {user?.email}
//                     <a href="/update-profile" className="btn btn-primary w-100 mt-3">
//                     Update Profile
//                     </a>
//                 </div>
//                 </div>
//                 <div className="w-100 text-center mt-2">
//                 <button className="btn btn-link" onClick={handleLogout}>
//                     Log Out
//                 </button>
//             </div>
//         </section>
//     )
// }

const Dashboard = () => {
    const [error, setError] = useState('');
    const { user, logout, isLoggedIn } = useAuth();
    const [userData, setUserData] = useState(null);
    const navigate = useNavigate();
    const { REACT_APP_API_BASE_PATH_USER } = process.env;

    useEffect(() => {
        const fetchUserData = async (token) => {
            try {
                const response = await axios.get(`${REACT_APP_API_BASE_PATH_USER}/current-user`, {
                    headers: {
                        Authorization: `Bearer ${token}` // Include JWT token in the request headers
                    }
                });
                setUserData(response.data); // Set the fetched user data
            } catch (error) {
                console.error('Error fetching user data:', error);
                setError('Failed to fetch user data.');
            }
        };

        if (!isLoggedIn) {
            navigate('/login');
        } else {
            const token = localStorage.getItem('authToken'); // Retrieve token from localStorage
            fetchUserData(token);
        }
    }, [isLoggedIn, navigate, REACT_APP_API_BASE_PATH_USER]); // Include dependencies in the dependency array

    const handleLogout = async () => {
        setError('');

        try {
            await logout();
            navigate('/login');
        } catch {
            setError('Failed to log out');
        }
    };

    return (
        <section>
            <div className="dashboard-card">
                <div className="card-body">
                    <h2 className="text-center mb-4">Profile</h2>
                    {error && <div className="alert alert-danger">{error}</div>}
                    {userData && (
                        <div>
                            <strong>Email:</strong> {user?.email}
                            {/* Display other userData properties as needed */}
                        </div>
                    )}
                    <a href="/update-profile" className="btn btn-primary w-100 mt-3">
                        Update Profile
                    </a>
                </div>
            </div>
            <div className="w-100 text-center mt-2">
                <button className="btn btn-link" onClick={handleLogout}>
                    Log Out
                </button>
            </div>
        </section>
    );
};

export default Dashboard