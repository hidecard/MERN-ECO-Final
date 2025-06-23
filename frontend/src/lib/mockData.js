export const mockCategories = [
  { _id: 'cat1', name: 'Electronics', description: 'Devices and gadgets' },
  { _id: 'cat2', name: 'Clothing', description: 'Apparel and accessories' },
];

export const mockProducts = [
  {
    _id: 'prod1',
    name: 'Product 1',
    description: 'High-quality gadget',
    price: 29.99,
    stock: 10,
    categoryId: mockCategories[0],
    imageURLs: ['https://mbg.com.my/cdn/shop/files/India-Thompson-Grape-500GPack-Grapes_1024x1024.jpg?v=1747850118'],
  },
  {
    _id: 'prod2',
    name: 'Product 2',
    description: 'Stylish apparel',
    price: 49.99,
    stock: 5,
    categoryId: mockCategories[1],
    imageURLs: ['https://mbg.com.my/cdn/shop/files/Turkiye-Apricot-350gPack-Stone-Fruits_1024x1024.jpg?v=1748282256'],
  },
];

export const mockOrders = [
  { _id: 'order1', userId: { name: 'User 1' }, total: 79.97, status: 'Processing' },
  { _id: 'order2', userId: { name: 'User 2' }, total: 129.99, status: 'Pending' },
];

export const mockUsers = [
  { _id: 'user1', name: 'User 1', email: 'user1@example.com', role: 'user' },
  { _id: 'user2', name: 'Admin', email: 'admin@example.com', role: 'admin' },
];