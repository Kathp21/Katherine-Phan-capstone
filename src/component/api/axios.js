import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_PATH_USER;

const userAxios = axios.create({
    baseURL: API_BASE_URL
})

// apiClient.interceptors.request.use(config => {
//     const token = localStorage.getItem('authToken')
//     if (token) {
//         config.headers.Authorization = `Bearer ${token}`
//     }
//     return config
// }, error => {
//     return Promise.reject(error)
// })

// export const registerUser = (userData) => {
//     return apiClient.post(`${API_BASE_URL}/register`, userData);
// };

// export const saveItinerary = (itineraryData, token) => {
//     return apiClient.post(`${API_BASE_URL}/save-itinerary`, itineraryData, {
//         headers: {
//             Authorization: `Bearer ${token}`
//         }
//     });
// };

export default userAxios;