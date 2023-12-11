import React, { useState,useEffect } from 'react';
import axios from 'axios';
import API_URL from '../../Url';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import verifyRole from '../../utils/VerifyRole';

const CreateProductPage = () => {
    const navigate = useNavigate()
    useEffect(()=>{
        const verifyDetails=async()=>{
            const userDetails =await verifyRole()
            console.log(userDetails)
            if (userDetails==="manager"){
                navigate('/admin/create_product')
            }else if(userDetails==="customer"){
                navigate('/home')
            }
            else{
                navigate('/login')
            }
        }
        verifyDetails()
        
       
    },[])
  const [productData, setProductData] = useState({
    productName: '',
    productImage: '',
    productDescription: '',
    weight: 0,
    quantity: 0,
    price: 0,
  });

  const handleInputChange = (e, field) => {
    setProductData({ ...productData, [field]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      
      const response = await axios.post(`${API_URL}/addProduct`, productData,{
        headers: {
          'authorization': localStorage.getItem('techEagleToken')
        },
      });
      if (response.data.success==true){
      toast.success(response.data.message);
      console.log('Product created successfully:', response.data);
      }
      else{
        toast.error('Please add all fields');
      }

    } catch (error) {
      toast.error('Product creation failed');
      console.error('Product creation failed:', error);
    }
  };

  return (
    <div className="container mx-auto mt-8">
      <ToastContainer />
      <h2 className="text-2xl font-semibold mb-4">Create Product</h2>
      <form onSubmit={handleSubmit}>

        <div className="mb-4">
          <label className="block text-sm font-bold mb-2" htmlFor="productName">
            Product Name:
          </label>
          <input
            className="border rounded w-full py-2 px-3"
            type="text"
            id="productName"
            name="productName"
            value={productData.productName}
            onChange={(e) => handleInputChange(e, 'productName')}
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-bold mb-2" htmlFor="productImage">
            Product Image URL:
          </label>
          <input
            className="border rounded w-full py-2 px-3"
            type="text"
            id="productImage"
            name="productImage"
            value={productData.productImage}
            onChange={(e) => handleInputChange(e, 'productImage')}
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-bold mb-2" htmlFor="productDescription">
            Product Description:
          </label>
          <textarea
            className="border rounded w-full py-2 px-3"
            id="productDescription"
            name="productDescription"
            value={productData.productDescription}
            onChange={(e) => handleInputChange(e, 'productDescription')}
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-bold mb-2" htmlFor="weight">
            Weight (g):
          </label>
          <input
            className="border rounded w-full py-2 px-3"
            type="number"
            id="weight"
            name="weight"
            value={productData.weight}
            onChange={(e) => handleInputChange(e, 'weight')}
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-bold mb-2" htmlFor="quantity">
            Quantity:
          </label>
          <input
            className="border rounded w-full py-2 px-3"
            type="number"
            id="quantity"
            name="quantity"
            value={productData.quantity}
            onChange={(e) => handleInputChange(e, 'quantity')}
          />
        </div>


        <div className="mb-4">
          <label className="block text-sm font-bold mb-2" htmlFor="price">
            Price ($):
          </label>
          <input
            className="border rounded w-full py-2 px-3"
            type="number"
            id="price"
            name="price"
            value={productData.price}
            onChange={(e) => handleInputChange(e, 'price')}
          />
        </div>

        <div className="mb-4">
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue"
            type="submit"
          >
            Create Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateProductPage;
