import './App.scss'
import Header from './component/Header/Header'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import UserInput from './component/UserInput/UserInput.jsx'
import { useState } from 'react'
import DisplayData from './component/DisplayData/DisplayData.jsx'
import axios from 'axios'
import Layout from './component/Layout/Layout.jsx'
import Login from './component/Login/Login.jsx'
import { AuthProvider } from './component/contexts/AuthContext.js'
import Dashboard from './component/DashBoard/DashBoard.jsx'
import ItineraryDetails from './component/ItineraryDetails/ItineraryDetails.jsx'
import PrivateRoute from './component/PrivateRoute/PrivateRoute.js'
import Register from './component/Register /Register.jsx'
import ResetPassword from './component/ResetPassword/ResetPassword.jsx'
import ForgotPassword from './component/ForgotPassword/ForgotPassword.jsx'
import AboutUs from './component/AboutUs/AboutUs.jsx'

function App() {

  const { REACT_APP_API_BASE_PATH } = process.env
  const [ input, setInput ] = useState()
  const [ isFirstLoad, setIsFirstLoad ] = useState(true)

  
  const addUserInput = async (userInput) => {
    setIsFirstLoad(false)
    const url = `${REACT_APP_API_BASE_PATH}/api/recommendations`
    try {
      setInput(null)
      let newInput = await axios.post(url, userInput)
      setInput(newInput.data)
    } catch(error) {
      console.error(error)
    }
  }

  return (
    <AuthProvider>
      <BrowserRouter>
        <Layout/>
        <Header inputData={input}/>
        <Routes>
          <Route path ='/' element={<AboutUs/>}/>
          <Route path='/user-input' element={<UserInput onAddUserInput={addUserInput}/>}/>
          <Route path='/recommendations' element={<DisplayData inputData={input} isFirstLoad={isFirstLoad}/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/signup' element={<Register/>}/>
          <Route path='/reset-password' element={<ResetPassword/>}/>
          <Route path='/forgot-password' element={<ForgotPassword/>}/>
          <Route element={<PrivateRoute />}>
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/:recommendation_id' element={<ItineraryDetails />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App;
 