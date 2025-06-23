import { useState } from 'react';

function ProductsAdmin() {
  const [products, setProducts] = useState([
    {
      _id: 'prod1',
      name: 'Product 1',
      description: 'High-quality gadget',
      price: 29.99,
      stock: 10,
      categoryId: { _id: 'cat1', name: 'Electronics' },
      imageURLs: ['https://mbg.com.my/cdn/shop/files/Turkiye-Apricot-350gPack-Stone-Fruits_1024x1024.jpg?v=1748282256'],
    },
    {
      _id: 'prod2',
      name: 'Product 2',
      description: 'Stylish apparel',
      price: 49.99,
      stock: 5,
      categoryId: { _id: 'cat2', name: 'Clothing' },
      imageURLs: ['https://mbg.com.my/cdn/shop/files/India-Thompson-Grape-500GPack-Grapes_1024x1024.jpg?v=1747850118'],
    },
  ]);

  const categories = [
    { _id: 'cat1', name: 'Electronics' },
    { _id: 'cat2', name: 'Clothing' },
  ];

  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    categoryId: '',
    imageURLs: '',
  });
  const [editingId, setEditingId] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.price || !form.stock || !form.categoryId) {
      alert('Please fill in all required fields');
      return;
    }

    const productData = {
      ...form,
      price: Number(form.price),
      stock: Number(form.stock),
      imageURLs: form.imageURLs ? [form.imageURLs] : [],
      categoryId: categories.find((c) => c._id === form.categoryId) || { _id: form.categoryId, name: 'Unknown' },
    };

    if (editingId) {
      setProducts(products.map((p) => (p._id === editingId ? { ...p, ...productData } : p)));
      alert('Product updated');
    } else {
      const newProduct = { _id: `prod${products.length + 1}`, ...productData };
      setProducts([...products, newProduct]);
      alert('Product created');
    }
    setForm({ name: '', description: '', price: '', stock: '', categoryId: '', imageURLs: '' });
    setEditingId(null);
  };

  const handleEdit = (product) => {
    setForm({
      name: product.name,
      description: product.description || '',
      price: product.price,
      stock: product.stock,
      categoryId: product.categoryId?._id || '',
      imageURLs: product.imageURLs?.[0] || '',
    });
    setEditingId(product._id);
  };

  const handleDelete = (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    setProducts(products.filter((p) => p._id !== id));
    alert('Product deleted');
  };

  return (
    <div className="p-4">
      <h1 className="mb-6 text-3xl font-bold text-orange-600">Manage Products</h1>

      <form onSubmit={handleSubmit} className="p-6 mb-8 bg-white rounded-lg shadow-md">
        <h2 className="mb-4 text-2xl font-semibold text-orange-600">{editingId ? 'Edit Product' : 'Add Product'}</h2>
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
            <label className="block text-gray-700">Price</label>
            <input
              type="number"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-orange-500"
              required
              min="0"
            />
          </div>
          <div>
            <label className="block text-gray-700">Stock</label>
            <input
              type="number"
              value={form.stock}
              onChange={(e) => setForm({ ...form, stock: e.target.value })}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-orange-500"
              required
              min="0"
            />
          </div>
          <div>
            <label className="block text-gray-700">Category</label>
            <select
              value={form.categoryId}
              onChange={(e) => setForm({ ...form, categoryId: e.target.value })}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-orange-500"
              required
            >
              <option value="">Select Category</option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div className="md:col-span-2">
            <label className="block text-gray-700">Description</label>
            <textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-orange-500"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-gray-700">Image URL</label>
            <input
              type="url"
              value={form.imageURLs}
              onChange={(e) => setForm({ ...form, imageURLs: e.target.value })}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-orange-500"
            />
          </div>
        </div>
        <button
          type="submit"
          className="px-4 py-2 mt-4 text-white bg-orange-500 rounded-lg hover:bg-orange-600"
        >
          {editingId ? 'Update Product' : 'Create Product'}
        </button>
        {editingId && (
          <button
            type="button"
            onClick={() => {
              setForm({ name: '', description: '', price: '', stock: '', categoryId: '', imageURLs: '' });
              setEditingId(null);
            }}
            className="px-4 py-2 mt-4 ml-4 text-white bg-gray-500 rounded-lg hover:bg-gray-600"
          >
            Cancel
          </button>
        )}
      </form>

      <h2 className="mb-4 text-2xl font-semibold text-orange-600">Products List</h2>
      {products.length === 0 ? (
        <p className="text-gray-600">No products available.</p>
      ) : (
        <div className="space-y-4">
          {products.map((product) => (
            <div key={product._id} className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
                <p className="text-gray-600">Price: ${product.price.toFixed(2)}</p>
                <p className="text-gray-600">Stock: {product.stock}</p>
                <p className="text-gray-600">Category: {product.categoryId?.name || 'Uncategorized'}</p>
              </div>
              <div className="space-x-2">
                <button
                  onClick={() => handleEdit(product)}
                  className="px-4 py-2 text-white bg-orange-500 rounded-lg hover:bg-orange-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(product._id)}
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

export default ProductsAdmin;