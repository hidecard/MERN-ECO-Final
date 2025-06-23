import { useState } from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const mockCart = {
    items: [
      { productId: { _id: '1', name: 'Product 1' }, quantity: 2 },
      { productId: { _id: '2', name: 'Product 2' }, quantity: 1 },
    ],
  };
  const cartItemCount = mockCart.items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="sticky top-0 z-50 p-4 bg-white shadow-md">
      <div className="container flex items-center justify-between mx-auto">
        <Link to="/" className="text-2xl font-extrabold tracking-tight text-orange-600 sm:text-3xl">
          YHA Shop
        </Link>
        <button
          className="text-gray-800 md:hidden hover:text-orange-600"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
        <div
          className={`md:flex md:space-x-6 items-center ${
            isMenuOpen ? 'block' : 'hidden'
          } absolute md:static top-16 left-0 w-full md:w-auto bg-white md:bg-transparent p-4 md:p-0`}
        >
          <Link
            to="/"
            className="block mb-2 text-gray-800 transition duration-300 md:inline-block hover:text-orange-600 md:mb-0"
            aria-label="Home"
          >
            Home
          </Link>
          <Link
            to="/cart"
            className="relative block mb-2 text-gray-800 transition duration-300 md:inline-block hover:text-orange-600 md:mb-0"
            aria-label="Cart"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h18M3 3l2 18h14l2-18H3zm5 7h8" />
            </svg>
            {cartItemCount > 0 && (
              <span className="absolute flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-orange-500 rounded-full -top-2 -right-2">
                {cartItemCount}
              </span>
            )}
          </Link>
          <Link
            to="/orders"
            className="block mb-2 text-gray-800 transition duration-300 md:inline-block hover:text-orange-600 md:mb-0"
            aria-label="Orders"
          >
            Orders
          </Link>
          <Link
            to="/login"
            className="block mb-2 text-gray-800 transition duration-300 md:inline-block hover:text-orange-600 md:mb-0"
            aria-label="Login"
          >
            Login
          </Link>
            <Link
              to="/admin"
              className="px-4 py-2 text-white transition-colors bg-orange-500 rounded-lg hover:bg-orange-600"
            >
              Admin
            </Link>
          <Link
            to="/register"
            className="block px-4 py-2 text-white transition-all duration-300 bg-orange-500 md:inline-block rounded-xl hover:bg-orange-600"
            aria-label="Register"
          >
            Register
          </Link>
          
        </div>
      </div>
    </nav>
  );
}

export default Navbar;