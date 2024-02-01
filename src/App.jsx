import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { ConfigProvider } from 'antd'
import './App.css'

import Landing_page from './pages/Landing_page'
import SignIn from './pages/SignIn/SignIn'
import HomePage from './pages/HomePage/HomePage'
import InventoryList from './pages/InventoryList/inventoryList'



function App() {

  

  return (
    <div>
       
        <Router>
          <Routes>
            <Route path="/" element={<Landing_page />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/man/home" element={<HomePage />} />
            <Route path="man/inventoryList" element={<InventoryList />} />
          </Routes>
        </Router>
    </div>
  )
}

export default App
