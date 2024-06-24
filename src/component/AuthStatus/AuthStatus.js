import React from "react";
import useAuth from "../contexts/AuthContext";

const AuthStatus = () => {
    const { isLoggedIn } = useAuth()

    return (
        <div>
            { isLoggedIn ? <p>You are logged in</p> : <p>You are not logged in</p>}
        </div>
    )
}

export default AuthStatus