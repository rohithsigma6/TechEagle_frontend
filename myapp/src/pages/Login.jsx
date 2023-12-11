import React, { useState } from 'react';
import axios from 'axios';
import API_URL from '../Url';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    phoneNumber: '',
    password: '',
  });

  const handleChange = (e, field) => {
    setFormData((prevData) => ({ ...prevData, [field]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_URL}/login`, formData);
      toast.success(response.data.message);
      if (response.data.success === true) {
        localStorage.setItem('techEagleToken', response.data.token);
        console.log(response.data.details.role);
        if (response.data.details.role === 'customer') {
          navigate('/home');
        } else {
          navigate('/admin/manage_products');
        }
      }
      console.log('Login successful:', response.data);
    } catch (error) {
      toast.error('Login failed');
      console.error('Login failed:', error);
    }
  };

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: "url('https://source.unsplash.com/1600x900/?login')",
      }}
    >
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md">
        <form onSubmit={handleSubmit}>
          <ToastContainer />

          <h2 className="text-2xl font-semibold mb-4">User Login</h2>

          <div className="mb-4">
            <label className="block text-sm font-semibold mb-1" htmlFor="phoneNumber">
              Phone Number:
            </label>
            <input
              className="border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline-blue"
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={(e) => handleChange(e, 'phoneNumber')}
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-semibold mb-1" htmlFor="password">
              Password:
            </label>
            <input
              className="border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline-blue"
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={(e) => handleChange(e, 'password')}
            />
          </div>

          <div className="mt-6">
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue"
              type="submit"
            >
              Login
            </button>
          </div>
        </form>
        <p className="mt-4 text-gray-800">
          Not a user? <Link to="/" className="text-blue-500">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
