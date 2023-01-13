import React from 'react'
import Home from './Components/Home'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import QuranPage from './Components/QuranPage'

const App = () => {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/:transliteration' element={<QuranPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
