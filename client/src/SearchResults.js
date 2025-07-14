import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { FaFilter, FaSort, FaTimes, FaStar, FaHeart, FaShoppingCart, FaCheckCircle, FaRupeeSign } from 'react-icons/fa';
import SearchBar from './SearchBar';
import SidebarFilters from './SidebarFilters';

const SearchResults = ({ addToCart, isWishlisted, toggleWishlist, user }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({});
  const [pagination, setPagination] = useState({});
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('relevance');
  const [currentPage, setCurrentPage] = useState(1);

  const query = searchParams.get('q') || '';
  const category = searchParams.get('category') || '';
  const brand = searchParams.get('brand') || '';
  const minPrice = searchParams.get('minPrice') || '';
  const maxPrice = searchParams.get('maxPrice') || '';
  const gender = searchParams.get('gender') || '';
  const assured = searchParams.get('assured') || '';

  // Fetch search results
  const fetchResults = async (page = 1) => {
    if (!query.trim()) return;

    setLoading(true);
    setError('');

    try {
      const params = new URLSearchParams({
        search: query,
        page: page.toString(),
        sort: sortBy,
        limit: '20'
      });

      if (category) params.append('category', category);
      if (brand) params.append('brand', brand);
      if (minPrice) params.append('minPrice', minPrice);
      if (maxPrice) params.append('maxPrice', maxPrice);
      if (gender) params.append('gender', gender);
      if (assured) params.append('assured', assured);

      const response = await fetch(`http://localhost:5000/api/products?${params}`);
      const data = await response.json();

      if (response.ok) {
        setResults(data.products || []);
        setPagination(data.pagination || {});
      } else {
        setError(data.message || 'Search failed');
      }
    } catch (err) {
      setError('Failed to fetch search results');
    } finally {
      setLoading(false);
    }
  };

  // Load filters
  const loadFilters = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/products/search/filters');
      const data = await response.json();
      setFilters(data);
    } catch (err) {
      console.error('Failed to load filters:', err);
    }
  };

  useEffect(() => {
    loadFilters();
  }, []);

  useEffect(() => {
    fetchResults(currentPage);
  }, [query, category, brand, minPrice, maxPrice, gender, assured, sortBy, currentPage]);

  // Handle filter changes
  const handleFilterChange = (filterType, value) => {
    const newParams = new URLSearchParams(searchParams);
    
    if (value && value !== 'All') {
      newParams.set(filterType, value);
    } else {
      newParams.delete(filterType);
    }
    
    newParams.set('page', '1');
    setSearchParams(newParams);
    setCurrentPage(1);
  };

  // Handle sort change
  const handleSortChange = (sort) => {
    setSortBy(sort);
    setCurrentPage(1);
  };

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  // Clear all filters
  const clearAllFilters = () => {
    const newParams = new URLSearchParams();
    newParams.set('q', query);
    setSearchParams(newParams);
    setCurrentPage(1);
  };

  // Product card component
  const ProductCard = ({ product }) => {
    const discount = product.oldPrice ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100) : 0;
    
    return (
      <div className="product-card search-result-card">
        <div className="product-image-container">
          <img src={product.img || product.images?.[0]} alt={product.name} className="product-image" />
          {discount > 0 && <div className="discount-badge">{discount}% OFF</div>}
          {product.assured && <div className="assured-badge">Assured</div>}
          <button
            className={`wishlist-btn ${isWishlisted(product._id) ? 'active' : ''}`}
            onClick={() => toggleWishlist(product._id)}
          >
            <FaHeart />
          </button>
        </div>
        
        <div className="product-info">
          <h3 className="product-name">{product.name}</h3>
          <div className="product-brand">{product.brand}</div>
          
          <div className="product-rating">
            <FaStar className="star-icon" />
            <span>{product.rating || 4.2}</span>
            <span className="rating-count">({product.reviewCount || 123})</span>
          </div>
          
          <div className="product-price">
            <span className="current-price">₹{product.price}</span>
            {product.oldPrice && (
              <span className="old-price">₹{product.oldPrice}</span>
            )}
          </div>
          
          <button
            className="add-to-cart-btn"
            onClick={() => addToCart(product)}
          >
            <FaShoppingCart /> Add to Cart
          </button>
        </div>
      </div>
    );
  };

  // Loading skeleton
  const LoadingSkeleton = () => (
    <div className="search-results-grid">
      {[...Array(8)].map((_, index) => (
        <div key={index} className="product-card skeleton-card">
          <div className="skeleton skeleton-img" style={{ height: 200 }} />
          <div className="skeleton skeleton-text" style={{ width: '80%', height: 16, marginTop: 12 }} />
          <div className="skeleton skeleton-text" style={{ width: '60%', height: 14, marginTop: 8 }} />
          <div className="skeleton skeleton-text" style={{ width: '40%', height: 14, marginTop: 8 }} />
        </div>
      ))}
    </div>
  );

  if (!query.trim()) {
    return (
      <div className="search-page">
        <div className="search-header">
          <SearchBar />
        </div>
        <div className="no-search-query">
          <h2>Search for products</h2>
          <p>Enter a search term to find products</p>
        </div>
      </div>
    );
  }

  return (
    <div className="search-page">
      {/* Search Header */}
      <div className="search-header">
        <SearchBar />
      </div>

      {/* Search Results Header */}
      <div className="search-results-header">
        <div className="search-info">
          <h2>Search Results for "{query}"</h2>
          <p>{pagination.total || 0} products found</p>
        </div>
        
        <div className="search-controls">
          <button
            className="filter-toggle-btn"
            onClick={() => setShowFilters(!showFilters)}
          >
            <FaFilter /> Filters
          </button>
          
          <div className="sort-dropdown">
            <select
              value={sortBy}
              onChange={(e) => handleSortChange(e.target.value)}
              className="sort-select"
            >
              <option value="relevance">Relevance</option>
              <option value="priceLow">Price: Low to High</option>
              <option value="priceHigh">Price: High to Low</option>
              <option value="rating">Customer Rating</option>
              <option value="newest">Newest First</option>
              <option value="popularity">Popularity</option>
            </select>
          </div>
        </div>
      </div>

      <div className="search-content">
        {/* Filters Sidebar */}
        {showFilters && (
          <div className="filters-sidebar">
            <div className="filters-header">
              <h3>Filters</h3>
              <button onClick={clearAllFilters} className="clear-filters-btn">
                Clear All
              </button>
            </div>
            
            <SidebarFilters
              selectedCategory={category}
              selectedGender={gender}
              priceRange={[minPrice || 0, maxPrice || 5000]}
              brand={brand}
              assured={assured === 'true'}
              onCategoryChange={(cat) => handleFilterChange('category', cat)}
              onGenderChange={(gen) => handleFilterChange('gender', gen)}
              onPriceChange={(range) => {
                handleFilterChange('minPrice', range[0]);
                handleFilterChange('maxPrice', range[1]);
              }}
              onBrandChange={(br) => handleFilterChange('brand', br)}
              onAssuredChange={(ass) => handleFilterChange('assured', ass ? 'true' : '')}
            />
          </div>
        )}

        {/* Search Results */}
        <div className="search-results-main">
          {loading ? (
            <LoadingSkeleton />
          ) : error ? (
            <div className="search-error">
              <h3>Search Error</h3>
              <p>{error}</p>
            </div>
          ) : results.length === 0 ? (
            <div className="no-results">
              <h3>No products found</h3>
              <p>Try adjusting your search terms or filters</p>
              <button onClick={clearAllFilters} className="clear-filters-btn">
                Clear All Filters
              </button>
            </div>
          ) : (
            <>
              <div className="search-results-grid">
                {results.map(product => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>

              {/* Pagination */}
              {pagination.total > 1 && (
                <div className="pagination">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={!pagination.hasPrev}
                    className="pagination-btn"
                  >
                    Previous
                  </button>
                  
                  {[...Array(pagination.total)].map((_, index) => {
                    const page = index + 1;
                    if (
                      page === 1 ||
                      page === pagination.total ||
                      (page >= currentPage - 2 && page <= currentPage + 2)
                    ) {
                      return (
                        <button
                          key={page}
                          onClick={() => handlePageChange(page)}
                          className={`pagination-btn ${page === currentPage ? 'active' : ''}`}
                        >
                          {page}
                        </button>
                      );
                    } else if (
                      page === currentPage - 3 ||
                      page === currentPage + 3
                    ) {
                      return <span key={page} className="pagination-ellipsis">...</span>;
                    }
                    return null;
                  })}
                  
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={!pagination.hasNext}
                    className="pagination-btn"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchResults; 