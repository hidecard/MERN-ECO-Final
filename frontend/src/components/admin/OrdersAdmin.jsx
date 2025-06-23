import { useState } from 'react';
     import { mockOrders } from '../../lib/mockData';

     function OrdersAdmin() {
       const [orders, setOrders] = useState(mockOrders);

       const handleUpdateStatus = (id, status) => {
         setOrders(orders.map((o) => (o._id === id ? { ...o, status } : o)));
         alert('Order status updated');
       };

       return (
         <div className="p-4">
           <h1 className="mb-6 text-3xl font-bold text-orange-600">Manage Orders</h1>
           <h2 className="mb-4 text-2xl font-semibold text-orange-600">Orders List</h2>
           {orders.length === 0 ? (
             <p className="text-gray-600">No orders available.</p>
           ) : (
             <div className="space-y-4">
               {orders.map((order) => (
                 <div key={order._id} className="p-4 bg-white rounded-lg shadow-md">
                   <p className="text-gray-800">Order ID: {order._id}</p>
                   <p className="text-gray-600">User: {order.userId?.name || 'Unknown'}</p>
                   <p className="text-gray-600">Total: ${order.total.toFixed(2)}</p>
                   <div className="flex items-center space-x-2">
                     <p className="text-gray-600">Status:</p>
                     <select
                       value={order.status}
                       onChange={(e) => handleUpdateStatus(order._id, e.target.value)}
                       className="p-2 border rounded-lg focus:ring-2 focus:ring-orange-500"
                     >
                       {['pending', 'processing', 'shipped', 'delivered'].map((status) => (
                         <option key={status} value={status}>
                           {status.charAt(0).toUpperCase() + status.slice(1)}
                         </option>
                       ))}
                     </select>
                   </div>
                 </div>
               ))}
             </div>
           )}
         </div>
       );
     }

     export default OrdersAdmin;