import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './Components/Auth/Login'
import SignUp from './Components/Auth/SignUp'
import Header from './Components/Header/Header'
import Update from './Components/Update/Update'
import Dashboard from './Components/Dashboard/Dashboard'


function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>  
          <Route path='/' element={<Login />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/update' element={<Update />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
