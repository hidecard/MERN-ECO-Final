import { useState } from 'react';
     import { mockUsers } from '../../lib/mockData';

     function UsersAdmin() {
       const [users, setUsers] = useState(mockUsers);

       const [form, setForm] = useState({
         name: '',
         email: '',
         password: '',
         role: 'user',
       });
       const [editingId, setEditingId] = useState(null);

       const handleSubmit = (e) => {
         e.preventDefault();
         if (!form.name || !form.email || (!editingId && !form.password)) {
           alert(!editingId ? 'Please fill in all required fields' : 'Name and email are required');
           return;
         }

         const userData = {
           name: form.name,
           email: form.email,
           role: form.role,
           ...(form.password && { password: form.password }),
         };

         if (editingId) {
           setUsers(users.map((u) => (u._id === editingId ? { ...u, ...userData } : u)));
           alert('User updated');
         } else {
           const newUser = { _id: `user${users.length + 1}`, ...userData };
           setUsers([...users, newUser]);
           alert('User created');
         }
         setForm({ name: '', email: '', password: '', role: 'user' });
         setEditingId(null);
       };

       const handleEdit = (user) => {
         setForm({
           name: user.name,
           email: user.email,
           password: '',
           role: user.role,
         });
         setEditingId(user._id);
       };

       const handleDelete = (id) => {
         if (!window.confirm('Are you sure you want to delete this user?')) return;
         setUsers(users.filter((u) => u._id !== id));
         alert('User deleted');
       };

       return (
         <div className="p-4">
           <h1 className="mb-6 text-3xl font-bold text-orange-600">Manage Users</h1>

           <form onSubmit={handleSubmit} className="p-6 mb-8 bg-white rounded-lg shadow-md">
             <h2 className="mb-4 text-2xl font-semibold text-orange-600">
               {editingId ? 'Edit User' : 'Create User'}
             </h2>
             <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
               <div>
                 <label className="block text-gray-700">Name</label>
                 <input
                   type="text"
                   value={form.name}
                   onChange={(e) => setForm({ ...form, name: e.target.value })}
                   className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-orange-500"
                   required
                 />
               </div>
               <div>
                 <label className="block text-gray-700">Email</label>
                 <input
                   type="email"
                   value={form.email}
                   onChange={(e) => setForm({ ...form, email: e.target.value })}
                   className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-orange-500"
                   required
                 />
               </div>
               <div>
                 <label className="block text-gray-700">
                   {editingId ? 'New Password (optional)' : 'Password'}
                 </label>
                 <input
                   type="password"
                   value={form.password}
                   onChange={(e) => setForm({ ...form, password: e.target.value })}
                   className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-orange-500"
                   placeholder={editingId ? 'Leave blank to keep unchanged' : ''}
                 />
               </div>
               <div>
                 <label className="block text-gray-700">Role</label>
                 <select
                   value={form.role}
                   onChange={(e) => setForm({ ...form, role: e.target.value })}
                   className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-orange-500"
                 >
                   <option value="user">User</option>
                   <option value="admin">Admin</option>
                 </select>
               </div>
             </div>
             <button
               type="submit"
               className="px-4 py-2 mt-4 text-white bg-orange-500 rounded-lg hover:bg-orange-600"
             >
               {editingId ? 'Update User' : 'Create User'}
             </button>
             {editingId && (
               <button
                 type="button"
                 onClick={() => {
                   setForm({ name: '', email: '', password: '', role: 'user' });
                   setEditingId(null);
                 }}
                 className="px-4 py-2 mt-4 ml-4 text-white bg-gray-500 rounded-lg hover:bg-gray-600"
               >
                 Cancel
               </button>
             )}
           </form>

           <h2 className="mb-4 text-2xl font-semibold text-orange-600">Users List</h2>
           {users.length === 0 ? (
             <p className="text-gray-600">No users available.</p>
           ) : (
             <div className="space-y-4">
               {users.map((user) => (
                 <div key={user._id} className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md">
                   <div>
                     <p className="text-gray-800">Name: {user.name}</p>
                     <p className="text-gray-600">Email: {user.email}</p>
                     <p className="text-gray-600">Role: {user.role}</p>
                   </div>
                   <div className="space-x-2">
                     <button
                       onClick={() => handleEdit(user)}
                       className="px-4 py-2 text-white bg-orange-500 rounded-lg hover:bg-orange-600"
                     >
                       Edit
                     </button>
                     <button
                       onClick={() => handleDelete(user._id)}
                       className="px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600"
                       disabled={user.role === 'admin'}
                     >
                       Delete
                     </button>
                   </div>
                 </div>
               ))}
             </div>
           )}
         </div>
       );
     }

     export default UsersAdmin;