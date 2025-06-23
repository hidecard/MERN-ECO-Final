import { useParams, Link } from 'react-router-dom';
import StarRating from './StarRating';

function ProductDetail() {
  const { id } = useParams();
  const mockProduct = {
    _id: id,
    name: 'Sample Product',
    price: 29.99,
    stock: 10,
    imageURLs: ['https://mbg.com.my/cdn/shop/files/Thailand-Red-Elephant-Tusk-1_5Kg-Exotic-Fruits_1024x1024.jpg?v=1748973333'],
    categoryId: { name: 'Electronics' },
    description: 'A high-quality product.',
    averageRating: 4
  };
  const mockReviews = [
    { _id: 'r1', rating: 4, comment: 'Great product!', userId: { name: 'User 1' } },
    { _id: 'r2', rating: 5, comment: 'Really satisfied.', userId: { name: 'User 2' } }
  ];

  return (
    <div className="container p-4 mx-auto">
      <h1 className="mb-8 text-3xl font-extrabold text-orange-600">{mockProduct.name}</h1>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div>
          <img
            src={mockProduct.imageURLs?.[0]}
            alt={mockProduct.name}
            className="w-full h-64 lg:h-[32rem] object-cover rounded-xl"
          />
        </div>
        <div className="flex flex-col justify-between">
          <div>
            <p className="text-lg font-extrabold text-orange-600">Price: ${mockProduct.price.toFixed(2)}</p>
            <p className={`text-sm mt-1 ${mockProduct.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {mockProduct.stock > 0 ? 'In Stock' : 'Out of Stock'}
            </p>
            <p className="text-gray-600">Category: {mockProduct.categoryId?.name}</p>
            <p className="mt-4 text-gray-800">{mockProduct.description}</p>
          </div>
          <button
            disabled={mockProduct.stock === 0}
            className={`mt-6 px-6 py-3 rounded-xl ${mockProduct.stock > 0 ? 'bg-orange-500 text-white hover:bg-orange-600' : 'bg-gray-300 text-gray-600'}`}
          >
            {mockProduct.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
          </button>
        </div>
      </div>
      <section className="mt-8">
        <h2 className="mb-6 text-2xl font-extrabold text-orange-600">Reviews</h2>
        {mockReviews.length === 0 ? (
          <div className="py-10 text-center bg-white border border-gray-200 rounded-xl">
            <p className="text-lg text-gray-600">No reviews yet. Be the first to review!</p>
          </div>
        ) : (
          <div className="space-y-6">
            {mockReviews.map(review => (
              <div key={review._id} className="flex items-start p-4 bg-white border border-gray-200 rounded-xl">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center w-10 h-10 font-bold text-white bg-orange-500 rounded-full">
                    {review.userId?.name?.[0] || 'A'}
                  </div>
                </div>
                <div className="ml-4">
                  <StarRating rating={review.rating} />
                  <p className="mt-2 text-gray-600">{review.comment}</p>
                  <p className="text-sm text-gray-500">By {review.userId?.name || 'Anonymous'}</p>
                </div>
              </div>
            ))}
          </div>
        )}
        <div className="p-6 mt-8 bg-white border border-gray-200 rounded-xl">
          <h3 className="mb-4 text-xl font-extrabold text-orange-600">Write a Review</h3>
          <div className="grid gap-6">
            <div>
              <label className="block mb-2 text-gray-700">Rating</label>
              <StarRating rating={0} />
            </div>
            <div>
              <label className="block mb-2 text-gray-700">Comment</label>
              <textarea
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-500"
                rows="4"
                required
              />
            </div>
          </div>
          <button
            className="px-6 py-3 mt-6 text-white bg-orange-500 rounded-xl hover:bg-orange-600"
          >
            Submit Review
          </button>
        </div>
      </section>
    </div>
  );
}

export default ProductDetail;