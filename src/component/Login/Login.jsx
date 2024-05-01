import './Login.scss'
import axios from 'axios'
import Register from '../Register /Register'
import { useLocation, useNavigate } from 'react-router-dom'
import { useRef, useState, useEffect, useContext } from 'react';
import AuthContext from '../Utilities/AuthContext';

export default function Login() {

    const { REACT_APP_API_BASE_PATH_USER } = process.env

    const [ loginData, setLoginData ] = useState({ email: '', password: ''})

    const { setAuth } = useContext(AuthContext)
    const navigate = useNavigate()
    const location = useLocation()
    
    const userRef = useRef()
    const errRef = useRef()

    // const [ user, setUser ] = useState('')
    // const [ pwd, setPwd ] = useState('')
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
        console.log(loginRes)
        
        // STEP 2: STORING JWT IN BROWSER STORAGE - localStorage, sessionStorage, cookies
        localStorage.setItem('authToken', loginRes.data.token)

        const accessToken = loginRes.data.token
        setAuth({email: loginData.email, password: loginData.password, accessToken})
         // Reset the loginData state to clear the form fields
        setLoginData({ email: '', password: '' });
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
                            type='email'
                            value={loginData.email}
                            ref={userRef}
                            onChange={e => handleLoginFormChange(e, 'email')}
                            id='email' 
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor='password'>Password</label>
                        <input
                            type='password'
                            value={loginData.password}
                            onChange={e => handleLoginFormChange(e, 'password')}
                            id='password'
                            required
                        />
                    </div>
                    <button>Log In</button>
                </form>
            </section>
            {/* <button onClick={handleGetProfileClick}>Get Profile</button> */}
            </div>
    )
}
