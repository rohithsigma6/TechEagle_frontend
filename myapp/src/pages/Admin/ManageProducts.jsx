import React, { useState, useEffect } from 'react';
import axios from 'axios';
import verifyRole from '../../utils/VerifyRole';
import { Link } from 'react-router-dom';
import API_URL from '../../Url';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const ManageProductsPage = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
 
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    const verifyDetails = async () => {
      const userDetails = await verifyRole();
      if (userDetails === 'manager') {
        navigate('/admin/manage_products');
        fetchProducts();
      } else if (userDetails === 'customer') {
        navigate('/home');
      } else {
        navigate('/');
      }
    };
    verifyDetails();
  }, [navigate]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${API_URL}/getallproducts`);
      setProducts(response.data.products || []); 
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };



  const handleViewDetails = (product) => {
    setSelectedProduct(product);
  };
  const handleEdit = (product) => {
    setSelectedProduct(null);
    setEditingProduct({...product});
  };
  const handleUpdateProduct = async (updatedProduct) => {
    try {
      await axios.patch(`${API_URL}/updateproduct/${updatedProduct._id}`, updatedProduct,{
        headers: {
          'authorization': localStorage.getItem('techEagleToken')
        },
      });
      toast.success('Product updated successfully');
      fetchProducts();
      setEditingProduct(null);
    } catch (error) {
      console.error('Error updating product:', error);
      toast.error('Error updating product');
    }
  };

  const handleCloseDetails = () => {
    setSelectedProduct(null);
    setEditingProduct(null);
  };

  return (
    <div className="container mx-auto mt-8">
      <ToastContainer />
      <h2 className="text-2xl font-semibold mb-4">Manage Products</h2>
      <table className="w-full border">
        <thead>
          <tr>
            <th className="border py-2 px-4">Product Name</th>
            <th className="border py-2 px-4">Weight (g)</th>
            <th className="border py-2 px-4">Quantity</th>
            <th className="border py-2 px-4">Price ($)</th>
            <th className="border py-2 px-4">Availability</th>
            <th className="border py-2 px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td className="border py-2 px-4">{product.productName}</td>
              <td className="border py-2 px-4">{product.weight}</td>
              <td className="border py-2 px-4">{product.quantity}</td>
              <td className="border py-2 px-4">{product.price}</td>
              <td className="border py-2 px-4">{product.availability.toString()}</td>
              <td className="border py-2 px-4">
                <button onClick={() => handleViewDetails(product)} className="text-blue-500 mr-2">
                  View and Edit
                </button>
                
              
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedProduct && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">{selectedProduct.productName}</h2>
            <p>Weight: {selectedProduct.weight} </p>
            <p>Quantity: {selectedProduct.quantity}</p>
            <p>Price: ${selectedProduct.price}</p>
            <p>Availabilty: {selectedProduct.availability.toString()}</p>
            <button onClick={handleCloseDetails} className="mt-4 bg-blue-500 text-white py-2 px-4 rounded">
              Close
            </button>
          </div>
        </div>
      )}
      {selectedProduct && !editingProduct && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">{selectedProduct.productName}</h2>
            <p>Weight: {selectedProduct.weight} g</p>
            <p>Quantity: {selectedProduct.quantity}</p>
            <p>Price: ${selectedProduct.price}</p>
            <p>Availabilty: {selectedProduct.availability.toString()}</p>
            <button onClick={handleCloseDetails} className="mt-4 bg-blue-500 text-white py-2 px-4 rounded">
              Close
            </button>
            <button onClick={() => handleEdit(selectedProduct)} className="mt-4 ml-4 bg-green-500 text-white py-2 px-4 rounded">
              Edit
            </button>
          </div>
        </div>
      )}
      {editingProduct && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Edit Product</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleUpdateProduct(editingProduct);
              }}
            >
              <div className="mb-4">
                <label className="block text-sm font-bold mb-2" htmlFor="productName">
                  Product Name:
                </label>
                <input
                  className="border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline-blue"
                  type="text"
                  id="productName"
                  name="productName"
                  value={editingProduct.productName}
                  onChange={(e) => setEditingProduct({ ...editingProduct, productName: e.target.value })}
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-bold mb-2" htmlFor="weight">
                  Weight (g):
                </label>
                <input
                  className="border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline-blue"
                  type="number"
                  id="weight"
                  name="weight"
                  value={editingProduct.weight}
                  onChange={(e) => setEditingProduct({ ...editingProduct, weight: e.target.value })}
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-bold mb-2" htmlFor="quantity">
                  Quantity:
                </label>
                <input
                  className="border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline-blue"
                  type="number"
                  id="quantity"
                  name="quantity"
                  value={editingProduct.quantity}
                  onChange={(e) => setEditingProduct({ ...editingProduct, quantity: e.target.value })}
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-bold mb-2" htmlFor="price">
                  Price ($):
                </label>
                <input
                  className="border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline-blue"
                  type="number"
                  id="price"
                  name="price"
                  value={editingProduct.price}
                  onChange={(e) => setEditingProduct({ ...editingProduct, price: e.target.value })}
                />
              </div>
              <div className="mb-4">
  <label className="block text-sm font-bold mb-2" htmlFor="availability">
    Availability :
  </label>
  <select
    className="border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline-blue"
    id="availability"
    name="availability"
    value={editingProduct.availability.toString()} 
    onChange={(e) => setEditingProduct({ ...editingProduct, availability: e.target.value === 'true' })}
  >
    <option value={'true'}>Available</option>
    <option value={'false'}>Not Available</option>
  </select>
</div>

              <button type="submit" className="mt-4 bg-blue-500 text-white py-2 px-4 rounded">
                Update
              </button>
              <button onClick={handleCloseDetails} className="mt-4 ml-4 bg-red-500 text-white py-2 px-4 rounded">
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default ManageProductsPage;
