import React from 'react'
import Bent from './components/bent'
import {Routes, Route,} from 'react-router-dom'
import Crys from './components/Gaurchrysalis2'
function App() {
  return (
    <>
      <Routes>
        <Route path="" element={<Bent/>} />
        <Route path="/Chrysalis" element={<Crys />} />
        <Route path="/bento" element={<Bent />} />
      </Routes>
    </>
  )
}

export default App
