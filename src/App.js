import './App.scss'
import Header from './component/Header/Header'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import UserInput from './component/UserInput/UserInput.jsx'
import { useState } from 'react'
import DisplayData from './component/DisplayData/DisplayData.jsx'
import axios from 'axios'
import Layout from './component/Layout/Layout.jsx'

function App() {

  const { REACT_APP_API_BASE_PATH } = process.env
  const [ input, setInput ] = useState()
  const [ isFirstLoad, setIsFirstLoad ] = useState(true)
  
  const addUserInput = async (userInput) => {
    setIsFirstLoad(false)
    const url = `${REACT_APP_API_BASE_PATH}/api/chat-completion`
    try {
        setInput(null)
        let newInput = await axios.post(url, userInput)
      setInput(JSON.parse(newInput.data))
    } catch(error) {
      console.error(error)
    }
  }

  return (
    <BrowserRouter>
      <Layout/>
      <Header/>
      <Routes>
        <Route path='/' element={<UserInput onAddUserInput={addUserInput}/>}/>
        <Route path='/recommendations' element={<DisplayData inputData={input} isFirstLoad={isFirstLoad}/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
 