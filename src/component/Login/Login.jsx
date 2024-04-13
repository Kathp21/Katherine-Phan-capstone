import { useState } from 'react'
import './Login.scss'
import axios from 'axios'

export default function Login() {

    const { REACT_APP_API_BASE_PATH_USER } = process.env
    const [ signUpData, setSignUpData ] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: ''
    })

    const [ loginData, setLoginData ] = useState({ email: '', password: ''})

    const handleSignUpFormChange = (e, property) => {
        setSignUpData(state => ({...state, [property]: e.target.value}))
    }

    const handleLoginFormChange = (e, property) => {
        setLoginData(state => ({ ...state, [property]: e.target.value }))
    }

    const handleSignUpSubmit = async e => {
        e.preventDefault()

    // ADD USER TO DATABASE
        try{ const signUpRes = await axios.post(`${REACT_APP_API_BASE_PATH_USER}/register`, signUpData)
            console.log(signUpData)
            console.log(signUpRes)

            // const token = signUpRes.data.token
            // console.log('Token:', token);
            // localStorage.setItem('authToken', token)


        } catch(error) {
            console.error('Sign up failed.')
        }
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
            <section>
                <h2>Sign Up</h2>
                <form onSubmit={handleSignUpSubmit}>
                    <div>
                        <label htmlFor='firtName'>First Name</label>
                        <input
                            type='text'
                            value={signUpData.first_name}
                            onChange={e => handleSignUpFormChange(e, 'first_name')}
                            id='firstName' />
                    </div>
                    <div>
                        <label htmlFor='lastName'>Last Name</label>
                        <input
                            type='text'
                            value={signUpData.last_name}
                            onChange={e => handleSignUpFormChange(e, 'last_name')}
                            id='lastName' />
                    </div>
                    <div>
                        <label htmlFor='username'>email</label>
                        <input
                            type='text'
                            value={signUpData.email}
                            onChange={e => handleSignUpFormChange(e, 'email')}
                            id='email' />
                    </div>
                    <div>
                        <label htmlFor='password'>Password</label>
                        <input
                            type='password'
                            value={signUpData.password}
                            onChange={e => handleSignUpFormChange(e, 'password')}
                            id='password' />
                    </div>
                    <button>Sign Up</button>
                </form>
            </section>
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
