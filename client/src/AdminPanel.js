import React, { useState, useEffect } from 'react';
import './App.css';

const ADMIN_USER = 'admin';
const ADMIN_PASS = 'admin123';

export default function AdminPanel() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [tab, setTab] = useState('products');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [modalProduct, setModalProduct] = useState(null);
  const [categories, setCategories] = useState(['Electronics', 'Wearables', 'Audio', 'Books', 'Beauty']);
  const [users, setUsers] = useState([{ name: 'Demo User', email: 'user@example.com' }]);
  // Add state for category/user modals
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [modalCategory, setModalCategory] = useState('');
  const [editCategoryIdx, setEditCategoryIdx] = useState(null);
  const [showUserModal, setShowUserModal] = useState(false);
  const [modalUser, setModalUser] = useState({ name: '', email: '' });
  const [editUserIdx, setEditUserIdx] = useState(null);

  useEffect(() => {
    if (loggedIn && tab === 'products') {
      setLoading(true);
      fetch('http://localhost:5000/api/products')
        .then(res => res.json())
        .then(data => { setProducts(data.products || []); setLoading(false); });
    }
  }, [loggedIn, tab]);

  const handleLogin = e => {
    e.preventDefault();
    if (username === ADMIN_USER && password === ADMIN_PASS) {
      setLoggedIn(true);
    } else {
      alert('Invalid admin credentials');
    }
  };

  const handleDeleteProduct = id => {
    if (!window.confirm('Delete this product?')) return;
    fetch(`http://localhost:5000/api/products/${id}`, { method: 'DELETE' })
      .then(() => setProducts(products.filter(p => p._id !== id)));
  };

  const handleSaveProduct = (prod) => {
    const method = prod._id ? 'PUT' : 'POST';
    const url = prod._id ? `http://localhost:5000/api/products/${prod._id}` : 'http://localhost:5000/api/products';
    fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(prod)
    })
      .then(res => res.json())
      .then(data => {
        setShowModal(false);
        setModalProduct(null);
        setLoading(true);
        fetch('http://localhost:5000/api/products')
          .then(res => res.json())
          .then(data => { setProducts(data.products || []); setLoading(false); });
      });
  };

  // Category CRUD handlers
  const handleSaveCategory = () => {
    if (editCategoryIdx !== null) {
      setCategories(categories.map((c, i) => i === editCategoryIdx ? modalCategory : c));
    } else {
      setCategories([...categories, modalCategory]);
    }
    setShowCategoryModal(false);
    setModalCategory('');
    setEditCategoryIdx(null);
  };
  const handleDeleteCategory = idx => {
    if (window.confirm('Delete this category?')) setCategories(categories.filter((_, i) => i !== idx));
  };
  // User CRUD handlers
  const handleSaveUser = () => {
    if (editUserIdx !== null) {
      setUsers(users.map((u, i) => i === editUserIdx ? modalUser : u));
    } else {
      setUsers([...users, modalUser]);
    }
    setShowUserModal(false);
    setModalUser({ name: '', email: '' });
    setEditUserIdx(null);
  };
  const handleDeleteUser = idx => {
    if (window.confirm('Delete this user?')) setUsers(users.filter((_, i) => i !== idx));
  };

  if (!loggedIn) {
    return (
      <div className="admin-login" style={{ maxWidth: 340, margin: '80px auto', background: '#fff', borderRadius: 16, boxShadow: '0 2px 16px #0001', padding: 36 }}>
        <h2 style={{ fontWeight: 800, marginBottom: 18, fontSize: 28, color: '#222', letterSpacing: 0.5 }}>Admin Login</h2>
        <form onSubmit={handleLogin}>
          <input type="text" className="form-control mb-2" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} required style={{ width: '100%', marginBottom: 16, padding: 12, borderRadius: 10, border: '1px solid #ddd', fontSize: 16, background: '#fafbfc' }} />
          <input type="password" className="form-control mb-2" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required style={{ width: '100%', marginBottom: 16, padding: 12, borderRadius: 10, border: '1px solid #ddd', fontSize: 16, background: '#fafbfc' }} />
          <button type="submit" className="btn btn-primary w-100" style={{ borderRadius: 24, fontWeight: 700, background: 'linear-gradient(90deg,#ff9900,#ffb347)', border: 'none', padding: 12, fontSize: 17, marginTop: 4, boxShadow: '0 2px 8px #ff990033' }}>Login</button>
        </form>
      </div>
    );
  }

  return (
    <div className="admin-panel" style={{ maxWidth: 1100, margin: '40px auto', background: '#fff', borderRadius: 18, boxShadow: '0 2px 16px #0001', padding: 32 }}>
      <h2 style={{ fontWeight: 800, fontSize: 28, marginBottom: 18 }}>Admin Dashboard</h2>
      <div style={{ display: 'flex', gap: 18, marginBottom: 24 }}>
        <button className={`btn btn-tab${tab === 'products' ? ' active' : ''}`} onClick={() => setTab('products')}>Products</button>
        <button className={`btn btn-tab${tab === 'categories' ? ' active' : ''}`} onClick={() => setTab('categories')}>Categories</button>
        <button className={`btn btn-tab${tab === 'users' ? ' active' : ''}`} onClick={() => setTab('users')}>Users</button>
      </div>
      {tab === 'products' && (
        <div>
          <button className="btn btn-primary mb-3" style={{ borderRadius: 18, fontWeight: 700, marginBottom: 18 }} onClick={() => { setShowModal(true); setModalProduct({}); }}>Add Product</button>
          {loading ? <div>Loading products...</div> : (
            <table className="table table-striped" style={{ width: '100%', background: '#fafbfc', borderRadius: 12 }}>
              <thead>
                <tr><th>Name</th><th>Price</th><th>Category</th><th>Actions</th></tr>
              </thead>
              <tbody>
                {products.map(prod => (
                  <tr key={prod._id}>
                    <td>{prod.name}</td>
                    <td>${prod.price}</td>
                    <td>{prod.category}</td>
                    <td>
                      <button className="btn btn-sm btn-outline-primary" onClick={() => { setShowModal(true); setModalProduct(prod); }}>Edit</button>
                      <button className="btn btn-sm btn-outline-danger" onClick={() => handleDeleteProduct(prod._id)} style={{ marginLeft: 8 }}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          {showModal && (
            <div className="modal-overlay" onClick={() => setShowModal(false)}>
              <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: 400 }}>
                <button className="modal-close" onClick={() => setShowModal(false)}>&times;</button>
                <h3>{modalProduct && modalProduct._id ? 'Edit Product' : 'Add Product'}</h3>
                <form onSubmit={e => { e.preventDefault(); handleSaveProduct(modalProduct); }}>
                  <input type="text" className="form-control mb-2" placeholder="Name" value={modalProduct?.name || ''} onChange={e => setModalProduct({ ...modalProduct, name: e.target.value })} required />
                  <input type="number" className="form-control mb-2" placeholder="Price" value={modalProduct?.price || ''} onChange={e => setModalProduct({ ...modalProduct, price: e.target.value })} required />
                  <input type="text" className="form-control mb-2" placeholder="Category" value={modalProduct?.category || ''} onChange={e => setModalProduct({ ...modalProduct, category: e.target.value })} required />
                  <input type="text" className="form-control mb-2" placeholder="Image URL" value={modalProduct?.image || ''} onChange={e => setModalProduct({ ...modalProduct, image: e.target.value })} />
                  <button type="submit" className="btn btn-primary w-100">Save</button>
                </form>
              </div>
            </div>
          )}
        </div>
      )}
      {tab === 'categories' && (
        <div>
          <h4>Categories</h4>
          <button className="btn btn-primary mb-2" style={{ borderRadius: 18, fontWeight: 700, marginBottom: 12 }} onClick={() => { setShowCategoryModal(true); setModalCategory(''); setEditCategoryIdx(null); }}>Add Category</button>
          <ul>
            {categories.map((cat, i) => (
              <li key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                {cat}
                <button className="btn btn-sm btn-outline-primary" onClick={() => { setShowCategoryModal(true); setModalCategory(cat); setEditCategoryIdx(i); }}>Edit</button>
                <button className="btn btn-sm btn-outline-danger" onClick={() => handleDeleteCategory(i)}>Delete</button>
              </li>
            ))}
          </ul>
          {showCategoryModal && (
            <div className="modal-overlay" onClick={() => setShowCategoryModal(false)}>
              <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: 340 }}>
                <button className="modal-close" onClick={() => setShowCategoryModal(false)}>&times;</button>
                <h3>{editCategoryIdx !== null ? 'Edit Category' : 'Add Category'}</h3>
                <input type="text" className="form-control mb-2" placeholder="Category Name" value={modalCategory} onChange={e => setModalCategory(e.target.value)} required />
                <button className="btn btn-primary w-100" onClick={handleSaveCategory}>Save</button>
              </div>
            </div>
          )}
        </div>
      )}
      {tab === 'users' && (
        <div>
          <h4>Users</h4>
          <button className="btn btn-primary mb-2" style={{ borderRadius: 18, fontWeight: 700, marginBottom: 12 }} onClick={() => { setShowUserModal(true); setModalUser({ name: '', email: '' }); setEditUserIdx(null); }}>Add User</button>
          <ul>
            {users.map((u, i) => (
              <li key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                {u.name} ({u.email})
                <button className="btn btn-sm btn-outline-primary" onClick={() => { setShowUserModal(true); setModalUser(u); setEditUserIdx(i); }}>Edit</button>
                <button className="btn btn-sm btn-outline-danger" onClick={() => handleDeleteUser(i)}>Delete</button>
              </li>
            ))}
          </ul>
          {showUserModal && (
            <div className="modal-overlay" onClick={() => setShowUserModal(false)}>
              <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: 340 }}>
                <button className="modal-close" onClick={() => setShowUserModal(false)}>&times;</button>
                <h3>{editUserIdx !== null ? 'Edit User' : 'Add User'}</h3>
                <input type="text" className="form-control mb-2" placeholder="Name" value={modalUser.name} onChange={e => setModalUser({ ...modalUser, name: e.target.value })} required />
                <input type="email" className="form-control mb-2" placeholder="Email" value={modalUser.email} onChange={e => setModalUser({ ...modalUser, email: e.target.value })} required />
                <button className="btn btn-primary w-100" onClick={handleSaveUser}>Save</button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
} 