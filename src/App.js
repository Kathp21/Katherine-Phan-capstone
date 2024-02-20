import './App.scss';
import Header from './component/Header/Header';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UserInput from './component/UserInput/UserInput';

function App() {
  return (
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path='/' element={<UserInput/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
 