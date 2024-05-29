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

function App() {

  const { REACT_APP_API_BASE_PATH } = process.env
  const [ input, setInput ] = useState()
  const [ isFirstLoad, setIsFirstLoad ] = useState(true)
  // const { isLoggedIn, logout } = useAuth()
  
  const addUserInput = async (userInput) => {
    setIsFirstLoad(false)
    const url = `${REACT_APP_API_BASE_PATH}/api/chat-completion`
    try {
      setInput(null)
      let newInput = await axios.post(url, userInput)
      console.log(newInput)
      setInput(newInput.data)
    } catch(error) {
      console.error(error)
    }
  }

  return (
    <AuthProvider>
      <BrowserRouter>
        <Layout/>
        <Header/>
        <Routes>
          <Route path='/' element={<UserInput onAddUserInput={addUserInput}/>}/>
          <Route path='/recommendations' element={<DisplayData inputData={input} isFirstLoad={isFirstLoad}/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/dashboard' element={<Dashboard/>}/>
          <Route path='/itinerary-details/:recommendation_id' element={<ItineraryDetails/>}/>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App;
 