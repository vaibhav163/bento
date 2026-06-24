import React from 'react'
import Home from './components/home'
import Bent from './components/bent'
import {Routes, Route, Link} from 'react-router-dom'
import Crys from './components/Gaurchrysalis2'
function App() {
  return (
    <>
      <Routes>
        <Route path="" element={<Home/>} />
        <Route path="/Chrysalis" element={<Crys />} />
        <Route path="/bento" element={<Bent />} />
      </Routes>
    </>
  )
}

export default App
