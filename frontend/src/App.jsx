import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './Components/Auth/Login'
import SignUp from './Components/Auth/SignUp'
import Header from './Components/Header/Header'
import Dashboard from './Components/Dashboard/Dashboard'

function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>  
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/dashboard' element={<Dashboard />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
