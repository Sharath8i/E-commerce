import React, { useState, useEffect, useRef } from 'react';
import { FaSearch, FaTimes, FaHistory, FaFire } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const SearchBar = ({ onSearch, placeholder = "Search for products, brands and more..." }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [searchHistory, setSearchHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({});
  const searchRef = useRef(null);
  const navigate = useNavigate();

  // Load search history from localStorage
  useEffect(() => {
    const history = JSON.parse(localStorage.getItem('searchHistory') || '[]');
    setSearchHistory(history);
  }, []);

  // Load search filters
  useEffect(() => {
    fetch('http://localhost:5000/api/products/search/filters')
      .then(res => res.json())
      .then(data => setFilters(data))
      .catch(err => console.error('Failed to load filters:', err));
  }, []);

  // Handle search input changes
  const handleInputChange = async (value) => {
    setQuery(value);
    
    if (value.length >= 2) {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:5000/api/products/search/suggestions?q=${encodeURIComponent(value)}`);
        const data = await response.json();
        setSuggestions(data.suggestions || []);
        setShowSuggestions(true);
      } catch (error) {
        console.error('Failed to fetch suggestions:', error);
      } finally {
        setLoading(false);
      }
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  // Handle search submission
  const handleSearch = (searchQuery = query) => {
    if (!searchQuery.trim()) return;

    // Add to search history
    const newHistory = [searchQuery, ...searchHistory.filter(item => item !== searchQuery)].slice(0, 10);
    setSearchHistory(newHistory);
    localStorage.setItem('searchHistory', JSON.stringify(newHistory));

    // Navigate to search results
    navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    setShowSuggestions(false);
    setQuery('');
    
    if (onSearch) onSearch(searchQuery);
  };

  // Handle suggestion click
  const handleSuggestionClick = (suggestion) => {
    handleSearch(suggestion);
  };

  // Handle history item click
  const handleHistoryClick = (item) => {
    handleSearch(item);
  };

  // Remove from history
  const removeFromHistory = (item, e) => {
    e.stopPropagation();
    const newHistory = searchHistory.filter(historyItem => historyItem !== item);
    setSearchHistory(newHistory);
    localStorage.setItem('searchHistory', JSON.stringify(newHistory));
  };

  // Handle keyboard navigation
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
    }
  };

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Popular searches (you can customize these)
  const popularSearches = ['laptop', 'smartphone', 'headphones', 'shoes', 'watch'];

  return (
    <div className="search-container" ref={searchRef}>
      <div className="search-bar">
        <div className="search-input-wrapper">
          <FaSearch className="search-icon" />
          <input
            type="text"
            value={query}
            onChange={(e) => handleInputChange(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className="search-input"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="clear-button"
            >
              <FaTimes />
            </button>
          )}
        </div>
        <button
          onClick={() => handleSearch()}
          className="search-button"
          disabled={!query.trim()}
        >
          Search
        </button>
      </div>

      {/* Search Suggestions Dropdown */}
      {showSuggestions && (
        <div className="search-suggestions">
          {/* Loading state */}
          {loading && (
            <div className="suggestion-item loading">
              <div className="skeleton-text" style={{ width: '60%', height: '16px' }}></div>
            </div>
          )}

          {/* Search suggestions */}
          {suggestions.length > 0 && (
            <div className="suggestions-section">
              <div className="suggestions-header">
                <FaFire />
                <span>Suggestions</span>
              </div>
              {suggestions.map((suggestion, index) => (
                <div
                  key={index}
                  className="suggestion-item clickable"
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  <FaSearch className="suggestion-icon" />
                  <span>{suggestion}</span>
                </div>
              ))}
            </div>
          )}

          {/* Search history */}
          {searchHistory.length > 0 && (
            <div className="suggestions-section">
              <div className="suggestions-header">
                <FaHistory />
                <span>Recent Searches</span>
              </div>
              {searchHistory.slice(0, 5).map((item, index) => (
                <div
                  key={index}
                  className="suggestion-item clickable"
                  onClick={() => handleHistoryClick(item)}
                >
                  <FaHistory className="suggestion-icon" />
                  <span>{item}</span>
                  <button
                    onClick={(e) => removeFromHistory(item, e)}
                    className="remove-history"
                  >
                    <FaTimes />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Popular searches */}
          <div className="suggestions-section">
            <div className="suggestions-header">
              <FaFire />
              <span>Popular Searches</span>
            </div>
            <div className="popular-searches">
              {popularSearches.map((search, index) => (
                <button
                  key={index}
                  className="popular-search-tag"
                  onClick={() => handleSuggestionClick(search)}
                >
                  {search}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar; 