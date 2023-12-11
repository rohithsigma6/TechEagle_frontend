import React from 'react';
import { Link, useNavigate } from 'react-router-dom';


const AdminSidebar = ({children}) => {
  const Navigate = useNavigate()
  const logout = () => {
   localStorage.removeItem("techEagleToken")
   Navigate("/login")
  };

  return (
    <div className='flex'>
    <div className="bg-gray-800 text-white w-64 h-screen p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>
      <ul>
        <li className="mb-2">
          <Link to="/admin/dashboard" className="text-blue-300 hover:text-blue-500">
            Dashboard
          </Link>
        </li>
        <li className="mb-2">
          <Link to="/admin/create_product" className="text-blue-300 hover:text-blue-500">
            Create Product
          </Link>
        </li>
        <li className="mb-2">
          <Link to="/admin/manage_products" className="text-blue-300 hover:text-blue-500">
            Manage Products
          </Link>
        </li>
        <li className="mb-2">
          <Link to="/admin/manage_orders" className="text-blue-300 hover:text-blue-500">
            Manage orders
          </Link>
        </li>
       
       
      </ul>
      <button
        onClick={logout}
        className="mt-4 bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
      >
        Logout
      </button>
      
     
      
    </div>
    {children}
    </div>
  );
};

export default AdminSidebar;