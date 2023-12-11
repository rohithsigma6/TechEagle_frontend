import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import API_URL from '../../Url';

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get(`${API_URL}/getorders`, {
        headers: {
          'authorization': localStorage.getItem('techEagleToken')
        },
      });

      setOrders(response.data.orders || []);
    } catch (error) {
      console.error('Error fetching orders:', error);
      toast.error('Error fetching orders');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending':
        return 'bg-red-300';
      case 'Processing':
        return 'bg-blue-300';
      case 'Shipped':
        return 'bg-yellow-300';
      case 'Delivered':
        return 'bg-green-300';
      default:
        return 'bg-red-300';
    }
  };

  return (
    <div className="container mx-auto my-8">
      <ToastContainer />
      <h1 className="text-3xl font-bold mb-6">Orders</h1>
      {orders.length === 0 ? (
        <p className="text-lg">No orders available.</p>
      ) : (
        <div>
          {orders.map((order) => (
            <div
              key={order._id}
              className={`bg-white shadow-lg p-6 mb-6 rounded-md grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${getStatusColor(
                order.status
              )} transition duration-300 ease-in-out transform hover:scale-105`}
            >
              <div className="col-span-1 md:col-span-2 lg:col-span-2">
                <h2 className="text-xl font-semibold mb-2">Order ID: {order._id}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {order.products.map((product) => (
                    <div key={product.product._id} className="flex items-center space-x-4">
                      <img
                        src={product.product.productImage}
                        alt={product.product.productName}
                        className="w-16 h-16 object-cover rounded-md"
                      />
                      <div>
                        <h3 className="text-md font-semibold">{product.product.productName}</h3>
                        <p className="text-sm text-gray-600">Quantity: {product.quantity}</p>
                        <p className="text-sm text-gray-600">Price: ${product.product.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="col-span-1 md:col-span-1 lg:col-span-1">
                <div className="flex flex-col justify-between h-full">
                  <div>
                    <p className="text-sm text-gray-600">Total Amount: ${order.totalAmount}</p>
                    <button
                      className={`bg-${order.status === 'Delivered' ? 'green' : 'red'}-500 text-white py-1 px-2 rounded hover:bg-${
                        order.status === 'Delivered' ? 'green' : 'red'
                      }-700 focus:outline-none focus:shadow-outline-${
                        order.status === 'Delivered' ? 'green' : 'red'
                      }`}
                    >
                      {order.status}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrdersPage;
