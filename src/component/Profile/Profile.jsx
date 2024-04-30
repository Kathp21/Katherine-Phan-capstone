import axios from "axios";
import { useState, useEffect } from "react";

const Profile = ({token}) => {
    const { REACT_APP_API_BASE_PATH_USER } = process.env
    const [ user, setUser ] = useState({})
    const [ isUserUpdated, setIsUserUpdated ] = useState(false)

    useEffect(() => {
        const getProfileData = async () => {
            try {
                const { data } = await axios.get(`${REACT_APP_API_BASE_PATH_USER}/profile`, {
                    headers:{
                        Authorization: `bearer ${token}`
                    }               
                })
                setUser(data)
                setIsUserUpdated(false)
            } catch (err) {
                console.log({err})
            }
        }
        getProfileData()
    }, [token, isUserUpdated])
    return <div>Profile</div>
}

export default Profile;