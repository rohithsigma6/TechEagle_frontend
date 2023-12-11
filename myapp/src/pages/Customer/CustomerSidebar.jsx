import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const CustomerSidebar = ({ children }) => {
  const navigate = useNavigate();

  return (
    <div className="flex">

      <div className="bg-blue-600 h-screen w-64 text-white shadow-lg fixed overflow-y-auto">
        <div className="p-4">
          <h1 className="text-3xl font-semibold mb-4">Tech Eagle</h1>
          <ul>
            <li className="mb-2">
              <Link to="/home" className="text-white hover:text-gray-300">
                Home
              </Link>
            </li>
            <li className="mb-2">
              <Link to="/cart" className="text-white hover:text-gray-300">
                Cart
              </Link>
            </li>
            <li className="mb-2">
              <Link to="/orders" className="text-white hover:text-gray-300">
                Orders
              </Link>
            </li>
          </ul>
          <div className="mt-8">
            <button
              onClick={() => {
                localStorage.removeItem('techEagleToken');
                navigate('/login');
              }}
              className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded w-full"
            >
              Logout
            </button>
          </div>
        </div>
      </div>


      <div className="flex-grow bg-gray-100 p-4 overflow-y-auto ml-64">
        {children}
      </div>
    </div>
  );
};

export default CustomerSidebar;
