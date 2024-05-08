import './Login.scss'
import axios from 'axios'
import Register from '../Register /Register'
import { useNavigate } from 'react-router-dom'
import { useRef, useState, useEffect } from 'react';
import useAuth from '../contexts/AuthContext';

export default function Login() {

    const { REACT_APP_API_BASE_PATH_USER } = process.env

    const [ loginData, setLoginData ] = useState({ email: '', password: ''})

    const { login } = useAuth()

    const navigate = useNavigate()

    const userRef = useRef()
    const errRef = useRef()
    const [ errMsg, setErrMsg ] = useState('')

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
        const loginRes = await axios.post(`${REACT_APP_API_BASE_PATH_USER}/login`, loginData)
        const accessToken = loginRes.data.token

         // Update user state in AuthContext
        await login();

        // const { token, userData } = response.data;
        // login(token, userData);
        console.log(loginRes)
        
        // STEP 2: STORING JWT IN BROWSER STORAGE - localStorage, sessionStorage, cookies
        localStorage.setItem('authToken', accessToken)
        navigate('/dashboard')
        // login({email: loginData.email, password: loginData.password, accessToken})
         // Reset the loginData state to clear the form fields
        setLoginData({ email: '', password: '' });
        setErrMsg('')
        } catch(err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.response?.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed');
            }
            errRef.current.focus();
        }
      }

    return (
        <div>
            <Register />
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
            <section>
                <h2>Log In</h2>
                <form onSubmit={handleLoginSubmit}>
                    <div>
                        <label htmlFor='email'>Email</label>
                        <input
                            type='text'
                            value={loginData.email}
                            ref={userRef}
                            onChange={e => handleLoginFormChange(e, 'email')}
                            id='email1' 
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor='password'>Password</label>
                        <input
                            type='password'
                            value={loginData.password}
                            onChange={e => handleLoginFormChange(e, 'password')}
                            id='password1'
                            required
                        />
                    </div>
                    <button tyep="submit">Log In</button>
                </form>
            </section>
            {/* <button onClick={handleGetProfileClick}>Get Profile</button> */}
            </div>
    )
}
