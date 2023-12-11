import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import API_URL from '../../Url';

const CartPage = () => {
  const [cart, setCart] = useState([]);
  const [showAddressPopup, setShowAddressPopup] = useState(false);
  const [showCardDetailsPopup, setShowCardDetailsPopup] = useState(false);
  const [address, setAddress] = useState('');
  const [cardDetails, setCardDetails] = useState('');

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const response = await axios.get(`${API_URL}/getcartitems`, {
        headers: {
          'authorization': localStorage.getItem('techEagleToken')
        },
      });
      setCart(response.data.items || []);
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
  };

  const handleIncrement = async (productId) => {
    try {
      await axios.patch(`${API_URL}/addcartitems`, { productId: productId, quantity: 1 }, {
        headers: {
          'authorization': localStorage.getItem('techEagleToken')
        },
      });
      fetchCart();
    } catch (error) {
      console.error('Error incrementing item:', error);
      toast.error('Error incrementing item');
    }
  };

  const handleDecrement = async (productId) => {
    try {
      const updatedQuantity = cart.find(item => item.product._id === productId).quantity - 1;

      if (updatedQuantity < 1) {
        await axios.post(`${API_URL}/removecartitem`, { productId: productId }, {
          headers: {
            'authorization': localStorage.getItem('techEagleToken')
          },
        });
      } else {
        await axios.patch(`${API_URL}/addcartitems`, { productId: productId, quantity: -1 }, {
          headers: {
            'authorization': localStorage.getItem('techEagleToken')
          },
        });
      }

      fetchCart();
    } catch (error) {
      console.error('Error decrementing item:', error);
      toast.error('Error decrementing item');
    }
  };

  const handleRemove = async (productId) => {
    try {
      const response = await axios.post(`${API_URL}/removecartitem`, { productId: productId }, {
        headers: {
          'authorization': localStorage.getItem('techEagleToken')
        },
      });
      console.log(response);
      fetchCart();
      toast.success('Item removed from cart');
    } catch (error) {
      console.error('Error removing item:', error);
      toast.error('Error removing item');
    }
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
  };

  const handleOrder = async () => {
    setShowAddressPopup(true);
  };

  const handleAddressSubmit = () => {
    setShowAddressPopup(false);
    setShowCardDetailsPopup(true);
  };

  const handleCardDetailsSubmit = async () => {
    try {
      setShowCardDetailsPopup(false);

      const response = await axios.post(
        `${API_URL}/createorder`,
        {
          products: cart.map((item) => ({
            product: item.product._id,
            quantity: item.quantity,
          })),
          totalAmount: calculateTotal(),
          address,
          cardDetails,
        },
        {
          headers: {
            'authorization': localStorage.getItem('techEagleToken'),
          },
        }
      );

      const deleteCart = await axios.delete(`${API_URL}/deleteCart`, {
        headers: {
          'authorization': localStorage.getItem('techEagleToken'),
        },
      });

      setCart([]);
      toast.success('Order placed successfully!');
    } catch (error) {
      console.error('Error placing order:', error);
      toast.error('Error placing order');
    }
  };

  return (
    <div className="container mx-auto my-8">
      <ToastContainer />
      <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>
      {cart.length === 0 ? (
        <p className="text-lg">Your cart is empty.</p>
      ) : (
        <>
          <ul className="divide-y divide-gray-200">
            {cart.map((cartItem) => (
              <li key={cartItem.product._id} className="flex justify-between items-center py-4">
                <div className="flex items-center space-x-4">
                  <img
                    src={cartItem.product.productImage}
                    alt={cartItem.product.productName}
                    className="w-16 h-16 object-cover"
                  />
                  <div>
                    <h2 className="text-xl font-semibold">{cartItem.product.productName}</h2>
                    <p className="text-gray-600">Price: ${cartItem.product.price}</p>
                    <p className="text-gray-600">
                      Total: ${cartItem.product.price} X {cartItem.quantity} = ${cartItem.product.price * cartItem.quantity}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <button onClick={() => handleIncrement(cartItem.product._id)} className="text-blue-500">
                    +
                  </button>
                  <p className="text-gray-600"> {cartItem.quantity}</p>
                  <button onClick={() => handleDecrement(cartItem.product._id)} className="text-red-500">
                    -
                  </button>
                  <button onClick={() => handleRemove(cartItem.product._id)} className="text-gray-500">
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <p className="text-xl font-semibold">Total: ${calculateTotal()}</p>
            <button onClick={handleOrder} className="bg-blue-500 text-white py-2 px-4 rounded mt-4">
              Place Order
            </button>
          </div>
        </>
      )}

      {showAddressPopup && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-75 flex justify-center items-center">
          <div className="bg-white p-4 rounded">
            <h2 className="text-xl font-semibold mb-4">Enter Address</h2>
            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter your address"
              className="w-full h-20 p-2 border mb-4"
            ></textarea>
            <button onClick={handleAddressSubmit} className="bg-blue-500 text-white py-2 px-4 rounded">
              Submit Address
            </button>
          </div>
        </div>
      )}

      {showCardDetailsPopup && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-75 flex justify-center items-center">
          <div className="bg-white p-4 rounded">
            <h2 className="text-xl font-semibold mb-4">Enter Card Details</h2>
            <input
              type="text"
              value={cardDetails}
              onChange={(e) => setCardDetails(e.target.value)}
              placeholder="Enter card details"
              className="w-full p-2 border mb-4"
            />
            <button onClick={handleCardDetailsSubmit} className="bg-blue-500 text-white py-2 px-4 rounded">
              Submit Order
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
