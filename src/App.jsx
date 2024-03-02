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
import OrderDispatch from './pages/Order/OrderDispatch'
import ShiftBatch from './pages/Inventory/ShiftBatch'
import ProductionHouseShiftBatch from './pages/ProductionHouse/ProductionHouseShiftBatch'
import BatchSale from './pages/Inventory/BatchSale'
import AddToMarketPlace from './pages/Inventory/AddToMarketPlace'
import RemoveFromMarketPlace from './pages/Inventory/RemoveFromMarketPlace'
import AddNewBatch from './pages/ProductionHouse/AddNewBatch'
import AddNewProductionHouse from './pages/ProductionHouse/AddNewProductionHouse'
import AddNewInventory from './pages/Inventory/AddNewInventory'
import ProductDetails from './pages/ProductList/ProductDetails'
import UpdateProductInfo from './pages/ProductList/UpdateProductInfo'
import LeaseManagement from './pages/LeaseManagement/LeaseManagement'
import GiveLease from './pages/LeaseManagement/GiveLease'
import InventoryMarketPlace from './pages/LeaseManagement/InventoryMarketPlace'
import InventoryDetails from './pages/LeaseManagement/InventoryDetails'
import MyVouchers from './pages/Vouchers/myVouchers'
import AddNewVoucher from './pages/Vouchers/AddNewVoucher'
import UpdateVoucher from './pages/Vouchers/UpdateNDeleteVouchers'
import RentedInventories from './pages/LeaseManagement/RentedInventories'
import TakenInventories from './pages/LeaseManagement/TakenInventories'
import ReclaimInventories from './pages/LeaseManagement/ReclaimInventories'

function App() {

  

  return (
    <div>
       
        <Router>
          <Routes>
            <Route path="/" element={<Landing_page />} />
            <Route path="/signin" element={<SignIn />} />


            <Route path="/man/home" element={<HomePage />} />


            <Route path="man/inventoryList" element={<InventoryList />} />
            <Route path="man/inventoryList/showProduct" element={<InventoryShowProduct />} />
            <Route path="man/inventoryList/addNewInventory" element={<AddNewInventory />} />
            <Route path="man/inventoryList/showProduct/shiftBatch" element={<ShiftBatch />} />
            <Route path="man/inventoryList/showProduct/showBatch" element={<InventoryShowBatch />} />
            <Route path="man/inventoryList/showProduct/showBatch/sale" element={<BatchSale />} />
            <Route path="man/inventoryList/showProduct/showBatch/addToMarketPlace" element={<AddToMarketPlace />} />
            <Route path="man/inventoryList/showProduct/showBatch/removeFromMarketPlace" element={<RemoveFromMarketPlace />} />


            <Route path="man/orderManagement" element={<OrderManagement />} />
            <Route path="man/orderManagement/dispatch" element={<OrderDispatch />} />


            <Route path="man/productList" element={<ProductList />} />
            <Route path="man/productList/newProduct" element={<AddNewProduct />} />
            <Route path="man/productList/productDetails" element={<ProductDetails />} />
            <Route path="man/productList/productDetails/updateProductInfo" element={<UpdateProductInfo />} />


            <Route path="man/productionHouseList" element={<ProductionHouseList />} />
            <Route path="man/productionHouseList/showProduct" element={<ProductionHouseShowProduct />} />
            <Route path="man/productionHouseList/addNewProductionHouse" element={<AddNewProductionHouse />} />
            <Route path="man/productionHouseList/showProduct/showBatch" element={<ProductionHouseShowBatch />} />
            <Route path="man/productionHouseList/showProduct/showBatch/shiftBatch" element={<ProductionHouseShiftBatch />} />
            <Route path='man/productionHouseList/showProduct/showBatch/addNewBatch' element={<AddNewBatch />} />


            <Route path="man/leaseManagement" element={<LeaseManagement />} />
            <Route path="man/leaseManagement/giveLease" element={<GiveLease />} />
            <Route path="man/leaseManagement/inventoryMarketPlace" element={<InventoryMarketPlace />} />
            <Route path="man/leaseManagement/rentedInventories" element={<RentedInventories />} />
            <Route path="man/leaseManagement/takenInventories" element={<TakenInventories />} />
            <Route path="man/leaseManagement/reclaimInventories" element={<ReclaimInventories />} />
            <Route path="man/leaseManagement/inventoryMarketPlace/inventoryDetails" element={<InventoryDetails />} />

            <Route path="man/myVouchers" element={<MyVouchers />} />
            <Route path="man/myVouchers/addNew" element={<AddNewVoucher />} />
            <Route path="man/myVouchers/update" element={<UpdateVoucher />} />

          </Routes>
        </Router>
    </div>
  )
}

export default App
