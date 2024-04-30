import { useState } from 'react'
import './Login.scss'
import axios from 'axios'
import Register from '../Register /Register'

export default function Login() {

    const { REACT_APP_API_BASE_PATH_USER } = process.env

    const [ loginData, setLoginData ] = useState({ email: '', password: ''})

    const handleLoginFormChange = (e, property) => {
        setLoginData(state => ({ ...state, [property]: e.target.value }))
    }

    const handleLoginSubmit = async e => {
        e.preventDefault()
    
        // STEP 1: GET JWT FROM SERVER
        const loginRes = await axios.post(`${REACT_APP_API_BASE_PATH_USER}/login`, loginData)
        console.log(loginRes)
    
        // STEP 2: STORING JWT IN BROWSER STORAGE - localStorage, sessionStorage, cookies
        localStorage.setItem('authToken', loginRes.data.token)
      }

    return (
        <div>
            <Register />
            <section>
                <h2>Log In</h2>
                <form onSubmit={handleLoginSubmit}>
                    <div>
                        <label htmlFor='loginUsername'>Email</label>
                        <input
                        type='text'
                        value={loginData.username}
                        onChange={e => handleLoginFormChange(e, 'email')}
                        id='loginUsername' />
                    </div>
                    <div>
                        <label htmlFor='loginPass'>Password</label>
                        <input
                        type='password'
                        value={loginData.password}
                        onChange={e => handleLoginFormChange(e, 'password')}
                        id='loginPass' />
                    </div>
                    <button>Log In</button>
                </form>
            </section>
            {/* <button onClick={handleGetProfileClick}>Get Profile</button> */}
            </div>
    )
}
