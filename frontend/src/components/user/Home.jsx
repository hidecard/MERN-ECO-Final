import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { mockProducts } from '../../lib/mockData';
import { EyeIcon } from '@heroicons/react/24/outline';

function StarRating({ rating, setRating, readOnly = false }) {
  const handleClick = (value) => {
    if (!readOnly && setRating) {
      setRating(value);
    }
  };

  return (
    <div className="flex items-center space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`w-5 h-5 ${star <= rating ? 'text-yellow-400' : 'text-gray-300'} ${
            !readOnly ? 'cursor-pointer hover:text-yellow-500 transition-colors' : ''
          }`}
          fill="currentColor"
          viewBox="0 0 24 24"
          onClick={() => handleClick(star)}
          aria-label={`Rate ${star} star${star > 1 ? 's' : ''}`}
        >
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
        </svg>
      ))}
    </div>
  );
}

function Home() {
  const [products] = useState(mockProducts.map(product => ({
    ...product,
    averageRating: Math.floor(Math.random() * 5 + 1), // Mock rating
  })));
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sort, setSort] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [recentlyViewed, setRecentlyViewed] = useState([]);
  const [bannerIndex, setBannerIndex] = useState(0);
  const [quickViewReviews, setQuickViewReviews] = useState([
    { _id: 'rev1', rating: 4, comment: 'Great product!', userId: { name: 'User 1' } },
    { _id: 'rev2', rating: 5, comment: 'Love it!', userId: { name: 'User 2' } },
  ]);
  const [reviewForm, setReviewForm] = useState({ rating: 0, comment: '' });
  const productsPerPage = 12;

  const banners = [
    { image: 'https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=2000', text: 'Summer Sale! Up to 50% Off' },
    { image: 'https://images.unsplash.com/photo-1556740738-b6a63e27c4df?auto=format&fit=crop&w=2000', text: 'New Arrivals In Stock!' },
    { image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=2000', text: 'Free Shipping on Orders Over $50' },
  ];

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('recentlyViewed') || '[]');
    setRecentlyViewed(stored);
  }, []);

  useEffect(() => {
    let result = products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = !selectedCategory || product.categoryId?.name === selectedCategory;
      let matchesPrice = true;
    
      return matchesSearch && matchesCategory && matchesPrice;
    });

    if (sort === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sort === 'price-desc') {
      result.sort((a, b) => b.price - b.price);
    } else if (sort === 'name-asc') {
      result.sort((a, b) => a.name.localeCompare(b.name));
    }

    setFilteredProducts(result);
    setCurrentPage(1);
  }, [searchQuery, selectedCategory, sort, products]);

  useEffect(() => {
    const interval = setInterval(() => {
      setBannerIndex(prev => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [banners.length]);

  const handleAddToCart = (productId, stock) => {
    if (stock === 0) {
      alert('This product is out of stock');
      return;
    }
    alert('Added to cart!');
  };


  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (reviewForm.rating === 0) {
      alert('Please select a rating');
      return;
    }
    if (!reviewForm.comment.trim()) {
      alert('Comment is required');
      return;
    }
    const newReview = {
      _id: `rev${quickViewReviews.length + 1}`,
      rating: reviewForm.rating,
      comment: reviewForm.comment,
      userId: { name: 'Guest' },
    };
    setQuickViewReviews([...quickViewReviews, newReview]);
    setReviewForm({ rating: 0, comment: '' });
    alert('Review submitted successfully!');
  };

  const categories = [...new Set(products.map(p => p.categoryId?.name || 'Uncategorized'))];
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  return (
   

      <div className="container px-4 py-8 mx-auto">
        <div className="relative p-8 mb-12 overflow-hidden text-white bg-gradient-to-r from-orange-600 to-orange-400 rounded-2xl md:p-16">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1556740738-b6a63e27c4df?auto=format&fit=crop&w=2000')] opacity-20 bg-cover bg-center"></div>
          <div className="relative z-10 text-center">
            <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl animate-fade-in">Welcome to YHA Shop</h1>
            <p className="mb-6 text-lg md:text-xl">Discover top-quality products at unbeatable prices!</p>
            <Link
              to="/products"
              className="inline-block px-8 py-3 font-semibold text-orange-600 transition-all bg-white rounded-full hover:bg-gray-100 focus:ring-2 focus:ring-orange-400"
            >
              Shop Now
            </Link>
          </div>
        </div>

        <div className="relative h-48 mb-12 overflow-hidden rounded-2xl">
          <img
            src={banners[bannerIndex].image}
            alt="Promotion"
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/50">
            <p className="text-xl font-semibold text-white md:text-2xl">{banners[bannerIndex].text}</p>
          </div>
          <div className="absolute flex gap-2 transform -translate-x-1/2 bottom-4 left-1/2">
            {banners.map((_, i) => (
              <button
                key={i}
                onClick={() => setBannerIndex(i)}
                className={`w-2 h-2 rounded-full ${i === bannerIndex ? 'bg-white' : 'bg-gray-400'}`}
              />
            ))}
          </div>
        </div>

        {products.length > 0 && (
          <div className="mb-12">
            <h2 className="mb-4 text-2xl font-bold text-gray-800">Featured Products</h2>
            <div className="flex pb-4 space-x-4 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
              {products.slice(0, 5).map(product => (
                <div
                  key={product._id}
                  className="flex-none w-64 p-4 transition-all bg-white rounded-lg shadow-md hover:shadow-lg"
                >
                  <img
                    src={product.imageURLs?.[0] || 'https://via.placeholder.com/150'}
                    alt={product.name}
                    className="object-cover w-full h-32 mb-2 rounded-lg"
                    loading="lazy"
                  />
                  <h3 className="text-sm font-semibold text-gray-800 line-clamp-1">{product.name}</h3>
                  <div className="flex mt-1">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-4 h-4 ${i < Math.round(product.averageRating || 0) ? 'text-yellow-400' : 'text-gray-300'} fill-current`}
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-lg font-bold text-orange-600">${product.price.toFixed(2)}</p>
                  <button
                    onClick={() => handleAddToCart(product._id, product.stock)}
                    disabled={product.stock === 0}
                    className={`w-full mt-2 px-4 py-2 rounded-lg text-sm ${
                      product.stock > 0
                        ? 'bg-orange-500 text-white hover:bg-orange-600'
                        : 'bg-gray-300 text-gray-600 cursor-not-allowed'
                    }`}
                  >
                    {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {recentlyViewed.length > 0 && (
          <div className="mb-12">
            <h2 className="mb-4 text-2xl font-bold text-gray-800">Recently Viewed</h2>
            <div className="flex pb-4 space-x-4 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
              {recentlyViewed.map(product => (
                <div
                  key={product._id}
                  className="flex-none w-64 p-4 transition-all bg-white rounded-lg shadow-md hover:shadow-lg"
                >
                  <img
                    src={product.imageURLs?.[0] || 'https://via.placeholder.com/150'}
                    alt={product.name}
                    className="object-cover w-full h-32 mb-2 rounded-lg"
                    loading="lazy"
                  />
                  <h3 className="text-sm font-semibold text-gray-800 line-clamp-1">{product.name}</h3>
                  <p className="text-lg font-bold text-orange-600">${product.price.toFixed(2)}</p>
                  <button
                    onClick={() => handleAddToCart(product._id, product.stock)}
                    disabled={product.stock === 0}
                    className={`w-full mt-2 px-4 py-2 rounded-lg text-sm ${
                      product.stock > 0
                        ? 'bg-orange-500 text-white hover:bg-orange-600'
                        : 'bg-gray-300 text-gray-600 cursor-not-allowed'
                    }`}
                  >
                    {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex flex-col items-center justify-between gap-4 mb-8 md:flex-row">
          <div className="relative w-full md:w-96">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for products..."
              className="w-full p-4 pr-12 transition-all bg-white border border-gray-200 rounded-full shadow-sm focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              aria-label="Search products"
            />
            <svg className="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 right-4 top-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <div className="flex flex-col w-full gap-4 md:flex-row md:w-auto">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="p-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500"
              aria-label="Filter by category"
            >
              <option value="">All Categories</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="p-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500"
              aria-label="Sort products"
            >
              <option value="">Sort By</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="name-asc">Name: A-Z</option>
            </select>
          </div>
        </div>

        {paginatedProducts.length === 0 ? (
          <div className="py-16 text-center">
            <svg className="w-16 h-16 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h18M3 3l2 18h14l2-18H3zm5 7h8" />
            </svg>
            <p className="mt-4 text-xl font-semibold text-gray-600">No products found.</p>
            <Link to="/products" className="inline-block mt-4 font-semibold text-orange-600 hover:text-orange-700">
              Browse All Products
            </Link>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {paginatedProducts.map(product => (
                <div
                  key={product._id}
                  className="overflow-hidden transition-all duration-300 transform bg-white shadow-md rounded-2xl hover:shadow-lg hover:-translate-y-1"
                >
                  <img
                    src={product.imageURLs?.[0] || 'https://via.placeholder.com/300'}
                    alt={product.name}
                    className="object-cover w-full h-48"
                    loading="lazy"
                  />
                  <div className="p-4">
                    <h2 className="text-lg font-semibold text-gray-800 line-clamp-2">{product.name}</h2>
                    <p className="text-sm text-gray-500">{product.categoryId?.name || 'Uncategorized'}</p>
                    <div className="flex mt-1">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`w-4 h-4 ${i < Math.round(product.averageRating || 0) ? 'text-yellow-400' : 'text-gray-300'} fill-current`}
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                        </svg>
                      ))}
                    </div>
                    <p className="mt-2 text-xl font-bold text-orange-600">${product.price.toFixed(2)}</p>
                    <p className={`text-sm mt-1 ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                    </p>
                    <div className="flex gap-2 mt-4">
                      <button
                        onClick={() => setQuickViewProduct(product)}
                        className="flex-1 px-4 py-2 text-center text-gray-700 transition-all bg-gray-100 rounded-lg hover:bg-gray-200 focus:ring-2 focus:ring-orange-400"
                        aria-label={`Quick view for ${product.name}`}
                      >
                        <EyeIcon className="w-5 h-5 mx-auto" />
                      </button>
                      <button
                        onClick={() => handleAddToCart(product._id, product.stock)}
                        disabled={product.stock === 0}
                        className={`flex-1 px-4 py-2 rounded-lg transition-all ${
                          product.stock > 0
                            ? 'bg-orange-500 text-white hover:bg-orange-600 focus:ring-2 focus:ring-orange-400'
                            : 'bg-gray-300 text-gray-600 cursor-not-allowed'
                        }`}
                        aria-label={`Add ${product.name} to cart`}
                      >
                        {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {totalPages > 1 && (
              <div className="flex justify-center gap-2 mt-8">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg disabled:opacity-50 hover:bg-gray-300"
                  aria-label="Previous page"
                >
                  Previous
                </button>
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`px-4 py-2 rounded-lg ${
                      currentPage === i + 1
                        ? 'bg-orange-500 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                    aria-label={`Page ${i + 1}`}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg disabled:opacity-50 hover:bg-gray-300"
                  aria-label="Next page"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}

        {quickViewProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-white rounded-2xl p-6 max-w-lg w-full mx-4 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-800">{quickViewProduct.name}</h3>
                <button
                  onClick={() => setQuickViewProduct(null)}
                  className="text-gray-500 hover:text-gray-700"
                  aria-label="Close quick view"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <img
                src={quickViewProduct.imageURLs?.[0] || 'https://via.placeholder.com/300'}
                alt={quickViewProduct.name}
                className="object-cover w-full h-48 mb-4 rounded-lg"
                loading="lazy"
              />
              <p className="mb-2 text-sm text-gray-500">{quickViewProduct.categoryId?.name || 'Uncategorized'}</p>
              <div className="flex mb-2">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-4 h-4 ${i < Math.round(quickViewProduct.averageRating || 0) ? 'text-yellow-400' : 'text-gray-300'} fill-current`}
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                ))}
              </div>
              <p className="mb-2 text-xl font-bold text-orange-600">${quickViewProduct.price.toFixed(2)}</p>
              <p className={`text-sm mb-2 ${quickViewProduct.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                {quickViewProduct.stock > 0 ? 'In Stock' : 'Out of Stock'}
              </p>
              <p className="mb-4 text-gray-600 line-clamp-3">{quickViewProduct.description || 'No description available.'}</p>
              <div className="flex gap-2 mb-4">
                <button
                  onClick={() => handleAddToCart(quickViewProduct._id, quickViewProduct.stock)}
                  disabled={quickViewProduct.stock === 0}
                  className={`flex-1 px-4 py-2 rounded-lg transition-all ${
                    quickViewProduct.stock > 0
                      ? 'bg-orange-500 text-white hover:bg-orange-600 focus:ring-2 focus:ring-orange-400'
                      : 'bg-gray-300 text-gray-600 cursor-not-allowed'
                  }`}
                  aria-label={`Add ${quickViewProduct.name} to cart`}
                >
                  {quickViewProduct.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
                </button>
                <Link
                  to={`/products/${quickViewProduct._id}`}
                  className="flex-1 px-4 py-2 text-center text-gray-700 transition-all bg-gray-100 rounded-lg hover:bg-gray-200 focus:ring-2 focus:ring-orange-400"
                  onClick={() => setQuickViewProduct(null)}
                  aria-label={`View details for ${quickViewProduct.name}`}
                >
                  View Details
                </Link>
              </div>

              <div className="mt-4">
                <h4 className="mb-2 text-lg font-semibold text-gray-800">Reviews</h4>
                {quickViewReviews.length === 0 ? (
                  <p className="text-gray-600">No reviews yet. Be the first to review!</p>
                ) : (
                  <div className="space-y-4 overflow-y-auto max-h-40">
                    {quickViewReviews.map(review => (
                      <div key={review._id} className="pt-2 border-t">
                        <StarRating rating={review.rating} readOnly />
                        <p className="mt-1 text-sm text-gray-600">{review.comment}</p>
                        <p className="text-xs text-gray-500">By {review.userId?.name || 'Anonymous'}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <form onSubmit={handleSubmitReview} className="mt-4">
                <h4 className="mb-2 text-lg font-semibold text-gray-800">Write a Review</h4>
                <div className="space-y-4">
                  <div>
                    <label className="block mb-1 text-sm text-gray-700" htmlFor="quick-view-rating">Rating</label>
                    <StarRating
                      rating={reviewForm.rating}
                      setRating={(value) => setReviewForm({ ...reviewForm, rating: value })}
                    />
                  </div>
                  <div>
                    <label className="block mb-1 text-sm text-gray-700" htmlFor="quick-view-comment">Comment</label>
                    <textarea
                      id="quick-view-comment"
                      value={reviewForm.comment}
                      onChange={(e) => setReviewForm({ ...reviewForm, comment: e.target.value })}
                      className="w-full p-2 transition-all border rounded-lg focus:ring-2 focus:ring-orange-500"
                      rows="3"
                      required
                      aria-label="Review comment"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full px-4 py-2 text-white transition-all bg-orange-500 rounded-lg hover:bg-orange-600 focus:ring-2 focus:ring-orange-400"
                    aria-label="Submit review"
                  >
                    Submit Review
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    
  );
}

export default Home;