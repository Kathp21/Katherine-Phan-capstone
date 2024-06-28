import { useState } from "react";
import axios from 'axios'
import './ForgotPassword.scss'
import Button from "../Button/Button";

const ForgotPassword = () => {
    const [ email , setEmail ] = useState('')
    const [ message, setMessage ] = useState('')
    const [ linkSent, setLinkSent ] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const response = await axios.post(`${process.env.REACT_APP_API_BASE_PATH}/api/password/forgot-password`, { email })
            setMessage(response.data.message)
            setLinkSent(true)

        } catch (error) {
            console.error('Error sending password reset email:', error.message)
            setMessage('Failed to send password reset email. Please try again.');
        }
    }

    return (
        <div className="forgot-pwd">
            {linkSent ? (
                <div className="forgot-pwd__text-box">
                    <p className="forgot-pwd__link-sent">A link to reset your password has been sent to your {email}.</p>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="forgot-pwd__form">
                    <h2>Forgot Password</h2>
                    <div className="forgot-pwd__input-container">
                        <label>Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <Button 
                        type='submit' 
                        buttonText="Send Reset Link"
                        variant="button__password"
                    />
                    {message && <p className="forgot-pwd__message">{message}</p>}
               </form>
            )}
        </div>
    )
}

export default ForgotPassword