import './Login.scss'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'
import { useRef, useState, useEffect } from 'react';
import useAuth from '../contexts/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faEye } from '@fortawesome/free-regular-svg-icons';
import { faEyeSlash, faLock } from '@fortawesome/free-solid-svg-icons';
import Button from '../Button/Button';

export default function Login() {

    const { REACT_APP_API_BASE_PATH } = process.env

    const [ loginData, setLoginData ] = useState({ email: '', password: ''})

    const { login } = useAuth()

    const navigate = useNavigate()

    const userRef = useRef()
    const errRef = useRef()
    const [ errMsg, setErrMsg ] = useState('')
    const [ showPassword, setShowPassword ] = useState(false)

    useEffect(() => {
        userRef.current.focus()
    }, [])

    useEffect(() => {
        setErrMsg('')
    }, [loginData])

    const handleLoginFormChange = (e, property) => {
        setLoginData(state => ({ ...state, [property]: e.target.value }))
    }

    const handleLoginSubmit = async e => {
        e.preventDefault()
        
        try {
        // STEP 1: GET JWT FROM SERVER
        const loginRes = await axios.post(`${REACT_APP_API_BASE_PATH}/api/users/login`, loginData)
        const accessToken = loginRes.data.token
        
        console.log(loginRes.data.token)
         // Update user state in AuthContext
        await login();

        // STEP 2: STORING JWT IN BROWSER STORAGE - localStorage, sessionStorage, cookies
        localStorage.setItem('authToken', accessToken)
        navigate('/dashboard')
        // login({email: loginData.email, password: loginData.password, accessToken})
         // Reset the loginData state to clear the form fields
        setLoginData({ email: '', password: '' })
        setErrMsg('')
        } catch(err) {
            if (!err?.response) {
                setErrMsg('No Server Response')
            } else if (err.response?.status === 400) {
                setErrMsg('Missing Username or Password')
            } else if (err.response?.status === 401) {
                setErrMsg('Unauthorized')
            } else {
                setErrMsg('Login Failed')
            }
            errRef.current.focus()
        }
    }

    const togglePasswordVisibility = () => {
        setShowPassword(prevState => !prevState)
    }

    return (
        <main className='login'>
            <section className='login__container'>

                <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                <section>
                    <form onSubmit={handleLoginSubmit} className='login__form-container'>
                        <div className="login__info">
                            <label htmlFor='email'>Email Address</label>
                            <div className="login__input-container">
                                <FontAwesomeIcon icon={faEnvelope} className="login__icon" />
                                <input
                                    type="text"
                                    value={loginData.email}
                                    ref={userRef}
                                    onChange={e => handleLoginFormChange(e, 'email')}
                                    placeholder="Username@gmail.com"
                                    id="email"
                                    required
                                />
                            </div>
                        </div>

                        <div className="login__info">
                            <label htmlFor='password'>Password</label>
                            <div className="login__input-container">
                                <FontAwesomeIcon icon={faLock} className="login__icon" />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={loginData.password}
                                    onChange={e => handleLoginFormChange(e, 'password')}
                                    placeholder='············'
                                    id="password"
                                    required
                                />
                                <FontAwesomeIcon 
                                    icon={showPassword ? faEyeSlash : faEye} 
                                    className="login__icon login__icon--eye"
                                    onClick={togglePasswordVisibility} 
                                />
                            </div>
                        </div>
                        <Button 
                            type='submit' 
                            buttonText="Log In"
                            variant='button__login'
                        />
                    </form>
                </section>
                <div className="login__links">
                    <Link to="/signup" className="login__link">Sign up</Link>
                    <Link to="/forgot-password" className="login__link">Forgot Password?</Link>
                </div>
            </section>
        </main>
    )
}
