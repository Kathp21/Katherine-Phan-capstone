import { useState } from "react";
import useAuth from "../contexts/AuthContext";
import { useNavigate } from 'react-router-dom';
import './DashBoard.scss';

export default function Dashboard() {
    const [ error, setError ] = useState('')
    const { currentUser, logout } = useAuth()
    const navigate = useNavigate()

    async function handleLogout() {
        setError('')

        try {
            await logout()
            // history.push('/login')
            navigate('/login')
        } catch {
            setError("Failed to log in")
        }
    }

    return (
        <section>
            <div className="dashboard-card">
                <div className="card-body">
                    <h2 className="text-center mb-4">Profile</h2>
                    {error && <div className="alert alert-danger">{error}</div>}
                    <strong>Email:</strong> {currentUser?.email}
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
    )
}
