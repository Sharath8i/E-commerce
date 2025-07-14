import React, { useState } from 'react';
import { FaList, FaVenusMars, FaRupeeSign, FaTags, FaCheckCircle, FaBroom } from 'react-icons/fa';
import './App.css';

const categories = [
  'All', 'Electronics', 'Wearables', 'Audio', 'Photography', 'Gaming', 'Computers', 'Tablets', 'Men', 'Women', 'Kids', 'Books', 'Beauty', 'Sports', 'Kitchen', 'Pets', 'Stationery', 'Baby', 'Health', 'Accessories'
];
const genders = ['Men', 'Women', 'Kids', 'Unisex'];

export default function SidebarFilters({
  selectedCategory, setSelectedCategory,
  selectedGender, setSelectedGender,
  priceRange, setPriceRange,
  brand, setBrand,
  assured, setAssured,
  brandsList,
  onClearAll
}) {
  const [showCategories, setShowCategories] = useState(true);
  const [showGender, setShowGender] = useState(true);
  const [showPrice, setShowPrice] = useState(true);
  const [showBrand, setShowBrand] = useState(true);

  return (
    <aside className="sidebar-filters">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
        <span style={{ fontWeight: 800, fontSize: 20, letterSpacing: 0.5 }}>Filters</span>
        <button className="btn btn-clearall" style={{ background: 'none', border: 'none', color: '#2874f0', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }} onClick={onClearAll}><FaBroom /> CLEAR ALL</button>
      </div>
      <div className="filter-section">
        <div className="filter-title" onClick={() => setShowCategories(s => !s)}>
          <FaList style={{ marginRight: 6 }} /> CATEGORIES {showCategories ? '▲' : '▼'}
        </div>
        {showCategories && (
          <ul className="filter-list">
            {categories.map(cat => (
              <li key={cat} className={selectedCategory === cat ? 'active' : ''} onClick={() => setSelectedCategory(cat)}>{cat}</li>
            ))}
          </ul>
        )}
      </div>
      <div className="filter-section">
        <div className="filter-title" onClick={() => setShowGender(s => !s)}>
          <FaVenusMars style={{ marginRight: 6 }} /> GENDER {showGender ? '▲' : '▼'}
        </div>
        {showGender && (
          <ul className="filter-list">
            {genders.map(g => (
              <li key={g}>
                <label style={{ cursor: 'pointer' }}>
                  <input type="checkbox" checked={selectedGender.includes(g)} onChange={() => {
                    setSelectedGender(selectedGender.includes(g) ? selectedGender.filter(x => x !== g) : [...selectedGender, g]);
                  }} /> {g}
                </label>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="filter-section">
        <div className="filter-title" onClick={() => setShowPrice(s => !s)}>
          <FaRupeeSign style={{ marginRight: 6 }} /> PRICE {showPrice ? '▲' : '▼'}
        </div>
        {showPrice && (
          <div style={{ padding: '8px 0' }}>
            <input type="range" min={0} max={5000} step={100} value={priceRange[1]} onChange={e => setPriceRange([0, Number(e.target.value)])} />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
              <span>Min: ₹0</span>
              <span>Max: ₹{priceRange[1]}</span>
            </div>
          </div>
        )}
      </div>
      <div className="filter-section">
        <div className="filter-title" onClick={() => setShowBrand(s => !s)}>
          <FaTags style={{ marginRight: 6 }} /> BRAND {showBrand ? '▲' : '▼'}
        </div>
        {showBrand && (
          <div style={{ padding: '8px 0' }}>
            <input type="text" className="form-control" placeholder="Search Brand" value={brand} onChange={e => setBrand(e.target.value)} style={{ marginBottom: 8 }} />
            <ul className="filter-list">
              {brandsList.filter(b => b.toLowerCase().includes(brand.toLowerCase())).map(b => (
                <li key={b} onClick={() => setBrand(b)} style={{ cursor: 'pointer', fontWeight: brand === b ? 700 : 400 }}>{b}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <div className="filter-section">
        <label style={{ cursor: 'pointer', fontWeight: 600, display: 'flex', alignItems: 'center' }}>
          <FaCheckCircle color="#2874f0" style={{ marginRight: 6 }} />
          <input type="checkbox" checked={assured} onChange={() => setAssured(a => !a)} />
          <span style={{ marginLeft: 8 }}>Assured</span>
        </label>
      </div>
    </aside>
  );
} 