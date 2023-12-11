import React, { useState } from 'react';
import axios from 'axios';
import API_URL from '../Url';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';

const UserRegistrationForm = () => {
  const [formData, setFormData] = useState({
    userName: '',
    phoneNumber: '',
    password: '',
    address: {
      houseNumber: '',
      street: '',
      city: '',
      state: '',
      zipCode: '',
    },
    role: 'customer',
  });

  const handleChange = (e, field, subField = null) => {
    const value = subField ? { [subField]: e.target.value } : e.target.value;
    setFormData((prevData) => ({ ...prevData, [field]: value }));
  };

  const handleAddressChange = (e, field) => {
    const updatedAddress = { ...formData.address, [field]: e.target.value };
    setFormData((prevData) => ({ ...prevData, address: updatedAddress }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_URL}/register`, formData);
      toast.success(response.data.message);
      console.log('Registration successful:', response.data);
    } catch (error) {
      toast.error('Registration failed');
      console.error('Registration failed:', error);
    }
  };

  const renderInputField = (label, id, name, value, onChange, type = 'text') => (
    <div className="mb-4 w-full md:w-1/2 px-2">
      <label className="block text-sm font-semibold mb-1" htmlFor={id}>
        {label}
      </label>
      <input
        className="border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline-blue"
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={(e) => onChange(e)}
      />
    </div>
  );

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: "url('https://source.unsplash.com/1600x900/?ecommerce')",
      }}
    >
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <form onSubmit={handleSubmit} className="max-w-md">
          <ToastContainer />

          <h2 className="text-2xl font-semibold mb-4">User Registration</h2>

          <div className="flex flex-wrap -mx-2">
          
            {renderInputField('Username', 'userName', 'userName', formData.userName, (e) => handleChange(e, 'userName'))}

            {renderInputField(
              'Phone Number',
              'phoneNumber',
              'phoneNumber',
              formData.phoneNumber,
              (e) => handleChange(e, 'phoneNumber')
            )}

     
            {renderInputField('Password', 'password', 'password', formData.password, (e) => handleChange(e, 'password'), 'password')}

            {renderInputField(
              'House Number',
              'houseNumber',
              'houseNumber',
              formData.address.houseNumber,
              (e) => handleAddressChange(e, 'houseNumber')
            )}
            {renderInputField(
              'Street',
              'street',
              'street',
              formData.address.street,
              (e) => handleAddressChange(e, 'street')
            )}
            {renderInputField('City', 'city', 'city', formData.address.city, (e) => handleAddressChange(e, 'city'))}
            {renderInputField('State', 'state', 'state', formData.address.state, (e) => handleAddressChange(e, 'state'))}
            {renderInputField('Zip Code', 'zipCode', 'zipCode', formData.address.zipCode, (e) => handleAddressChange(e, 'zipCode'))}
          </div>

          <div className="mt-6">
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue"
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
        <p className="mt-4 text-gray-800">
          Already a user? <Link to="/login" className="text-blue-500">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default UserRegistrationForm;
