import { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from 'react-router-dom';
import './RegisterSaveItinerary.scss'
import useAuth from '../contexts/AuthContext';
import Button from '../Button/Button';
import { faEye } from '@fortawesome/free-regular-svg-icons';
import { faEyeSlash, faLock, faUser, faEnvelope } from '@fortawesome/free-solid-svg-icons';

const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

export default function RegisterSaveItinerary({ itineraryData }) {
    const userRef = useRef(null)
    const errRef = useRef(null)
    const { isLoggedIn, login } = useAuth()

    const { REACT_APP_API_BASE_PATH } = process.env
    const [ signUpData, setSignUpData ] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: ''
    })

    const [ validEmail, setValidEmail ] = useState(false)
    const [ emailFocus, setEmailFocus ] = useState(false)

    const [ validPassword, setValidPassword ] = useState(false)
    const [ passwordFocus, setPasswordFocus ] = useState(false)

    const [ errMsg, setErrMsg ] = useState('')
    const [ showPassword, setShowPassword ] = useState('')
    const [ isSave, setIsSave ] = useState(() => {
        const savedValue = localStorage.getItem('isSave')

        return savedValue !== null ? JSON.parse(savedValue) : false
    })

    useEffect(() => {
        localStorage.setItem('isSave', JSON.stringify(isSave))
    },[isSave])

    useEffect(() => {
        if (userRef.current) {
            userRef.current.focus();
        }
    }, []);

    useEffect(() => {
       setValidEmail(EMAIL_REGEX.test(signUpData.email))
    }, [signUpData.email])

    useEffect(() => {
        setValidPassword(PWD_REGEX.test(signUpData.password))
    }, [signUpData.password])

    useEffect(() => {
        setErrMsg('')
    }, [signUpData.email, signUpData.password])

    const handleSignUpFormChange = (e, property) => {
        setSignUpData(state => ({...state, [property]: e.target.value}))
    }

    const handleSignUpSubmit = async e => {
        e.preventDefault()

        const v1 = EMAIL_REGEX.test(signUpData.email)
        const v2 = PWD_REGEX.test(signUpData.password)
        if (!v1 || !v2) {
            setErrMsg("Invalid Entry")
            return
        }
        // ADD USER TO DATABASE
        try{ 
            const signUpRes = await axios.post(`${REACT_APP_API_BASE_PATH}/api/users/register`, signUpData)

        // Assuming the server responds with a JWT token on successful registration
        const { token, user } = signUpRes.data;

        localStorage.setItem('authToken', token)
        login(token, user)

        // Save the itinerary after successful registration

        if (itineraryData) {
            try {
                const saveItineraryResponse = await axios.post(`${REACT_APP_API_BASE_PATH}/api/itineraries/save-itinerary`, itineraryData, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                console.log('Itinerary saved successfully:', saveItineraryResponse.data);
                setIsSave(true)
            } catch (error) {
                console.error('Error saving itinerary:', error.response ? error.response.data : error.message);
            }
        }

        //Sign in the user after successful registration
        const signInResponse = await axios.post ( `${REACT_APP_API_BASE_PATH}/api/users/login`, {
            email: signUpData.email,
            password: signUpData.password
        })

        if (signInResponse.status === 201) {
            const userData = signInResponse.data.user
            localStorage.setItem('userData', JSON.stringify(userData))
            // navigate('/dashboard')
        } else {
            setErrMsg('Sign-in failed. Please check your credentials.');
            // Optionally, you can clear the form fields to allow the user to try again
            setSignUpData({
                first_name: '',
                last_name: '',
                email: '',
                password: ''
            })
        }

        } catch(err) {
            if (!err?.response) {
                setErrMsg('No Server Response')
            } else if ( err.response?.status === 409) {
                setErrMsg('Email Already Used')
            } else {
                setErrMsg('Registration Failed')
            }
            errRef.current.focus()
        }
    }

    const handleSaveItineraryButton = async () => {

        if (isSave) {
            console.log("Itinerary already saved.");
            return
        }


        const token = localStorage.getItem('authToken')
        try{
            await axios.post(`${REACT_APP_API_BASE_PATH}/api/itineraries/save-itinerary`, itineraryData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
 
            setIsSave(true)
        } catch (error) {
            console.error('Error saving itinerary:', error.response ? error.response.data : error.message);
        }
    }

    const togglePasswordVisibility = () => {
        setShowPassword(prevState => !prevState)
    }

    return (
        <> 
            {isLoggedIn ? (
               
 
                <section className='save-itinerary__button'>
                    <Button 
                        type='button' 
                        buttonText={isSave ? 'Saved' : 'Save'}
                        variant='button'
                        onClick={handleSaveItineraryButton}
                        disabled={isSave} 
                    />
                </section>
                
            ) : (
                <section className='register-save-itinerary'>
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"}>{errMsg}</p>
                    <p className="register-save-itinerary__text">Want to save your travel itinerary?</p>
                    <h1>Register</h1>
                    <form onSubmit={handleSignUpSubmit}>

                        <div className='register-save-itinerary__form-box'>
                            <label htmlFor='firtName'>First Name</label>
                            <div className='register-save-itinerary__input-container'>
                                <FontAwesomeIcon icon={faUser} className='register-save-itinerary__icon'/>
                                <input
                                    type='text'
                                    value={signUpData.first_name}
                                    onChange={e => handleSignUpFormChange(e, 'first_name')}
                                    id='firstName' 
                                    placeholder='Enter Your First Name'
                                />
                            </div>
                        </div>
                        <div className='register-save-itinerary__form-box'>
                            <label htmlFor='lastName'>Last Name</label>
                            <div className='register-save-itinerary__input-container'>
                                <FontAwesomeIcon icon={faUser} className='register-save-itinerary__icon'/>
                                <input
                                    type='text'
                                    value={signUpData.last_name}
                                    onChange={e => handleSignUpFormChange(e, 'last_name')}
                                    id='lastName' 
                                    placeholder='Enter Your Last Name'
                                />
                            </div>
                        </div>

                        <div className='register-save-itinerary__form-box'>
                            <label htmlFor='email' className='register-save-itinerary__email'>
                                Email:
                                <FontAwesomeIcon icon={faCheck} className={validEmail ? 'valid' : "hide"}/>
                                <FontAwesomeIcon icon={faTimes} className={validEmail || !signUpData.email ? 'hide' : 'valid'}/>
                            </label>
                            <div className='register-save-itinerary__input-container'>
                                <FontAwesomeIcon icon={faEnvelope} className='register-save-itinerary__icon'/>
                                <input
                                    type="text"
                                    id="email"
                                    ref={userRef}
                                    autoComplete="off"
                                    onChange={e => handleSignUpFormChange(e, 'email')}
                                    value={signUpData.email}
                                    required
                                    aria-invalid={validEmail ? "false" : "true"}
                                    aria-describedby="uidnote"
                                    onFocus={() => setEmailFocus(true)}
                                    onBlur={() => setEmailFocus(false)}
                                    placeholder='Username@gmail.com'
                                />
                            </div>
                            <p id='uidnote' className={emailFocus && signUpData.email && !validEmail ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            This not a valid email address.
                            </p>
                        </div>
                        <div className='register-save-itinerary__form-box'>
                            <label htmlFor="password">
                                Password:
                                <FontAwesomeIcon icon={faCheck} className={validPassword ? "valid" : "hide"} />
                                <FontAwesomeIcon icon={faTimes} className={validPassword || !signUpData.password ? "hide" : "invalid"} />
                            </label>
                            <div className='register-save-itinerary__input-container'>
                                <FontAwesomeIcon icon={faLock} className='register-save-itinerary__icon'/>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    onChange={e => handleSignUpFormChange(e, 'password')}
                                    value={signUpData.password}
                                    required
                                    aria-invalid={validPassword ? "false" : "true"}
                                    aria-describedby="pwdnote"
                                    onFocus={() => setPasswordFocus(true)}
                                    onBlur={() => setPasswordFocus(false)}
                                    placeholder='•••••••••'
                                />
                                <FontAwesomeIcon
                                    icon={showPassword ? faEyeSlash : faEye} 
                                    onClick={togglePasswordVisibility}
                                    className='register-save-itinerary__pwd-icon register-save-itinerary__pwd-icon--eye'
                                />
                            </div>
                            <p id="pwdnote" className={passwordFocus && !validPassword ? "instructions" : "offscreen"}>
                                <FontAwesomeIcon icon={faInfoCircle} />
                                8 to 24 characters.<br />
                                Must include uppercase and lowercase letters, a number and a special character.<br />
                                Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                            </p>
                        </div>
                        <div className="register-save-itinerary__button-container">
                            <Button 
                                type='submit' 
                                buttonText="Sign Up"
                                variant='button__register-itinerary'
                                disabled={!validEmail || !validPassword ? true : false}
                            />
                        </div>
                    </form>
                    <p>
                        Already registered?
                        <span className="line">
                            <Link to='/Login'>Sign In</Link>
                        </span>
                    </p>
                </section>
            )
        }
        </>
    )

}