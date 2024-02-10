import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { ConfigProvider } from 'antd'
import './App.css'

import Landing_page from './pages/Landing_page'
import SignIn from './pages/SignIn/SignIn'
import HomePage from './pages/HomePage/HomePage'
import InventoryList from './pages/Inventory/inventoryList'
import ProductionHouseList from './pages/ProductionHouse/ProductionHouseList'
import ProductList from './pages/ProductList/ProductList'
import AddNewProduct from './pages/AddNewProduct/AddNewProduct'
import InventoryShowProduct from './pages/Inventory/InventoryShowProduct'
import InventoryShowBatch from './pages/Inventory/InventoryShowBatch'
import ProductionHouseShowProduct from './pages/ProductionHouse/ProductionHouseShowProduct'
import ProductionHouseShowBatch from './pages/ProductionHouse/ProductionHouseShowBatch'
import OrderManagement from './pages/Order/OrderManagement'


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
            <Route path="man/orderManagement" element={<OrderManagement />} />

            <Route path="man/productList/newProduct" element={<AddNewProduct />} />
            <Route path="man/inventoryList/showProduct" element={<InventoryShowProduct />} />
            <Route path="man/productionHouseList/showProduct" element={<ProductionHouseShowProduct />} />


            <Route path="man/inventoryList/showProduct/showBatch" element={<InventoryShowBatch />} />
            <Route path="man/productionHouseList/showProduct/showBatch" element={<ProductionHouseShowBatch />} />
          </Routes>
        </Router>
    </div>
  )
}

export default App
