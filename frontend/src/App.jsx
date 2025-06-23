import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/user/Navbar';
import Sidebar from './components/admin/Sidebar';
import Home from './components/user/Home';
import Cart from './components/user/Cart';
import ProductDetail from './components/user/ProductDetail';
import Login from './components/user/Login';
import Register from './components/user/Register';
import Checkout from './components/user/Checkout';
import Orders from './components/user/Orders';
import AdminDashboard from './components/admin/AdminDashboard';
import CategoriesAdmin from './components/admin/CategoriesAdmin';
import OrdersAdmin from './components/admin/OrdersAdmin';
import ProductsAdmin from './components/admin/ProductsAdmin';
import UsersAdmin from './components/admin/UsersAdmin';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Layout() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <div className="flex min-h-screen">
      {isAdminRoute && <Sidebar />}
      <div className="flex-1">
        {isAdminRoute || <Navbar />}
        <main className="p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/categories" element={<CategoriesAdmin />} />
            <Route path="/admin/orders" element={<OrdersAdmin />} />
            <Route path="/admin/products" element={<ProductsAdmin />} />
            <Route path="/admin/users" element={<UsersAdmin />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Layout />
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;