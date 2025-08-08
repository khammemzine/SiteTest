import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App'
import Home from './pages/Home'
import Library from './pages/Library'
import Drawings from './pages/Drawings'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/library" element={<Library/>} />
          <Route path="/drawings" element={<Drawings/>} />
        </Routes>
      </App>
    </BrowserRouter>
  </React.StrictMode>
)