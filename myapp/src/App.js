import React,{useState} from 'react'
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import UserRegistrationForm from './pages/Register';
import LoginForm from './pages/Login';
import AdminSidebar from './pages/Admin/AdminSidebar';
import Dashboard from './pages/Admin/Dashboard';
import Unauthorized from './pages/UnAuthorized';
import CreateProductPage from './pages/Admin/CreateProduct';
import ManageProductsPage from './pages/Admin/ManageProducts';
import CustomerSidebar from './pages/Customer/CustomerSidebar';
import Home from './pages/Customer/Home';
import CartPage from './pages/Customer/Cart';
import OrdersPage from './pages/Customer/Order';
import ManageOrdersPage from './pages/Admin/ManageOrders';
function App() {
  const [userRole, setUserRole] = useState('customer'); 
  return (
    <div className="App">
       
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<UserRegistrationForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/home" element={<CustomerSidebar><Home/></CustomerSidebar>} />
          <Route path="/cart" element={<CustomerSidebar><CartPage/></CustomerSidebar>} />
          <Route path="/orders" element={<CustomerSidebar><OrdersPage/></CustomerSidebar>} />
          <Route path="/admin/manage_orders" element={<AdminSidebar><ManageOrdersPage/></AdminSidebar>} />
          <Route path="/admin/dashboard" element={<AdminSidebar><Dashboard/></AdminSidebar>} />
          <Route path="/admin/create_product" element={<AdminSidebar><CreateProductPage/></AdminSidebar>} />
          <Route path="/admin/manage_products" element={<AdminSidebar><ManageProductsPage/></AdminSidebar>} />
        </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
