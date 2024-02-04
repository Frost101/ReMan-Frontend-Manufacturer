import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { ConfigProvider } from 'antd'
import './App.css'

import Landing_page from './pages/Landing_page'
import SignIn from './pages/SignIn/SignIn'
import HomePage from './pages/HomePage/HomePage'
import InventoryList from './pages/Inventory/inventoryList'
import ProductionHouseList from './pages/ProductionHouseList/ProductionHouseList'
import ProductList from './pages/ProductList/ProductList'
import AddNewProduct from './pages/AddNewProduct/AddNewProduct'
import InventoryShowProduct from './pages/Inventory/InventoryShowProduct'


function App() {

  

  return (
    <div>
       
        <Router>
          <Routes>
            <Route path="/" element={<Landing_page />} />
            <Route path="/signin" element={<SignIn />} />
            
            <Route path="/man/home" element={<HomePage />} />
            <Route path="man/inventoryList" element={<InventoryList />} />
            <Route path="man/productionHouseList" element={<ProductionHouseList />} />
            <Route path="man/productList" element={<ProductList />} />

            <Route path="man/productList/newProduct" element={<AddNewProduct />} />
            <Route path="man/inventoryList/showProduct" element={<InventoryShowProduct />} />
          </Routes>
        </Router>
    </div>
  )
}

export default App
