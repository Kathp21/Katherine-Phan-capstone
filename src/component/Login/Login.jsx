import { useState } from 'react'
import './Login.scss'
import axios from 'axios'

export default function Login() {

    const { REACT_APP_API_BASE_PATH } = process.env
    const [ signUpData, setSignUpData ] = useState({
        username: '',
        name: '',
        password: ''
    })

    const [ loginData, setLoginData ] = useState({ username: '', password: ''})

    const handleSignUpFormChange = (e, property) => {
        setSignUpData(state => ({...state, [property]: e.target.value}))
    }

    const handleLoginFormChange = (e, property) => {
        setLoginData(state => ({ ...state, [property]: e.target.value }))
    }

    const handleSignUpSubmit = async e => {
        e.preventDefault()

        // ADD USER TO DATABASE
        const signUpRes = await axios.post(`${REACT_APP_API_BASE_PATH}/register`, signUpData)
        console.log(signUpRes)
    }

    const handleLoginSubmit = async e => {
        e.preventDefault()
    
        // STEP 1: GET JWT FROM SERVER
        const loginRes = await axios.post(`${REACT_APP_API_BASE_PATH}/login`, loginData)
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
                        <label htmlFor='username'>Username</label>
                        <input
                            type='text'
                            value={signUpData.username}
                            onChange={e => handleSignUpFormChange(e, 'username')}
                            id='username' />
                    </div>
                    <div>
                        <label htmlFor='name'>Name</label>
                        <input
                            type='text'
                            value={signUpData.name}
                            onChange={e => handleSignUpFormChange(e, 'name')}
                            id='name' />
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
                        <label htmlFor='loginUsername'>Username</label>
                        <input
                        type='text'
                        value={loginData.username}
                        onChange={e => handleLoginFormChange(e, 'username')}
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
