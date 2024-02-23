// import {useState} from 'react'
// import UserInput from '../component/UserInput/UserInput'
// import DisplayData from '../component/DisplayData/DisplayData'

// export default function ParentComp() {
//     const { REACT_APP_API_BASE_PATH } = process.env
//     const [ input, setInput ] = useState([])

//     const addUserInput = async (userInput) => {
//         const url = `${REACT_APP_API_BASE_PATH}/api/chat-completion`
//         try {
//             let newInput = await axios.post(url, userInput)
//             setInput([...input, newInput.data])
//             console.log(newInput.data)
//         } catch(error) {
//             console.error(error)
//         }
//     }

//     return (
//         <>  
//             <UserInput onAddUserInput={addUserInput} />
//             <DisplayData inputData={input} />
//         </>
//     )
// }