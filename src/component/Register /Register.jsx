import { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from 'react-router-dom';
import './Register.scss';
import useAuth from '../contexts/AuthContext';
// import userAxios from '../api/axios';

const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

export default function Register({ itineraryData }) {
    const userRef = useRef()
    const errRef = useRef()
    const {login} = useAuth()

    const { REACT_APP_API_BASE_PATH_USER } = process.env
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
    const [ success, setSuccess ] = useState(false)
    const [ showSaveButton, setShowSaveButton ] = useState(false)

    useEffect(() => {
        userRef.current.focus()
    }, [])

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
            const signUpRes = await axios.post(`${REACT_APP_API_BASE_PATH_USER}/register`, signUpData)
            console.log(signUpData)
            console.log(signUpRes)

        // Assuming the server responds with a JWT token on successful registration
        const { token } = signUpRes.data;

        console.log("Itinerary Data to Save:", itineraryData)

        localStorage.setItem('authToken', token)
        login(token)

        // Save the itinerary after successful registration

        if (itineraryData) {
            try {
                const saveItineraryResponse = await axios.post(`${REACT_APP_API_BASE_PATH_USER}/save-itinerary`, itineraryData, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                console.log('Itinerary saved successfully:', saveItineraryResponse.data);
            } catch (error) {
                console.error('Error saving itinerary:', error.response ? error.response.data : error.message);
            }
        }

        //Sign in the user after successful registration
        const signInResponse = await axios.post ( `${REACT_APP_API_BASE_PATH_USER}/login`, {
            email: signUpData.email,
            password: signUpData.password
        })

        if (signInResponse.status === 201) {
            const userData = signInResponse.data.user
            localStorage.setItem('userData', JSON.stringify(userData))
            setShowSaveButton(true)
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

        setSuccess(true);

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
        const token = localStorage.getItem('authToken')
        try{
            const itineraries = await axios.post(`${REACT_APP_API_BASE_PATH_USER}/save-itinerary`, itineraryData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            console.log('Itinerary saved successfully:', itineraries.data )
        } catch (error) {
            console.error('Error saving itinerary:', error.response ? error.response.data : error.message);
        }
    }

    return (
        <> 
            {success ? (
                <section>
                    <h1>Success!</h1>
                    <p>
                        <a href="#">Sign In</a>
                    </p>
                    {showSaveButton && (
                        <button onClick={handleSaveItineraryButton}>Save Itinerary</button>
                    )}
                </section>
            ):(
                <section>
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"}>{errMsg}</p>
                    <h1>Register</h1>
                    <form onSubmit={handleSignUpSubmit}>
                        <div className='register__form-box'>
                            <label htmlFor='firtName'>First Name</label>
                            <input
                                type='text'
                                value={signUpData.first_name}
                                onChange={e => handleSignUpFormChange(e, 'first_name')}
                                id='firstName' />
                        </div>
                        <div className='register__form-box'>
                            <label htmlFor='lastName'>Last Name</label>
                            <input
                                type='text'
                                value={signUpData.last_name}
                                onChange={e => handleSignUpFormChange(e, 'last_name')}
                                id='lastName' />
                        </div>
                        <div className='register__form-box'>
                            <label htmlFor='email' className='register__email'>
                                Email:
                                <FontAwesomeIcon icon={faCheck} className={validEmail ? 'valid' : "hide"}/>
                                <FontAwesomeIcon icon={faTimes} className={validEmail || !signUpData.email ? 'hide' : 'valid'}/>
                            </label>
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
                            />
                            <p id='uidnote' className={emailFocus && signUpData.email && !validEmail ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            This not a valid email address.
                            </p>
                        </div>
                        <div className='register__form-box'>
                            <label htmlFor="password">
                                Password:
                                <FontAwesomeIcon icon={faCheck} className={validPassword ? "valid" : "hide"} />
                                <FontAwesomeIcon icon={faTimes} className={validPassword || !signUpData.password ? "hide" : "invalid"} />
                            </label>
                            <input
                                type="password"
                                id="password"
                                onChange={e => handleSignUpFormChange(e, 'password')}
                                value={signUpData.password}
                                required
                                aria-invalid={validPassword ? "false" : "true"}
                                aria-describedby="pwdnote"
                                onFocus={() => setPasswordFocus(true)}
                                onBlur={() => setPasswordFocus(false)}
                            />
                            <p id="pwdnote" className={passwordFocus && !validPassword ? "instructions" : "offscreen"}>
                                <FontAwesomeIcon icon={faInfoCircle} />
                                8 to 24 characters.<br />
                                Must include uppercase and lowercase letters, a number and a special character.<br />
                                Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                            </p>
                        </div>
                        <button className="register__button" disabled={!validEmail || !validPassword ? true : false}>Sign Up</button>
                    </form>
                    <p>
                        Already registered?
                        <span className="line">
                            {/*put router link here*/}
                            <Link to='/Login'>Sign In</Link>
                            {/* <a href="#">Sign In</a> */}
                        </span>
                    </p>
                </section>
            )
        }
        </>
    )

}