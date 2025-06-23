import { useState } from 'react';
import { Link } from 'react-router-dom';

function CheckoutForm() {
  const [shippingInfo, setShippingInfo] = useState({
    address: '',
    city: '',
    postalCode: '',
    country: '',
  });
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);

  const mockCart = {
    items: [
      { productId: { _id: '1', name: 'Product 1', price: 29.99 }, quantity: 2 },
      { productId: { _id: '2', name: 'Product 2', price: 49.99 }, quantity: 1 },
    ],
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setProcessing(true);
    setError(null);

    if (!shippingInfo.address || !shippingInfo.city || !shippingInfo.postalCode || !shippingInfo.country) {
      setError('Please fill in all shipping information fields');
      setProcessing(false);
      return;
    }

    setTimeout(() => {
      alert('Order placed successfully!');
      setProcessing(false);
      setShippingInfo({ address: '', city: '', postalCode: '', country: '' });
      document.location.href = '/orders';
    }, 1000);
  };

  const total = mockCart.items.reduce(
    (sum, item) => sum + item.productId.price * item.quantity,
    0
  );

  return (
    <div className="container max-w-lg p-8 mx-auto">
      <h1 className="mb-10 text-5xl font-extrabold text-orange-600">Checkout</h1>
      {mockCart.items.length === 0 ? (
        <div className="py-16 text-center bg-white border border-gray-200 rounded-xl">
          <svg className="w-16 h-16 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h18M3 3l2 18h14l2-18H3zm5 7h8" />
          </svg>
          <p className="mt-4 text-xl text-gray-600">Your cart is empty.</p>
          <Link to="/" className="inline-block mt-4 font-semibold text-orange-500 hover:text-orange-600">
            Shop Now
          </Link>
        </div>
      ) : (
        <div className="p-8 bg-white border border-gray-200 rounded-xl">
          <h2 className="mb-6 text-2xl font-extrabold text-gray-800">
            Order Summary (${total.toFixed(2)})
          </h2>
          <div className="pt-4 mb-6 border-t border-gray-200">
            {mockCart.items.map((item) => (
              <div key={item.productId._id} className="flex justify-between mb-3 text-gray-700">
                <span className="truncate">{item.productId.name} (x{item.quantity})</span>
                <span>${(item.productId.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <form onSubmit={handleSubmit}>
            <h3 className="mb-4 text-xl font-extrabold text-orange-600">Shipping Information</h3>
            <div className="grid gap-6">
              <div className="relative">
                <input
                  type="text"
                  name="address"
                  value={shippingInfo.address}
                  onChange={handleInputChange}
                  className="w-full p-3 transition-all duration-300 border rounded-lg peer focus:ring-2 focus:ring-orange-500"
                  required
                  placeholder=" "
                />
                <label className="absolute top-0 px-1 text-sm text-gray-700 transition-all -translate-y-1/2 bg-white left-3 peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500">
                  Address
                </label>
              </div>
              <div className="relative">
                <input
                  type="text"
                  name="city"
                  value={shippingInfo.city}
                  onChange={handleInputChange}
                  className="w-full p-3 transition-all duration-300 border rounded-lg peer focus:ring-2 focus:ring-orange-500"
                  required
                  placeholder=" "
                />
                <label className="absolute top-0 px-1 text-sm text-gray-700 transition-all -translate-y-1/2 bg-white left-3 peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500">
                  City
                </label>
              </div>
              <div className="relative">
                <input
                  type="text"
                  name="postalCode"
                  value={shippingInfo.postalCode}
                  onChange={handleInputChange}
                  className="w-full p-3 transition-all duration-300 border rounded-lg peer focus:ring-2 focus:ring-orange-500"
                  required
                  placeholder=" "
                />
                <label className="absolute top-0 px-1 text-sm text-gray-700 transition-all -translate-y-1/2 bg-white left-3 peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500">
                  Postal Code
                </label>
              </div>
              <div className="relative">
                <input
                  type="text"
                  name="country"
                  value={shippingInfo.country}
                  onChange={handleInputChange}
                  className="w-full p-3 transition-all duration-300 border rounded-lg peer focus:ring-2 focus:ring-orange-500"
                  required
                  placeholder=" "
                />
                <label className="absolute top-0 px-1 text-sm text-gray-700 transition-all -translate-y-1/2 bg-white left-3 peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500">
                  Country
                </label>
              </div>
            </div>
            {error && (
              <div className="flex items-center p-4 mt-4 text-red-700 bg-red-100 rounded-lg">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {error}
              </div>
            )}
            <button
              type="submit"
              disabled={processing}
              className="w-full px-6 py-3 mt-6 text-white transition-all duration-300 bg-orange-500 rounded-xl hover:bg-orange-600 disabled:bg-orange-300 disabled:cursor-not-allowed"
            >
              {processing ? 'Processing...' : `Place Order ($${total.toFixed(2)})`}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

function Checkout() {
  return <CheckoutForm />;
}

export default Checkout;