import { Link } from 'react-router-dom';
import { useState } from 'react';
import { mockProducts, mockCategories, mockOrders, mockUsers } from '../../lib/mockData';

function AdminDashboard() {
  const [products] = useState(mockProducts);
  const [orders] = useState(mockOrders);
  const [users, setUsers] = useState(mockUsers);

  const handleDeleteUser = (userId) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    setUsers(users.filter((user) => user._id !== userId));
    alert('User deleted successfully');
  };

  return (
    <div className="p-4">
      <h1 className="mb-8 text-4xl font-extrabold text-center text-orange-600">Admin Dashboard - YHA Shop</h1>

      <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-3">
        <div className="p-6 text-center transition-transform duration-300 transform bg-white shadow-lg rounded-xl hover:scale-105">
          <h3 className="text-xl font-semibold text-gray-800">Total Products</h3>
          <p className="mt-2 text-3xl font-bold text-orange-600">{products.length}</p>
        </div>
        <div className="p-6 text-center transition-transform duration-300 transform bg-white shadow-lg rounded-xl hover:scale-105">
          <h3 className="text-xl font-semibold text-gray-800">Total Orders</h3>
          <p className="mt-2 text-3xl font-bold text-orange-600">{orders.length}</p>
        </div>
        <div className="p-6 text-center transition-transform duration-300 transform bg-white shadow-lg rounded-xl hover:scale-105">
          <h3 className="text-xl font-semibold text-gray-800">Total Users</h3>
          <p className="mt-2 text-3xl font-bold text-orange-600">{users.length}</p>
        </div>
      </div>

      <section className="mb-12">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold text-orange-600">Categories</h2>
          <Link to="/admin/categories" className="font-medium text-orange-500 hover:text-orange-600">
            Manage Categories
          </Link>
        </div>
        {mockCategories.length === 0 ? (
          <p className="text-gray-600">No categories available.</p>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {mockCategories.slice(0, 6).map((category) => (
              <div
                key={category._id}
                className="p-6 transition-shadow duration-300 bg-white shadow-md rounded-xl hover:shadow-xl"
              >
                <h3 className="text-lg font-semibold text-gray-800 truncate">{category.name}</h3>
                <p className="text-gray-600">{category.description || 'No description'}</p>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="mb-12">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold text-orange-600">Products</h2>
          <Link to="/admin/products" className="font-medium text-orange-500 hover:text-orange-600">
            Manage Products
          </Link>
        </div>
        {products.length === 0 ? (
          <p className="text-gray-600">No products available.</p>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {products.slice(0, 6).map((product) => (
              <div
                key={product._id}
                className="p-6 transition-shadow duration-300 bg-white shadow-md rounded-xl hover:shadow-xl"
              >
                <h3 className="text-lg font-semibold text-gray-800 truncate">{product.name}</h3>
                <p className="text-gray-600">Price: ${product.price.toFixed(2)}</p>
                <p className="text-gray-600">Stock: {product.stock}</p>
                <p className="text-gray-600">Category: {product.categoryId?.name || 'Uncategorized'}</p>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="mb-12">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold text-orange-600">Orders</h2>
          <Link to="/admin/orders" className="font-medium text-orange-500 hover:text-orange-600">
            Manage Orders
          </Link>
        </div>
        {orders.length === 0 ? (
          <p className="text-gray-600">No orders available.</p>
        ) : (
          <div className="space-y-4">
            {orders.slice(0, 5).map((order) => (
              <div
                key={order._id}
                className="p-6 transition-shadow duration-300 bg-white shadow-md rounded-xl hover:shadow-xl"
              >
                <p className="text-gray-800">Order ID: {order._id}</p>
                <p className="text-gray-600">User: {order.userId?.name || 'Unknown'}</p>
                <p className="text-gray-600">Total: ${order.total.toFixed(2)}</p>
                <p className="text-gray-600">Status: {order.status}</p>
              </div>
            ))}
          </div>
        )}
      </section>

      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold text-orange-600">Users</h2>
          <Link to="/admin/users" className="font-medium text-orange-500 hover:text-orange-600">
            Manage Users
          </Link>
        </div>
        {users.length === 0 ? (
          <p className="text-gray-600">No users available.</p>
        ) : (
          <div className="space-y-4">
            {users.slice(0, 5).map((user) => (
              <div
                key={user._id}
                className="flex items-center justify-between p-6 transition-shadow duration-300 bg-white shadow-md rounded-xl hover:shadow-xl"
              >
                <div>
                  <p className="font-medium text-gray-800">Name: {user.name}</p>
                  <p className="text-gray-600">Email: {user.email}</p>
                  <p className="text-gray-600">Role: {user.role}</p>
                </div>
                <button
                  onClick={() => handleDeleteUser(user._id)}
                  className="px-4 py-2 text-white transition-colors bg-red-500 rounded-lg hover:bg-red-600"
                  disabled={user.role === 'admin'}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default AdminDashboard;