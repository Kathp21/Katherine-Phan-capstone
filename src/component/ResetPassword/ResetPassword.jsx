import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ResetPassword.scss'
import Button from '../Button/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-regular-svg-icons';
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const ResetPassword = () => {
    const [ password, setPassword ] = useState('')
    const [ confirmPassword, setConfirmPassword ] = useState('')
    const [ message, setMessage ] = useState('')
    const [loading, setLoading] = useState(true);
    const [ validPassword, setValidPassword ] = useState(false)
    const [ passwordMatch, setPasswordMatch ] = useState(true)
    const [ showPassword, setShowPassword ] = useState(false)


    const navigate = useNavigate()
    const location = useLocation()

    //Extracting the Token
    const query = new URLSearchParams(location.search)
    const token = query.get('token')

    useEffect(() => {
        setValidPassword(PWD_REGEX.test(password))
    }, [password])

    useEffect(() => {
        setPasswordMatch(password === confirmPassword)
    }, [password, confirmPassword])

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
        if (!validPassword) {
            setMessage('Password does not meet the criteria');
            return;
        }
        if (!passwordMatch) {
            setMessage('Passwords do not match');
            return;
        }

        try {
            const response = await axios.post(`${process.env.REACT_APP_API_BASE_PATH_USER}/reset-password`, { token, password })
            setMessage(response.data.message)
            setTimeout(() => {
                navigate('/login')
            }, 3000)
        } catch ( error) {
            setMessage('Failed to reset password. Please try again.') 
        }
    }

    const togglePasswordVisibility = () => {
        setShowPassword(prevState => !prevState)
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
                        type={showPassword ? "text" : "password"}
                        value={password}
                        aria-invalid={!validPassword}
                        onChange={(e) => setPassword(e.target.value)}
                        require
                    />
                    <FontAwesomeIcon
                        icon={showPassword ? faEyeSlash : faEye} 
                        onClick={togglePasswordVisibility}
                        className='reset-pwd__icon reset-pwd__icon--eye'
                    />
                </div>
                <div className='reset-pwd__form-group'>
                    <label>Confirm New Password</label>
                    <input
                        type={showPassword ? "text" : "password"}
                        value={confirmPassword}
                        aria-invalid={!passwordMatch}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                    <FontAwesomeIcon
                        icon={showPassword ? faEyeSlash : faEye} 
                        onClick={togglePasswordVisibility}
                        className='reset-pwd__icon reset-pwd__icon--eye'
                    />
                </div>
                <p id="pwdnote" className={!validPassword ? "visible" : "hidden"}>
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
                {!passwordMatch && (
                    <p className="reset-pwd__error-message">Passwords do not match</p>
                )}
            </form>
        </div>
    )
}

export default ResetPassword