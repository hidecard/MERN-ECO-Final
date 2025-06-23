import { useState } from 'react';

function CategoriesAdmin() {
  const [categories, setCategories] = useState([
    { _id: 'cat1', name: 'Electronics', description: 'Devices and gadgets' },
    { _id: 'cat2', name: 'Clothing', description: 'Apparel and accessories' },
  ]);
  const [form, setForm] = useState({ name: '', description: '' });
  const [editingId, setEditingId] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name) {
      alert('Category name is required');
      return;
    }

    if (editingId) {
      setCategories(categories.map((c) => (c._id === editingId ? { ...c, ...form } : c)));
      alert('Category updated');
    } else {
      const newCategory = { _id: `cat${categories.length + 1}`, ...form };
      setCategories([...categories, newCategory]);
      alert('Category created');
    }
    setForm({ name: '', description: '' });
    setEditingId(null);
  };

  const handleEdit = (category) => {
    setForm({
      name: category.name,
      description: category.description || '',
    });
    setEditingId(category._id);
  };

  const handleDelete = (id) => {
    if (!window.confirm('Are you sure you want to delete this category?')) return;
    setCategories(categories.filter((c) => c._id !== id));
    alert('Category deleted');
  };

  return (
    <div className="p-4">
      <h1 className="mb-6 text-3xl font-bold text-orange-600">Manage Categories</h1>

      <form onSubmit={handleSubmit} className="p-6 mb-8 bg-white rounded-lg shadow-md">
        <h2 className="mb-4 text-2xl font-semibold text-orange-600">{editingId ? 'Edit Category' : 'Add Category'}</h2>
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
          <div className="md:col-span-2">
            <label className="block text-gray-700">Description</label>
            <textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-orange-500"
            />
          </div>
        </div>
        <button
          type="submit"
          className="px-4 py-2 mt-4 text-white bg-orange-500 rounded-lg hover:bg-orange-600"
        >
          {editingId ? 'Update Category' : 'Create Category'}
        </button>
        {editingId && (
          <button
            type="button"
            onClick={() => {
              setForm({ name: '', description: '' });
              setEditingId(null);
            }}
            className="px-4 py-2 mt-4 ml-4 text-white bg-gray-500 rounded-lg hover:bg-gray-600"
          >
            Cancel
          </button>
        )}
      </form>

      <h2 className="mb-4 text-2xl font-semibold text-orange-600">Categories List</h2>
      {categories.length === 0 ? (
        <p className="text-gray-600">No categories available.</p>
      ) : (
        <div className="space-y-4">
          {categories.map((category) => (
            <div key={category._id} className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">{category.name}</h3>
                <p className="text-gray-600">{category.description || 'No description'}</p>
              </div>
              <div className="space-x-2">
                <button
                  onClick={() => handleEdit(category)}
                  className="px-4 py-2 text-white bg-orange-500 rounded-lg hover:bg-orange-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(category._id)}
                  className="px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600"
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

export default CategoriesAdmin;