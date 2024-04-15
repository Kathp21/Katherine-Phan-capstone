import { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './Register.scss';

const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

export default function Register() {
    const userRef = useRef()
    const errRef = useRef()

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
        try { const signUpRes = await axios.post(`${REACT_APP_API_BASE_PATH_USER}/register`, signUpData)
            console.log(signUpData)
            console.log(signUpRes)

            setSuccess(true)

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

    return (
        <> 
            {success ? (
                <section>
                    <h1>Success!</h1>
                    <p>
                        <a href="#">Sign In</a>
                    </p>
                </section>
            ):(
                <section>
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"}>{errMsg}</p>
                    <h1>Register</h1>
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
                        <label htmlFor='email'>
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
                        <button disabled={!validEmail || !validPassword ? true : false}>Sign Up</button>
                    </form>
                    <p>
                        Already registered?<br />
                        <span className="line">
                            {/*put router link here*/}
                            <a href="#">Sign In</a>
                        </span>
                    </p>
                </section>
            )
        }
        </>
    )

}