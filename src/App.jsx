import { useState } from 'react'
import './App.css'
import { Route,Routes,Navigate} from 'react-router-dom'
import Login from './components/Login'
import SignUp from './components/SignUp'
import Verification from './components/Verification'
import Home from './components/home'

function App() {

  return (
    <>
<Routes>
<Route path="/" element={<Navigate to="/login" replace />} />
  <Route  path='/login' element={<Login/>}/>
  <Route path='/signup' element={<SignUp/>}/>
  <Route path='/verify' element={<Verification/>}/>
  <Route path='/home' element={<Home/>}/>
</Routes>
    </>
  )
}

export default App
