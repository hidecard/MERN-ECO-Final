import { Link } from 'react-router-dom';

function Orders() {
  // Mock orders data
  const mockOrders = [
    {
      _id: 'order1',
      total: 79.97,
      status: 'Processing',
      items: [
        { productId: { _id: '1', name: 'Product 1' }, quantity: 2, price: 29.99 },
        { productId: { _id: '2', name: 'Product 2' }, quantity: 1, price: 49.99 },
      ],
    },
  ];

  return (
    <div className="container p-8 mx-auto">
      <h1 className="mb-10 text-5xl font-bold text-orange-600">Your Orders</h1>
      {mockOrders.length === 0 ? (
        <div className="py-16 text-center bg-white border border-gray-200 rounded-xl">
          <svg className="w-16 h-16 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17V7m0 10h6m-6 0H3m12 0h6M9 7h6M9 7H3m12 0h6" />
          </svg>
          <p className="mt-4 text-xl text-gray-600">No orders found.</p>
          <Link to="/" className="inline-block mt-4 font-semibold text-orange-500 hover:text-orange-600">
            Shop Now
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {mockOrders.map((order) => (
            <div key={order._id} className="p-6 transition-all duration-300 bg-white border border-gray-200 rounded-xl hover:shadow-lg">
              <h3 className="text-xl font-bold text-gray-800">Order ID: {order._id}</h3>
              <p className="text-gray-600">Total: ${order.total.toFixed(2)}</p>
              <p className="text-gray-600">Status: {order.status}</p>
              <h4 className="mt-4 text-lg font-bold text-orange-600">Items:</h4>
              <div className="mt-2 ml-4 space-y-2">
                {order.items.map((item) => (
                  <div key={item.productId._id} className="flex justify-between">
                    <div>
                      <p className="text-gray-800">{item.productId.name}</p>
                      <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                    </div>
                    <p className="text-gray-600">${item.price.toFixed(2)}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Orders;