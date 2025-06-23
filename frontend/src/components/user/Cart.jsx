import { Link } from 'react-router-dom';

function Cart() {
  const mockCart = {
    items: [
      { productId: { _id: '1', name: 'Product 1', price: 29.99, imageURLs: ['https://mbg.com.my/cdn/shop/files/Vietnam-White-Dragon-Fruit-S-4-Pcs-TropicalExotic8_1024x1024.jpg?v=1748368575'] }, quantity: 2 },
    ]
  };

  const total = mockCart.items.reduce(
    (sum, item) => (item.productId ? sum + item.productId.price * item.quantity : sum),
    0
  );

  return (
    <div className="container p-8 mx-auto">
      <h1 className="mb-10 text-5xl font-extrabold text-orange-600">Your Cart</h1>
      {mockCart.items.length === 0 ? (
        <div className="py-16 text-center bg-white border border-gray-100 rounded-xl">
          <svg className="w-16 h-16 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h18M3 3l2 18h14l2-18H3zm5 7h8" />
          </svg>
          <p className="mt-4 text-xl text-gray-600">Your cart is empty.</p>
          <Link to="/" className="inline-block mt-4 font-semibold text-orange-500 hover:text-orange-600">
            Shop Now
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {mockCart.items.map(item => (
            item.productId && (
              <div
                key={item.productId._id}
                className="flex flex-col items-center p-8 bg-white border border-gray-100 sm:flex-row rounded-xl"
              >
                <img
                  src={item.productId.imageURLs?.[0]}
                  alt={item.productId.name}
                  className="object-cover w-32 h-32 mb-4 rounded-lg sm:mb-0 sm:mr-6"
                />
                <div className="flex-1 text-center sm:text-left">
                  <h3 className="text-xl font-bold text-gray-800">{item.productId.name}</h3>
                  <p className="text-lg font-extrabold text-orange-600">${item.productId.price.toFixed(2)}</p>
                  <div className="flex items-center justify-center mt-4 space-x-4 sm:justify-start">
                    <div className="flex items-center space-x-2">
                      <button className="px-3 py-1 text-gray-800 bg-gray-200 rounded-lg hover:bg-gray-300">-</button>
                      <span className="font-semibold text-gray-800">{item.quantity}</span>
                      <button className="px-3 py-1 text-gray-800 bg-gray-200 rounded-lg hover:bg-gray-300">+</button>
                    </div>
                    <button className="px-4 py-2 text-white bg-orange-500 rounded-xl hover:bg-orange-600">Remove</button>
                  </div>
                </div>
              </div>
            )
          ))}
          <div className="mt-10 text-right">
            <h2 className="text-2xl font-extrabold text-gray-800">Total: ${total.toFixed(2)}</h2>
            <Link
              to="/checkout"
              className="inline-block px-6 py-3 mt-4 text-white bg-orange-500 rounded-xl hover:bg-orange-600"
            >
              Proceed to Checkout
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;