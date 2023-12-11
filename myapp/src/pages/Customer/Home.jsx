import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import API_URL from '../../Url';

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const createCart = async () => {
      try {
        await axios.post(`${API_URL}/createcart`, {}, {
          headers: {
            'authorization': localStorage.getItem('techEagleToken')
          },
        });
      } catch (error) {
        console.error('Error creating cart:', error);
      }
    };

    createCart();
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${API_URL}/getAllproducts`);
      const availableProducts = response.data.products.filter((product) => product.availability === true);
      setProducts(availableProducts || []);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleAddToCart = async (productId) => {
    try {
      await axios.patch(`${API_URL}/addcartitems`, { productId: productId, quantity: 1 }, {
        headers: {
          'authorization': localStorage.getItem('techEagleToken')
        },
      });
      toast.success('Item added to cart');
    } catch (error) {
      toast.error('Error adding item to cart');
      console.error('Error adding item to cart:', error);
    }
  };

  return (
    <div className="container mx-auto my-8">
      <ToastContainer />
      <h1 className="text-4xl font-bold mb-8 text-center">Explore Our Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <div key={product._id} className="bg-white shadow-lg p-6 rounded-lg transition-transform transform hover:scale-105">
            <img src={product.productImage} alt={product.productName} className="w-full h-48 object-cover mb-4 rounded" />
            <h2 className="text-xl font-semibold mb-2">{product.productName}</h2>
            <p className="text-gray-600 mb-4">{product.productDescription}</p>
            <div className="flex justify-between items-center">
              <span className="text-lg font-bold">${product.price}</span>
              <button
                onClick={() => handleAddToCart(product._id)}
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
