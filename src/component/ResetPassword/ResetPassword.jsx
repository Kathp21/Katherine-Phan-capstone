import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ResetPassword.scss'
import Button from '../Button/Button';

const ResetPassword = () => {
    const [ password, setPassword ] = useState('')
    const [ confirmPassword, setConfirmPassword ] = useState('')
    const [ message, setMessage ] = useState('')
    const [loading, setLoading] = useState(true);


    const navigate = useNavigate()
    const location = useLocation()

    //Extracting the Token
    const query = new URLSearchParams(location.search)
    const token = query.get('token')

    useEffect(() => {
        console.log('Location search:', location.search); // Debugging log
        console.log('Token:', token); // Debugging log
        if (!token) {
          setMessage('Invalid or missing token');
          setLoading(false);
        } else {
          setLoading(false);
        }
      }, [token, location.search]);

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            setMessage('Passwords do not match')
        }

        try {
            const response = await axios.post(`${process.env.REACT_APP_API_BASE_PATH}/reset-password`, { token, password })
            setMessage(response.data.message)
            setTimeout(() => {
                navigate('/login')
            }, 3000)
        } catch ( error) {
            setMessage('Failed to reset password. Please try again.') 
        }
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className='reset-pwd'>
            <form onSubmit={handleSubmit} className='reset-pwd__form-container'>
                <h2>Reset Password</h2>
                <div className='reset-pwd__form-group'>
                    <label>New Password</label>
                    <input
                        type='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        require
                    />
                </div>
                <div className='reset-pwd__form-group'>
                    <label>Confirm New Password</label>
                    <input
                        type='password'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>
                <p className='reset-pwd__text'>
                    8 to 24 characters.<br />
                    Must include uppercase and lowercase letters, a number and a special character.<br />
                    Allowed special characters: 
                    <span aria-label="exclamation mark">!</span> 
                    <span aria-label="at symbol">@</span> 
                    <span aria-label="hashtag">#</span> 
                    <span aria-label="dollar sign">$</span>
                    <span aria-label="percent">%</span>
                </p>
                <Button buttonText="Reset Password" variant="button__password" type='submit'/>
                {message && <p className="message">{message}</p>}
            </form>
        </div>
    )
}

export default ResetPassword