import React, { useState, useEffect } from 'react';
import './App.css';
import { FaShoppingCart, FaTshirt, FaFemale, FaMale, FaChild, FaHeadphones, FaCamera, FaGamepad, FaLaptop, FaTabletAlt, FaClock, FaVolumeUp, FaTimes, FaSearchPlus, FaShoePrints, FaKeyboard, FaMobileAlt, FaTv, FaCameraRetro, FaStar, FaTag, FaSuitcase, FaAppleAlt, FaUserCircle, FaSearch, FaCoffee, FaSun, FaLeaf, FaBlender, FaCar, FaHeart, FaFutbol, FaBasketballBall, FaStore, FaEllipsisH, FaCouch, FaPlane, FaPuzzlePiece, FaMotorcycle, FaBook, FaFacebookF, FaTwitter, FaYoutube, FaInstagram, FaHeart as FaHeartFilled, FaRegHeart, FaRupeeSign, FaCheckCircle, FaArrowRight } from 'react-icons/fa';
import { BrowserRouter as Router, Routes, Route, useNavigate, Link, useParams } from 'react-router-dom';
import SidebarFilters from './SidebarFilters';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import AdminPanel from './AdminPanel';
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';

// Helper to calculate discount
function getDiscount(product) {
  if (!product.oldPrice || !product.price) return 0;
  return Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100);
}

const categories = [
  { name: 'All', icon: <FaSearchPlus /> },
  { name: 'Electronics', icon: <FaClock /> },
  { name: 'Wearables', icon: <FaTshirt /> },
  { name: 'Audio', icon: <FaVolumeUp /> },
  { name: 'Photography', icon: <FaCamera /> },
  { name: 'Gaming', icon: <FaGamepad /> },
  { name: 'Computers', icon: <FaLaptop /> },
  { name: 'Tablets', icon: <FaTabletAlt /> },
  { name: 'Men', icon: <FaMale /> },
  { name: 'Women', icon: <FaFemale /> },
  { name: 'Kids', icon: <FaChild /> },
  { name: 'Books', icon: <FaBook /> },
  { name: 'Beauty', icon: <FaHeart /> },
  { name: 'Sports', icon: <FaFutbol /> },
  { name: 'Kitchen', icon: <FaCoffee /> },
  { name: 'Pets', icon: <FaAppleAlt /> },
  { name: 'Stationery', icon: <FaTag /> },
  { name: 'Baby', icon: <FaChild /> },
  { name: 'Health', icon: <FaLeaf /> },
  { name: 'Accessories', icon: <FaSun /> },
];

const homepageCategories = [
  { name: 'Grocery', icon: <FaAppleAlt />, img: 'https://img.icons8.com/color/96/000000/grocery-bag.png' },
  { name: 'Mobiles', icon: <FaMobileAlt />, img: 'https://img.icons8.com/color/96/000000/smartphone-tablet.png' },
  { name: 'Fashion', icon: <FaTshirt />, img: 'https://img.icons8.com/color/96/000000/t-shirt.png' },
  { name: 'Electronics', icon: <FaLaptop />, img: 'https://img.icons8.com/color/96/000000/laptop.png' },
  { name: 'Home & Furniture', icon: <FaCouch />, img: 'https://img.icons8.com/color/96/000000/sofa.png' },
  { name: 'Appliances', icon: <FaBlender />, img: 'https://img.icons8.com/color/96/000000/blender.png' },
  { name: 'Travel', icon: <FaPlane />, img: 'https://img.icons8.com/color/96/000000/airplane-take-off.png' },
  { name: 'Toys', icon: <FaPuzzlePiece />, img: 'https://img.icons8.com/color/96/000000/teddy-bear.png' },
  { name: 'Vehicles', icon: <FaMotorcycle />, img: 'https://img.icons8.com/color/96/000000/motorcycle.png' },
  { name: 'Books', icon: <FaBook />, img: 'https://img.icons8.com/color/96/000000/books.png' },
  { name: 'Beauty', icon: <FaHeart />, img: 'https://img.icons8.com/color/96/000000/lipstick.png' },
  { name: 'Sports', icon: <FaFutbol />, img: 'https://img.icons8.com/color/96/000000/soccer-ball.png' },
  { name: 'Kitchen', icon: <FaCoffee />, img: 'https://img.icons8.com/color/96/000000/kitchen-room.png' },
  { name: 'Pets', icon: <FaAppleAlt />, img: 'https://img.icons8.com/color/96/000000/dog.png' },
  { name: 'Stationery', icon: <FaTag />, img: 'https://img.icons8.com/color/96/000000/stationery.png' },
  { name: 'Baby', icon: <FaChild />, img: 'https://img.icons8.com/color/96/000000/baby.png' },
  { name: 'Health', icon: <FaLeaf />, img: 'https://img.icons8.com/color/96/000000/heart-health.png' },
  { name: 'Accessories', icon: <FaSun />, img: 'https://img.icons8.com/color/96/000000/sunglasses.png' },
  { name: 'Watches', icon: <FaClock />, img: 'https://img.icons8.com/color/96/000000/watch.png' },
  { name: 'Shoes', icon: <FaShoePrints />, img: 'https://img.icons8.com/color/96/000000/shoes.png' },
  { name: 'Cameras', icon: <FaCameraRetro />, img: 'https://img.icons8.com/color/96/000000/camera.png' },
  { name: 'Gaming', icon: <FaGamepad />, img: 'https://img.icons8.com/color/96/000000/controller.png' },
  { name: 'Audio', icon: <FaHeadphones />, img: 'https://img.icons8.com/color/96/000000/headphones.png' },
  { name: 'Laptops', icon: <FaLaptop />, img: 'https://img.icons8.com/color/96/000000/laptop.png' },
  { name: 'Tablets', icon: <FaTabletAlt />, img: 'https://img.icons8.com/color/96/000000/tablet.png' },
  { name: 'Men', icon: <FaMale />, img: 'https://img.icons8.com/color/96/000000/men-age-group-3.png' },
  { name: 'Women', icon: <FaFemale />, img: 'https://img.icons8.com/color/96/000000/women-age-group-3.png' },
  { name: 'Kids', icon: <FaChild />, img: 'https://img.icons8.com/color/96/000000/children.png' },
  { name: 'Office', icon: <FaSuitcase />, img: 'https://img.icons8.com/color/96/000000/briefcase.png' },
  { name: 'Stationery', icon: <FaTag />, img: 'https://img.icons8.com/color/96/000000/stationery.png' },
  { name: 'Home Decor', icon: <FaCouch />, img: 'https://img.icons8.com/color/96/000000/room.png' },
  { name: 'Bags', icon: <FaSuitcase />, img: 'https://img.icons8.com/color/96/000000/suitcase.png' },
  { name: 'Jewellery', icon: <FaStar />, img: 'https://img.icons8.com/color/96/000000/diamond.png' },
  { name: 'Lighting', icon: <FaSun />, img: 'https://img.icons8.com/color/96/000000/light-on.png' },
  { name: 'Garden', icon: <FaLeaf />, img: 'https://img.icons8.com/color/96/000000/garden.png' },
  { name: 'Car Accessories', icon: <FaCar />, img: 'https://img.icons8.com/color/96/000000/car.png' },
  { name: 'Musical Instruments', icon: <FaVolumeUp />, img: 'https://img.icons8.com/color/96/000000/guitar.png' },
  { name: 'Fitness', icon: <FaFutbol />, img: 'https://img.icons8.com/color/96/000000/dumbbell.png' },
  { name: 'Groceries', icon: <FaAppleAlt />, img: 'https://img.icons8.com/color/96/000000/grocery-bag.png' },
];

function CartPage({ cart, updateQty, removeFromCart, removeAllCart, total }) {
  return (
    <div className="cart-page" style={{ maxWidth: 500, margin: '40px auto', background: '#fff', borderRadius: 12, boxShadow: '0 2px 12px #0001', padding: 24 }}>
      <h2 style={{ fontWeight: 700, marginBottom: 24, textAlign: 'center' }}>Your Cart</h2>
      {cart.length === 0 ? (
        <div style={{ textAlign: 'center', color: '#888', marginTop: 40 }}>Your cart is empty.</div>
      ) : (
        <>
          <div>
            {cart.map(item => (
              <div key={item._id} style={{ display: 'flex', alignItems: 'center', marginBottom: 18, borderBottom: '1px solid #eee', paddingBottom: 12 }}>
                {item.image && <img src={item.image} alt={item.name} style={{ width: 56, height: 56, objectFit: 'cover', borderRadius: 8, marginRight: 16 }} />}
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: 16 }}>{item.name}</div>
                  <div style={{ color: '#888', fontSize: 13 }}>{item.category}</div>
                  <div style={{ fontSize: 14, marginTop: 4 }}>
                    <button onClick={() => updateQty(item._id, Math.max(1, item.qty - 1))} style={{ border: 'none', background: '#eee', borderRadius: 6, width: 28, height: 28, fontWeight: 700, marginRight: 6 }}>-</button>
                    <span style={{ margin: '0 8px' }}>{item.qty}</span>
                    <button onClick={() => updateQty(item._id, item.qty + 1)} style={{ border: 'none', background: '#eee', borderRadius: 6, width: 28, height: 28, fontWeight: 700, marginLeft: 6 }}>+</button>
                  </div>
                </div>
                <div style={{ fontWeight: 700, fontSize: 20, minWidth: 90, textAlign: 'right' }}><FaRupeeSign style={{ fontSize: 16, marginRight: 2 }} />{item.price}</div>
                <button onClick={() => removeFromCart(item._id)} style={{ border: 'none', background: 'none', color: '#e74c3c', fontSize: 22, marginLeft: 10, cursor: 'pointer' }}>&times;</button>
              </div>
            ))}
          </div>
          <div style={{ borderTop: '1px solid #eee', marginTop: 24, paddingTop: 16, textAlign: 'right' }}>
            <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 12 }}>Total: <FaRupeeSign style={{ fontSize: 16, marginRight: 2 }} />{total}</div>
            <button className="btn btn-success" style={{ borderRadius: 24, fontWeight: 600, background: '#28a745', border: 'none', width: 160 }}
              onClick={() => { removeAllCart(); window.alert('Order placed successfully!'); }}>
              Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}

function ProductPage({ addToCart, isWishlisted, toggleWishlist, user }) {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [similar, setSimilar] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [reviewLoading, setReviewLoading] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [reviewError, setReviewError] = useState('');
  const [reviewSuccess, setReviewSuccess] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedGender, setSelectedGender] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [brand, setBrand] = useState('');
  const [assured, setAssured] = useState(false);
  const [sort, setSort] = useState('popularity');
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:5000/api/products/${id}`)
      .then(res => res.json())
      .then(data => {
        if (data && data._id) {
          setProduct(data);
          fetch(`http://localhost:5000/api/products?category=${encodeURIComponent(data.category)}`)
            .then(res => res.json())
            .then(list => {
              setSimilar((list.products || []).filter(p => p._id !== data._id).slice(0, 8));
            });
        } else setError('Product not found');
        setLoading(false);
      })
      .catch(() => { setError('Error loading product'); setLoading(false); });
  }, [id]);

  // Fetch reviews
  useEffect(() => {
    if (!id) return;
    setReviewLoading(true);
    fetch(`http://localhost:5000/api/reviews/${id}`)
      .then(res => res.json())
      .then(data => {
        setReviews(data);
        setReviewLoading(false);
      })
      .catch(() => setReviewLoading(false));
  }, [id, reviewSuccess]);

  const userReview = user && reviews.find(r => r.user && r.user._id === user._id);
  const avgRating = reviews.length ? (reviews.reduce((a, r) => a + r.rating, 0) / reviews.length).toFixed(1) : null;

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    setReviewError('');
    setReviewSuccess('');
    if (!rating || !comment) {
      setReviewError('Please provide a rating and comment.');
      return;
    }
    try {
      const res = await fetch('http://localhost:5000/api/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ product: id, rating, comment })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to submit review');
      setReviewSuccess('Review submitted!');
      setRating(0);
      setComment('');
    } catch (err) {
      setReviewError(err.message);
    }
  };

  if (loading) return <div style={{ textAlign: 'center', margin: 60, color: '#888', fontSize: 22 }}>Loading...</div>;
  if (error) return <div style={{ textAlign: 'center', margin: 60, color: '#e74c3c', fontSize: 20 }}>{error}</div>;
  if (!product) return null;

  const brandsList = Array.from(new Set(similar.map(p => p.brand).filter(Boolean)));

  let sortedSimilar = [...similar];
  if (sort === 'priceLow') sortedSimilar.sort((a, b) => a.price - b.price);
  else if (sort === 'priceHigh') sortedSimilar.sort((a, b) => b.price - a.price);
  else if (sort === 'newest') sortedSimilar.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
// Popularity: default order

  // Skeleton loader component for similar products
  function SimilarProductSkeleton() {
    return (
      <div className="similar-product-card skeleton-card">
        <div className="skeleton skeleton-badge" style={{ width: 60, height: 18, marginBottom: 8 }} />
        <div className="skeleton skeleton-img" style={{ width: 90, height: 90, borderRadius: 10, marginBottom: 10 }} />
        <div className="skeleton skeleton-text" style={{ width: 80, height: 16, marginBottom: 6 }} />
        <div className="skeleton skeleton-text" style={{ width: 60, height: 14, marginBottom: 6 }} />
        <div className="skeleton skeleton-price" style={{ width: 50, height: 18, marginBottom: 8 }} />
        <div className="skeleton skeleton-badge" style={{ width: 48, height: 16, marginBottom: 4 }} />
      </div>
    );
  }

  // ... inside ProductPage, before return ...
  const similarProducts = (Array.isArray(similar) ? similar : products || []).filter(p =>
    p._id !== product._id &&
    p.category === product.category &&
    Math.abs(p.price - product.price) <= product.price * 0.2
  ).slice(0, 10);

  const topRatedProducts = (Array.isArray(similar) ? similar : products || []).filter(p =>
    p._id !== product._id &&
    p.category === product.category
  ).sort((a, b) => (b.rating || 0) - (a.rating || 0)).slice(0, 10);

  const sameBrandProducts = (Array.isArray(similar) ? similar : products || []).filter(p =>
    p._id !== product._id &&
    p.brand && product.brand && p.brand === product.brand
  ).slice(0, 10);
  // ... existing code ...

  // Add a fallback handler for product images
  const handleImgError = (e) => {
    e.target.onerror = null;
    e.target.src = '/no-image.png'; // Place a no-image.png in your public folder, or use a reliable placeholder URL
  };

  return (
    <>
      <div className="product-detail-modern-bg" style={{ background: 'linear-gradient(120deg, #e0e7ff 60%, #f5f7fa 100%)', minHeight: '100vh', padding: '0 0 48px 0' }}>
        <div className="product-detail-modern" style={{ maxWidth: 1100, margin: '48px auto 0 auto', background: 'rgba(255,255,255,0.98)', borderRadius: 28, boxShadow: '0 8px 32px #a5b4fc22', padding: 0, display: 'flex', flexWrap: 'wrap', gap: 0, overflow: 'hidden', position: 'relative' }}>
          {/* Left: Product Image/Gallery */}
          <div style={{ flex: '0 0 400px', background: 'linear-gradient(120deg, #f5f7fa 60%, #e0e7ff 100%)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 420, padding: 36 }}>
            {Array.isArray(product.images) && product.images.length > 1 ? (
              <Slider
                dots={true}
                infinite={true}
                speed={500}
                slidesToShow={1}
                slidesToScroll={1}
                arrows={true}
                className="product-image-carousel"
                style={{ width: 320, marginBottom: 18 }}
              >
                {product.images.map((img, idx) => (
                  <div key={idx}>
                    <img src={img} alt={product.name + ' ' + (idx + 1)} style={{ width: 320, height: 320, objectFit: 'contain', borderRadius: 18, background: '#fafbfc' }} />
                  </div>
                ))}
              </Slider>
            ) : product.image && (
              <img src={product.image} alt={product.name} style={{ width: 320, height: 320, objectFit: 'contain', borderRadius: 18, background: '#fafbfc', marginBottom: 18 }} onError={handleImgError} />
            )}
          </div>
          {/* Right: Product Info */}
          <div style={{ flex: 1, padding: '48px 40px 40px 40px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', minWidth: 0 }}>
            <h2 style={{ fontWeight: 900, fontSize: 38, marginBottom: 10, color: '#222', letterSpacing: 0.5 }}>{product.name}</h2>
            <div style={{ color: '#888', fontSize: 18, marginBottom: 18 }}>{product.category}</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 18, marginBottom: 18 }}>
              <span style={{ fontWeight: 800, fontSize: 32, color: '#ff9900', letterSpacing: 0.5 }}><FaRupeeSign style={{ fontSize: 24, marginRight: 4 }} />{product.price}</span>
              {product.oldPrice && (
                <span style={{ color: '#888', fontSize: 22, textDecoration: 'line-through', marginLeft: 8 }}><FaRupeeSign style={{ fontSize: 16, marginRight: 2 }} />{product.oldPrice}</span>
              )}
              {getDiscount(product) > 0 && (
                <span style={{ color: '#388e3c', fontSize: 18, fontWeight: 700, marginLeft: 10, background: '#e8f5e9', borderRadius: 8, padding: '2px 12px' }}>{getDiscount(product)}% off</span>
              )}
              {getDiscount(product) >= 50 && (
                <span className="hot-deal-badge" style={{ marginLeft: 10 }}>Hot Deal</span>
              )}
            </div>
            {product.assured && <span style={{ display: 'inline-block', background: '#e3f0ff', color: '#2874f0', fontWeight: 700, borderRadius: 8, padding: '2px 12px', fontSize: 16, marginBottom: 16 }}>Assured</span>}
            <div style={{ margin: '18px 0 32px 0', fontSize: 19, color: '#444', lineHeight: 1.6 }}>{product.description}</div>
            <div style={{ display: 'flex', gap: 18, alignItems: 'center', marginBottom: 24 }}>
              <button className="btn btn-primary" style={{ borderRadius: 28, fontWeight: 700, fontSize: 20, padding: '14px 44px', background: 'linear-gradient(90deg,#ff9900,#ffb347)', boxShadow: '0 2px 12px #ff990033' }} onClick={() => addToCart(product)}>Add to Cart</button>
              <button className="btn btn-outline-secondary" style={{ borderRadius: 28, fontWeight: 700, fontSize: 20, padding: '14px 44px', border: '2px solid #ff9900', color: '#ff9900', background: '#fff' }} onClick={() => toggleWishlist(product._id)}>{isWishlisted(product._id) ? 'Remove from Wishlist' : 'Add to Wishlist'}</button>
            </div>
            <div style={{ marginBottom: 18 }}>
              <span style={{ fontWeight: 700, fontSize: 20 }}>Average Rating: </span>
              <span style={{ color: '#ff9900', fontWeight: 800, fontSize: 20 }}>{avgRating} / 5</span>
              <span style={{ marginLeft: 8, color: '#888', fontSize: 17 }}>({reviews.length} review{reviews.length !== 1 ? 's' : ''})</span>
            </div>
            {/* Reviews Section */}
            <div style={{ marginTop: 18, background: '#f7f8fa', borderRadius: 16, boxShadow: '0 2px 12px #a5b4fc11', padding: 24 }}>
              <h3 style={{ fontWeight: 800, fontSize: 22, marginBottom: 16, color: '#2874f0', letterSpacing: 0.2 }}>Customer Reviews</h3>
              {reviewLoading ? <div>Loading reviews...</div> : (
                <>
                  {reviews.length === 0 && <div style={{ color: '#888', marginBottom: 8 }}>No reviews yet.</div>}
                  <div style={{ marginBottom: 18 }}>
                    {reviews.map(r => (
                      <div key={r._id} style={{ background: '#fff', borderRadius: 10, padding: 14, marginBottom: 12, boxShadow: '0 1px 6px #a5b4fc11' }}>
                        <div style={{ fontWeight: 700, fontSize: 16, color: '#2874f0' }}>{r.user?.name || 'User'}</div>
                        <div style={{ color: '#ff9900', fontWeight: 800, fontSize: 17, margin: '2px 0' }}>{'★'.repeat(r.rating)}{'☆'.repeat(5 - r.rating)}</div>
                        <div style={{ fontSize: 16, color: '#444', marginTop: 2 }}>{r.comment}</div>
                        <div style={{ fontSize: 13, color: '#888', marginTop: 2 }}>{new Date(r.createdAt).toLocaleString()}</div>
                      </div>
                    ))}
                  </div>
                  {user ? (
                    reviews.find(r => r.user && r.user._id === user._id) ? (
                      <div style={{ color: '#388e3c', fontWeight: 700, marginBottom: 8 }}>You already reviewed this product.</div>
                    ) : (
                      <form onSubmit={handleReviewSubmit} style={{ background: '#e3f0ff', borderRadius: 12, padding: 18, marginBottom: 10, boxShadow: '0 1px 6px #a5b4fc11' }}>
                        <div style={{ marginBottom: 10 }}>
                          <span style={{ fontWeight: 700, color: '#2874f0' }}>Your Rating: </span>
                          {[1,2,3,4,5].map(star => (
                            <span key={star} style={{ cursor: 'pointer', color: star <= rating ? '#ff9900' : '#ccc', fontSize: 26 }} onClick={() => setRating(star)}>
                              ★
                            </span>
                          ))}
                        </div>
                        <textarea
                          className="form-control"
                          placeholder="Write your review..."
                          value={comment}
                          onChange={e => setComment(e.target.value)}
                          rows={3}
                          style={{ width: '100%', marginBottom: 10, borderRadius: 8, border: '1px solid #ddd', padding: 10, fontSize: 16 }}
                        />
                        <button className="btn btn-primary" type="submit" style={{ borderRadius: 20, fontWeight: 700, background: '#ff9900', border: 'none', padding: '10px 32px', fontSize: 17 }}>Submit Review</button>
                        {reviewError && <div style={{ color: '#e74c3c', marginTop: 8 }}>{reviewError}</div>}
                        {reviewSuccess && <div style={{ color: '#388e3c', marginTop: 8 }}>{reviewSuccess}</div>}
                      </form>
                    )
                  ) : (
                    <div style={{ color: '#888', marginBottom: 8 }}>Login to write a review.</div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* Similar products and sidebar remain unchanged */}
      {/* After the reviews section, before similar products/sidebar */}
      <div style={{ margin: '48px 0 0 0' }}>
        {similarProducts.length > 0 && (
          <div style={{ maxWidth: 1100, margin: '0 auto 32px auto', background: 'rgba(255,255,255,0.98)', borderRadius: 22, boxShadow: '0 4px 24px #a5b4fc22', padding: '28px 0 18px 0' }}>
            <h3 style={{ fontWeight: 900, fontSize: 26, margin: '0 0 24px 36px', color: '#2874f0', letterSpacing: 0.2 }}>Similar Products</h3>
            <Slider dots={false} infinite={false} speed={500} slidesToShow={5} slidesToScroll={2} responsive={[
              { breakpoint: 1100, settings: { slidesToShow: 4 } },
              { breakpoint: 900, settings: { slidesToShow: 3 } },
              { breakpoint: 600, settings: { slidesToShow: 2 } },
              { breakpoint: 400, settings: { slidesToShow: 1 } },
            ]} arrows={true}>
              {similarProducts.map(rp => (
                <div key={rp._id} style={{ padding: 8 }}>
                  <div className="product-card modern-card card-fade-in card-animated" style={{ minWidth: 170, maxWidth: 210, margin: '0 auto', background: '#fff', borderRadius: 18, boxShadow: '0 2px 12px #0001', padding: 18, position: 'relative', cursor: 'pointer' }} onClick={() => navigate(`/product/${rp._id}`)}>
                    {rp.image && (
                      <img src={rp.image} alt={rp.name} style={{ width: 100, height: 100, objectFit: 'contain', borderRadius: 12, margin: '0 auto 12px auto', background: '#fafbfc', boxShadow: '0 1px 6px #ff99001a' }} onError={handleImgError} />
                    )}
                    <div className="product-name" style={{ fontWeight: 700, fontSize: 16, marginBottom: 2, textAlign: 'center', color: '#222' }}>{rp.name}</div>
                    <div className="product-category" style={{ color: '#888', fontSize: 13, marginBottom: 2, textAlign: 'center' }}>{rp.category}</div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 2 }}>
                      <span className="product-price" style={{ fontWeight: 800, color: '#ff9900', fontSize: 17 }}><FaRupeeSign style={{ fontSize: 15, marginRight: 2 }} />{rp.price}</span>
                      {rp.oldPrice && (
                        <span className="product-oldprice" style={{ color: '#888', fontSize: 13, textDecoration: 'line-through', marginLeft: 6 }}><FaRupeeSign style={{ fontSize: 11, marginRight: 1 }} />{rp.oldPrice}</span>
                      )}
                      {getDiscount(rp) > 0 && (
                        <span className="product-discount" style={{ color: '#388e3c', fontSize: 13, fontWeight: 600, marginLeft: 8 }}>{getDiscount(rp)}% off</span>
                      )}
                    </div>
                    <button className="btn btn-primary" style={{ borderRadius: 16, fontWeight: 600, fontSize: 15, padding: '8px 0', marginTop: 8, width: '100%' }} onClick={e => { e.stopPropagation(); addToCart(rp); }}>Add to Cart</button>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        )}
        {topRatedProducts.length > 0 && (
          <div style={{ maxWidth: 1100, margin: '0 auto 32px auto', background: 'rgba(255,255,255,0.98)', borderRadius: 22, boxShadow: '0 4px 24px #a5b4fc22', padding: '28px 0 18px 0' }}>
            <h3 style={{ fontWeight: 900, fontSize: 26, margin: '0 0 24px 36px', color: '#388e3c', letterSpacing: 0.2 }}>Top Rated in this Category</h3>
            <Slider dots={false} infinite={false} speed={500} slidesToShow={5} slidesToScroll={2} responsive={[
              { breakpoint: 1100, settings: { slidesToShow: 4 } },
              { breakpoint: 900, settings: { slidesToShow: 3 } },
              { breakpoint: 600, settings: { slidesToShow: 2 } },
              { breakpoint: 400, settings: { slidesToShow: 1 } },
            ]} arrows={true}>
              {topRatedProducts.map(rp => (
                <div key={rp._id} style={{ padding: 8 }}>
                  <div className="product-card modern-card card-fade-in card-animated" style={{ minWidth: 170, maxWidth: 210, margin: '0 auto', background: '#fff', borderRadius: 18, boxShadow: '0 2px 12px #0001', padding: 18, position: 'relative', cursor: 'pointer' }} onClick={() => navigate(`/product/${rp._id}`)}>
                    {rp.image && (
                      <img src={rp.image} alt={rp.name} style={{ width: 100, height: 100, objectFit: 'contain', borderRadius: 12, margin: '0 auto 12px auto', background: '#fafbfc', boxShadow: '0 1px 6px #ff99001a' }} onError={handleImgError} />
                    )}
                    <div className="product-name" style={{ fontWeight: 700, fontSize: 16, marginBottom: 2, textAlign: 'center', color: '#222' }}>{rp.name}</div>
                    <div className="product-category" style={{ color: '#888', fontSize: 13, marginBottom: 2, textAlign: 'center' }}>{rp.category}</div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 2 }}>
                      <span className="product-price" style={{ fontWeight: 800, color: '#ff9900', fontSize: 17 }}><FaRupeeSign style={{ fontSize: 15, marginRight: 2 }} />{rp.price}</span>
                      {rp.oldPrice && (
                        <span className="product-oldprice" style={{ color: '#888', fontSize: 13, textDecoration: 'line-through', marginLeft: 6 }}><FaRupeeSign style={{ fontSize: 11, marginRight: 1 }} />{rp.oldPrice}</span>
                      )}
                      {getDiscount(rp) > 0 && (
                        <span className="product-discount" style={{ color: '#388e3c', fontSize: 13, fontWeight: 600, marginLeft: 8 }}>{getDiscount(rp)}% off</span>
                      )}
                    </div>
                    <button className="btn btn-primary" style={{ borderRadius: 16, fontWeight: 600, fontSize: 15, padding: '8px 0', marginTop: 8, width: '100%' }} onClick={e => { e.stopPropagation(); addToCart(rp); }}>Add to Cart</button>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        )}
        {sameBrandProducts.length > 0 && (
          <div style={{ maxWidth: 1100, margin: '0 auto 32px auto', background: 'rgba(255,255,255,0.98)', borderRadius: 22, boxShadow: '0 4px 24px #a5b4fc22', padding: '28px 0 18px 0' }}>
            <h3 style={{ fontWeight: 900, fontSize: 26, margin: '0 0 24px 36px', color: '#ff9900', letterSpacing: 0.2 }}>More from {product.brand}</h3>
            <Slider dots={false} infinite={false} speed={500} slidesToShow={5} slidesToScroll={2} responsive={[
              { breakpoint: 1100, settings: { slidesToShow: 4 } },
              { breakpoint: 900, settings: { slidesToShow: 3 } },
              { breakpoint: 600, settings: { slidesToShow: 2 } },
              { breakpoint: 400, settings: { slidesToShow: 1 } },
            ]} arrows={true}>
              {sameBrandProducts.map(rp => (
                <div key={rp._id} style={{ padding: 8 }}>
                  <div className="product-card modern-card card-fade-in card-animated" style={{ minWidth: 170, maxWidth: 210, margin: '0 auto', background: '#fff', borderRadius: 18, boxShadow: '0 2px 12px #0001', padding: 18, position: 'relative', cursor: 'pointer' }} onClick={() => navigate(`/product/${rp._id}`)}>
                    {rp.image && (
                      <img src={rp.image} alt={rp.name} style={{ width: 100, height: 100, objectFit: 'contain', borderRadius: 12, margin: '0 auto 12px auto', background: '#fafbfc', boxShadow: '0 1px 6px #ff99001a' }} onError={handleImgError} />
                    )}
                    <div className="product-name" style={{ fontWeight: 700, fontSize: 16, marginBottom: 2, textAlign: 'center', color: '#222' }}>{rp.name}</div>
                    <div className="product-category" style={{ color: '#888', fontSize: 13, marginBottom: 2, textAlign: 'center' }}>{rp.category}</div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 2 }}>
                      <span className="product-price" style={{ fontWeight: 800, color: '#ff9900', fontSize: 17 }}><FaRupeeSign style={{ fontSize: 15, marginRight: 2 }} />{rp.price}</span>
                      {rp.oldPrice && (
                        <span className="product-oldprice" style={{ color: '#888', fontSize: 13, textDecoration: 'line-through', marginLeft: 6 }}><FaRupeeSign style={{ fontSize: 11, marginRight: 1 }} />{rp.oldPrice}</span>
                      )}
                      {getDiscount(rp) > 0 && (
                        <span className="product-discount" style={{ color: '#388e3c', fontSize: 13, fontWeight: 600, marginLeft: 8 }}>{getDiscount(rp)}% off</span>
                      )}
                    </div>
                    <button className="btn btn-primary" style={{ borderRadius: 16, fontWeight: 600, fontSize: 15, padding: '8px 0', marginTop: 8, width: '100%' }} onClick={e => { e.stopPropagation(); addToCart(rp); }}>Add to Cart</button>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        )}
      </div>
      {/* Similar products and sidebar remain unchanged */}
    </>
  );
}

function SortBar({ sort, setSort }) {
  return (
    <div className="sort-bar" style={{ display: 'flex', alignItems: 'center', gap: 18, marginBottom: 18, fontSize: 15 }}>
      <span style={{ color: '#888', fontWeight: 600 }}>Sort By</span>
      <button className={sort === 'popularity' ? 'active' : ''} onClick={() => setSort('popularity')}>Popularity</button>
      <button className={sort === 'priceLow' ? 'active' : ''} onClick={() => setSort('priceLow')}>Price -- Low to High</button>
      <button className={sort === 'priceHigh' ? 'active' : ''} onClick={() => setSort('priceHigh')}>Price -- High to Low</button>
      <button className={sort === 'newest' ? 'active' : ''} onClick={() => setSort('newest')}>Newest First</button>
      <style>{`
        .sort-bar button {
          background: none;
          border: none;
          color: #2874f0;
          font-weight: 600;
          cursor: pointer;
          padding: 4px 10px;
          border-radius: 6px;
          transition: background 0.15s;
        }
        .sort-bar button.active, .sort-bar button:hover {
          background: #e3f0ff;
        }
      `}</style>
    </div>
  );
}

function Breadcrumbs({ selectedCategory, selectedGender }) {
  return (
    <nav className="breadcrumbs" style={{ fontSize: 15, color: '#888', marginBottom: 18 }}>
      Home
      {selectedCategory && selectedCategory !== 'All' && <span> &gt; {selectedCategory}</span>}
      {selectedGender && selectedGender.length === 1 && <span> &gt; {selectedGender[0]}</span>}
    </nav>
  );
}

function App() {
  const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem('cart')) || []);
  const [category, setCategory] = useState('All');
  const [cartOpen, setCartOpen] = useState(false);
  const [toast, setToast] = useState('');
  const [quickView, setQuickView] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [wishlist, setWishlist] = useState(() => JSON.parse(localStorage.getItem('wishlist')) || []);
  const navigate = useNavigate();
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('user')) || null);
  const [loginOpen, setLoginOpen] = useState(false);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [registerMode, setRegisterMode] = useState(false);
  const [registerName, setRegisterName] = useState('');
  const [registerLoading, setRegisterLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('darkMode') === 'true');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedGender, setSelectedGender] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [brand, setBrand] = useState('');
  const [assured, setAssured] = useState(false);
  const [sort, setSort] = useState('popularity');

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    if (toast) {
      const t = setTimeout(() => setToast(''), 2000);
      return () => clearTimeout(t);
    }
  }, [toast]);

  useEffect(() => {
    setLoading(true);
    fetch('http://localhost:5000/api/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data.products || []);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    document.body.classList.toggle('dark-mode', darkMode);
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  // Get unique brands from products
  const brandsList = Array.from(new Set(products.map(p => p.brand).filter(Boolean)));

  // Apply all filters
  const filteredProducts = products.filter(p => {
    if (selectedCategory !== 'All' && p.category !== selectedCategory) return false;
    if (selectedGender.length && (!p.gender || !selectedGender.includes(p.gender))) return false;
    if (p.price < priceRange[0] || p.price > priceRange[1]) return false;
    if (brand && (!p.brand || !p.brand.toLowerCase().includes(brand.toLowerCase()))) return false;
    if (assured && !p.assured) return false;
    return true;
  });

  let sortedProducts = [...filteredProducts];
  if (sort === 'priceLow') sortedProducts.sort((a, b) => a.price - b.price);
  else if (sort === 'priceHigh') sortedProducts.sort((a, b) => b.price - a.price);
  else if (sort === 'newest') sortedProducts.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
  // Popularity: default order

  const addToCart = (product) => {
    setCart(prev => {
      const exists = prev.find(item => item._id === product._id);
      if (exists) {
        setToast('Increased quantity in cart!');
        return prev.map(item => item._id === product._id ? { ...item, qty: item.qty + 1 } : item);
      }
      setToast('Added to cart!');
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const removeFromCart = (_id) => {
    setCart(prev => prev.filter(item => item._id !== _id));
    setToast('Removed from cart!');
  };

  const removeAllCart = () => {
    setCart([]);
    setToast('Cart cleared!');
  };

  const updateQty = (_id, qty) => {
    setCart(prev => prev.map(item => item._id === _id ? { ...item, qty } : item));
  };

  const total = cart.reduce((a, c) => a + c.price * c.qty, 0);

  const isWishlisted = (id) => wishlist.includes(id);
  const toggleWishlist = (id) => {
    setWishlist(prev => prev.includes(id) ? prev.filter(wid => wid !== id) : [...prev, id]);
  };

  // Product Quick View Modal
  const [modalProduct, setModalProduct] = useState(null);

  const handleRegister = async (e) => {
    e.preventDefault();
    setRegisterLoading(true);
    setToast('');
    try {
      const res = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: registerName, email: loginEmail, password: loginPassword })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Registration failed');
      // Auto-login after registration
      await handleLogin(e, true); // true = skip toast
      setToast('Registration successful!');
      setRegisterMode(false);
      setRegisterName('');
    } catch (err) {
      setToast(err.message);
    } finally {
      setRegisterLoading(false);
    }
  };

  const handleLogin = async (e, skipToast) => {
    e.preventDefault();
    setLoginLoading(true);
    if (!skipToast) setToast('');
    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: loginEmail, password: loginPassword })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Login failed');
      setUser(data.user);
      setLoginOpen(false);
      setLoginEmail('');
      setLoginPassword('');
      if (!skipToast) setToast('Login successful!');
    } catch (err) {
      setToast(err.message);
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = () => {
    setUser(null);
    setToast('Logged out!');
  };

  // ... at the top of App.js, inside the App component but before any return ...
  const handleImgError = (e) => {
    e.target.onerror = null;
    e.target.src = '/no-image.png'; // Place a no-image.png in your public folder, or use a reliable placeholder URL
  };

  return (
    <>
      <nav className="custom-navbar">
        <div className="navbar-left">
          <span className="navbar-logo" style={{ cursor: 'pointer' }} onClick={() => navigate('/')}>ShopEase</span>
        </div>
        <div className="navbar-center">
          <SearchBar />
        </div>
        <div className="navbar-right">
          <div className="navbar-action">
            <FaStore className="navbar-icon" />
            <span>Become a Seller</span>
          </div>
          <div className="navbar-action" onClick={() => navigate('/cart')} style={{ cursor: 'pointer' }}>
            <FaShoppingCart className="navbar-icon" />
            <span>Cart</span>
          </div>
          {user ? (
            <div className="navbar-action login-dropdown">
              <FaUserCircle className="navbar-icon" />
              <span>{user.email}</span>
              <button className="btn btn-link" style={{ marginLeft: 8, color: '#e74c3c', fontWeight: 600, border: 'none', background: 'none', cursor: 'pointer' }} onClick={handleLogout}>Logout</button>
            </div>
          ) : (
            <div className="navbar-action login-dropdown" onClick={() => setLoginOpen(true)} style={{ cursor: 'pointer' }}>
              <FaUserCircle className="navbar-icon" />
              <span>Login</span>
            </div>
          )}
          <button
            className="btn btn-darkmode"
            style={{ marginLeft: 12, borderRadius: 20, padding: '6px 16px', background: darkMode ? '#222' : '#fff', color: darkMode ? '#fff' : '#222', border: '1px solid #ccc', fontWeight: 600 }}
            onClick={() => setDarkMode(dm => !dm)}
            aria-label="Toggle dark mode"
          >
            {darkMode ? '🌙 Dark' : '☀️ Light'}
          </button>
          <div className="navbar-action">
            <FaEllipsisH className="navbar-icon" />
          </div>
        </div>
      </nav>
      {/* Login Modal */}
      {loginOpen && (
        <div className="modal-overlay" style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(30,30,30,0.18)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={() => setLoginOpen(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: 360, width: '100%', background: '#fff', borderRadius: 18, boxShadow: '0 8px 32px #0002', padding: 36, position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <button className="modal-close" onClick={() => setLoginOpen(false)} style={{ position: 'absolute', top: 16, right: 16, background: 'none', border: 'none', fontSize: 22, color: '#888', cursor: 'pointer' }}><FaTimes /></button>
            <h2 style={{ fontWeight: 800, marginBottom: 18, fontSize: 28, color: '#222', letterSpacing: 0.5 }}>{registerMode ? 'Create Account' : 'Sign In'}</h2>
            <form onSubmit={registerMode ? handleRegister : handleLogin} style={{ width: '100%' }}>
              {registerMode && (
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="Name"
                  value={registerName}
                  onChange={e => setRegisterName(e.target.value)}
                  required
                  style={{ width: '100%', marginBottom: 16, padding: 12, borderRadius: 10, border: '1px solid #ddd', fontSize: 16, background: '#fafbfc' }}
                />
              )}
              <input
                type="email"
                className="form-control mb-2"
                placeholder="Email"
                value={loginEmail}
                onChange={e => setLoginEmail(e.target.value)}
                required
                style={{ width: '100%', marginBottom: 16, padding: 12, borderRadius: 10, border: '1px solid #ddd', fontSize: 16, background: '#fafbfc' }}
              />
              <div style={{ position: 'relative', width: '100%', marginBottom: 18 }}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="form-control mb-2"
                  placeholder="Password"
                  value={loginPassword}
                  onChange={e => setLoginPassword(e.target.value)}
                  required
                  style={{ width: '100%', padding: 12, borderRadius: 10, border: '1px solid #ddd', fontSize: 16, background: '#fafbfc' }}
                />
                <span onClick={() => setShowPassword(s => !s)} style={{ position: 'absolute', right: 14, top: 13, cursor: 'pointer', color: '#888', fontSize: 16, userSelect: 'none' }}>
                  {showPassword ? 'Hide' : 'Show'}
                </span>
              </div>
              <button type="submit" className="btn btn-primary w-100" style={{ borderRadius: 24, fontWeight: 700, background: 'linear-gradient(90deg,#ff9900,#ffb347)', border: 'none', padding: 12, fontSize: 17, marginTop: 4, boxShadow: '0 2px 8px #ff990033' }} disabled={loginLoading || registerLoading}>
                {(loginLoading || registerLoading) ? (registerMode ? 'Registering...' : 'Logging in...') : (registerMode ? 'Register' : 'Login')}
              </button>
            </form>
            <div style={{ marginTop: 18, fontSize: 15, color: '#555' }}>
              {registerMode ? (
                <>Already have an account? <span style={{ color: '#FF9900', cursor: 'pointer', fontWeight: 600 }} onClick={() => setRegisterMode(false)}>Sign In</span></>
              ) : (
                <>Don&apos;t have an account? <span style={{ color: '#FF9900', cursor: 'pointer', fontWeight: 600 }} onClick={() => setRegisterMode(true)}>Register</span></>
              )}
            </div>
          </div>
        </div>
      )}
      <Routes>
        <Route path="/" element={
          <>
            {/* Modern Hero Banner with working Unsplash image */}
            <div style={{
              width: '100%',
              minHeight: 340,
              background: 'linear-gradient(120deg, #5ad09d99 0%, #4682b499 100%), url(https://images.unsplash.com/photo-1513708927688-890fe41c7c38?auto=format&fit=crop&w=1200&q=80) center/cover no-repeat',
              color: '#fff',
              borderRadius: 32,
              margin: '32px auto 40px auto',
              maxWidth: 1300,
              boxShadow: '0 4px 32px #4682b433',
              position: 'relative',
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
              textAlign: 'center',
              padding: '64px 24px 64px 24px',
            }}>
              <h1 style={{ fontSize: 54, fontWeight: 900, marginBottom: 18, letterSpacing: 1, textShadow: '0 4px 24px #0008' }}>Welcome to ShopEase</h1>
              <p style={{ fontSize: 26, fontWeight: 500, marginBottom: 32, color: '#e0ffe0', textShadow: '0 2px 8px #0006' }}>Discover the latest trends, gadgets, and essentials. Shop smart, live better.</p>
              <button className="btn btn-primary" style={{ fontSize: 22, padding: '18px 54px', borderRadius: 32, fontWeight: 800, background: '#ff9900', border: 'none', boxShadow: '0 2px 12px #ff990033', marginTop: 8, transition: 'background 0.2s', color: '#fff', letterSpacing: 1 }} onClick={() => window.scrollTo({top: 600, behavior: 'smooth'})}>Shop Now</button>
            </div>

            {/* Add a modern product grid section to show all products before carousels */}
            <div style={{ background: 'linear-gradient(120deg, #f7f8fa 60%, #e3f0ff 100%)', padding: '48px 0 32px 0', margin: '0 0 40px 0' }}>
              <div style={{ maxWidth: 1300, margin: '0 auto', padding: '0 18px' }}>
                <h2 style={{ fontWeight: 900, fontSize: 34, marginBottom: 32, color: '#222', textAlign: 'center', letterSpacing: 0.5, textShadow: '0 2px 8px #fff8' }}>
                  Explore All Products
                </h2>
                {loading ? (
                  <div style={{ textAlign: 'center', fontSize: 22, color: '#888', padding: 40 }}>Loading products...</div>
                ) : products.length === 0 ? (
                  <div style={{ textAlign: 'center', fontSize: 20, color: '#e74c3c', padding: 40 }}>No products found.</div>
                ) : (
                  <div className="modern-product-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 36, justifyItems: 'center', alignItems: 'stretch' }}>
                    {products.map(product => (
                      <div
                        className="product-card modern-card card-fade-in card-animated"
                        key={product._id || product.id}
                        style={{ background: '#fff', borderRadius: 18, boxShadow: '0 2px 12px #0001', padding: 24, transition: 'box-shadow 0.18s, transform 0.15s', cursor: 'pointer', minWidth: 180, maxWidth: 260, margin: '0 auto', position: 'relative' }}
                        onClick={() => navigate(`/product/${product._id}`)}
                        onMouseMove={e => {
                          if (window.matchMedia('(pointer: fine)').matches) {
                            const card = e.currentTarget;
                            const rect = card.getBoundingClientRect();
                            const x = e.clientX - rect.left;
                            const y = e.clientY - rect.top;
                            const rotateY = ((x / rect.width) - 0.5) * 18; // max 18deg
                            const rotateX = ((0.5 - (y / rect.height))) * 18;
                            card.style.setProperty('--card-rotate-x', `${rotateX}deg`);
                            card.style.setProperty('--card-rotate-y', `${rotateY}deg`);
                          }
                        }}
                        onMouseLeave={e => {
                          if (window.matchMedia('(pointer: fine)').matches) {
                            const card = e.currentTarget;
                            card.style.setProperty('--card-rotate-x', '0deg');
                            card.style.setProperty('--card-rotate-y', '0deg');
                          }
                        }}
                      >
                        <div className="wishlist-heart" onClick={e => { e.stopPropagation(); toggleWishlist(product._id); }}>
                          {isWishlisted(product._id) ? <FaHeartFilled color="#e74c3c" size={22} /> : <FaRegHeart color="#e74c3c" size={22} />}
                        </div>
                        {product.image && (
                          <img src={product.image} alt={product.name} style={{ width: 120, height: 120, objectFit: 'contain', borderRadius: 12, margin: '0 auto 16px auto', background: '#fafbfc', boxShadow: '0 1px 6px #ff99001a' }} onError={handleImgError} />
                        )}
                        <div className="product-name" style={{ fontWeight: 700, fontSize: 18, marginBottom: 4, textAlign: 'center', color: '#222' }}>{product.name}</div>
                        <div className="product-category" style={{ color: '#888', fontSize: 14, marginBottom: 4, textAlign: 'center' }}>{product.category}</div>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 2 }}>
                          <span className="product-price" style={{ fontWeight: 800, color: '#ff9900', fontSize: 20 }}><FaRupeeSign style={{ fontSize: 17, marginRight: 2 }} />{product.price}</span>
                          {product.oldPrice && (
                            <span className="product-oldprice" style={{ color: '#888', fontSize: 15, textDecoration: 'line-through', marginLeft: 8 }}><FaRupeeSign style={{ fontSize: 13, marginRight: 1 }} />{product.oldPrice}</span>
                          )}
                          {getDiscount(product) > 0 && (
                            <span className="product-discount" style={{ color: '#388e3c', fontSize: 15, fontWeight: 600, marginLeft: 10 }}>{getDiscount(product)}% off</span>
                          )}
                        </div>
                        {getDiscount(product) >= 50 && (
                          <span className="hot-deal-badge" style={{ display: 'inline-block', background: '#388e3c', color: '#fff', fontSize: 13, fontWeight: 700, borderRadius: 8, padding: '2px 10px', marginTop: 8 }}>Hot Deal</span>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Product Carousels by Category/Theme */}
            {['Fashion', 'Electronics', 'Home Decor', 'Beauty', 'Sports'].map((section, idx) => {
              const sectionProducts = products.filter(p => (p.category || '').toLowerCase().includes(section.toLowerCase()));
              if (sectionProducts.length === 0) return null;
              const sliceLimit = section === 'Electronics' ? 50 : 30;
              return (
                <div key={section} style={{ maxWidth: 1300, margin: '0 auto 40px auto', padding: '0 12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                    <h2 style={{ fontWeight: 800, fontSize: 26, color: '#222', letterSpacing: 0.5 }}>{section}'s Top Deals</h2>
                    <button style={{ background: 'none', border: 'none', color: '#2874f0', fontSize: 28, cursor: 'pointer', display: 'flex', alignItems: 'center' }} aria-label="See more"><FaArrowRight /></button>
                  </div>
                  <Slider
                    dots={false}
                    infinite={false}
                    speed={500}
                    slidesToShow={6}
                    slidesToScroll={3}
                    responsive={[
                      { breakpoint: 1400, settings: { slidesToShow: 5 } },
                      { breakpoint: 1100, settings: { slidesToShow: 4 } },
                      { breakpoint: 900, settings: { slidesToShow: 3 } },
                      { breakpoint: 600, settings: { slidesToShow: 2 } },
                      { breakpoint: 400, settings: { slidesToShow: 1 } },
                    ]}
                    arrows={true}
                  >
                    {sectionProducts.slice(0, sliceLimit).map(product => (
                      <div key={product._id || product.id} style={{ padding: 8 }}>
                        <div className="product-card" style={{ minWidth: 170, maxWidth: 210, margin: '0 auto' }} onClick={() => navigate(`/product/${product._id}`)}>
                          <div className="wishlist-heart" onClick={e => { e.stopPropagation(); toggleWishlist(product._id); }}>
                            {isWishlisted(product._id) ? <FaHeartFilled color="#e74c3c" size={22} /> : <FaRegHeart color="#e74c3c" size={22} />}
                          </div>
                          {product.image && (
                            <img src={product.image} alt={product.name} style={{ width: 120, height: 120, objectFit: 'contain', borderRadius: 12, margin: '0 auto 16px auto', background: '#fafbfc', boxShadow: '0 1px 6px #ff99001a' }} onError={handleImgError} />
                          )}
                          <div className="product-name">{product.name}</div>
                          <div className="product-category">{product.category}</div>
                          <div style={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
                            <span className="product-price"><FaRupeeSign style={{ fontSize: 15, marginRight: 2 }} />{product.price}</span>
                            {product.oldPrice && (
                              <span className="product-oldprice"><FaRupeeSign style={{ fontSize: 12, marginRight: 1 }} />{product.oldPrice}</span>
                            )}
                            {getDiscount(product) > 0 && (
                              <span className="product-discount">{getDiscount(product)}% off</span>
                            )}
                          </div>
                          {getDiscount(product) >= 50 && (
                            <span className="hot-deal-badge">Hot Deal</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </Slider>
                  {/* Insert a promotional banner after every 2 carousels */}
                  {(idx === 1 || idx === 3) && (
                    <div style={{ margin: '32px 0', borderRadius: 18, overflow: 'hidden', boxShadow: '0 2px 12px #fc575e22' }}>
                      <img src={idx === 1 ? 'https://rukminim2.flixcart.com/fk-p-flap/960/400/image/7b8b6b6e6e2e4e2d.jpg?q=20' : 'https://rukminim2.flixcart.com/fk-p-flap/960/400/image/2b3b6b6e6e2e4e2d.jpg?q=20'} alt="Promo Banner" style={{ width: '100%', height: 180, objectFit: 'cover' }} />
                    </div>
                  )}
                </div>
              );
            })}
            {/* Fallback: All Products Carousel if no sectioned carousels are visible */}
            {['Fashion', 'Electronics', 'Home Decor', 'Beauty', 'Sports'].every(section => products.filter(p => (p.category || '').toLowerCase().includes(section.toLowerCase())).length === 0) && products.length > 0 && (
              <div style={{ maxWidth: 1300, margin: '0 auto 40px auto', padding: '0 12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                  <h2 style={{ fontWeight: 800, fontSize: 26, color: '#222', letterSpacing: 0.5 }}>All Products</h2>
                </div>
                <Slider
                  dots={false}
                  infinite={false}
                  speed={500}
                  slidesToShow={6}
                  slidesToScroll={3}
                  responsive={[
                    { breakpoint: 1400, settings: { slidesToShow: 5 } },
                    { breakpoint: 1100, settings: { slidesToShow: 4 } },
                    { breakpoint: 900, settings: { slidesToShow: 3 } },
                    { breakpoint: 600, settings: { slidesToShow: 2 } },
                    { breakpoint: 400, settings: { slidesToShow: 1 } },
                  ]}
                  arrows={true}
                >
                  {products.map(product => (
                    <div key={product._id || product.id} style={{ padding: 8 }}>
                      <div className="product-card" style={{ minWidth: 170, maxWidth: 210, margin: '0 auto' }} onClick={() => navigate(`/product/${product._id}`)}>
                        <div className="wishlist-heart" onClick={e => { e.stopPropagation(); toggleWishlist(product._id); }}>
                          {isWishlisted(product._id) ? <FaHeartFilled color="#e74c3c" size={22} /> : <FaRegHeart color="#e74c3c" size={22} />}
                        </div>
                        {product.image && (
                          <img src={product.image} alt={product.name} style={{ width: 120, height: 120, objectFit: 'contain', borderRadius: 12, margin: '0 auto 16px auto', background: '#fafbfc', boxShadow: '0 1px 6px #ff99001a' }} onError={handleImgError} />
                        )}
                        <div className="product-name">{product.name}</div>
                        <div className="product-category">{product.category}</div>
                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
                          <span className="product-price">${product.price}</span>
                          {product.oldPrice && (
                            <span className="product-oldprice">${product.oldPrice}</span>
                          )}
                          {getDiscount(product) > 0 && (
                            <span className="product-discount">{getDiscount(product)}% off</span>
                          )}
                        </div>
                        {getDiscount(product) >= 50 && (
                          <span className="hot-deal-badge">Hot Deal</span>
                        )}
                      </div>
                    </div>
                  ))}
                </Slider>
              </div>
            )}
            {/* Replace Shop by Category grid with Flipkart-style horizontal deals section */}
            <div style={{ maxWidth: 1300, margin: '60px auto 40px auto', padding: '0 18px' }}>
              <h2 style={{ fontWeight: 900, fontSize: 28, marginBottom: 24, color: '#222' }}>
                Beauty, Auto , Food & more
              </h2>
              <div style={{
                display: 'flex',
                overflowX: 'auto',
                gap: 36,
                padding: '18px 0',
                background: '#fff',
                borderRadius: 18,
                boxShadow: '0 2px 16px #ff99001a',
                alignItems: 'flex-start',
                minHeight: 260,
              }}>
                {/* Example deals, replace with dynamic data if needed */}
                {/* Update horizontal deals section with more relevant Unsplash images */}
                <div style={{ minWidth: 180, textAlign: 'center' }}>
                  <img src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=300&q=80" alt="Baby Travel" style={{ width: 160, height: 110, objectFit: 'cover', marginBottom: 12, borderRadius: 8 }} />
                  <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 4 }}>Baby Travel</div>
                  <div style={{ color: '#388e3c', fontWeight: 700, fontSize: 16 }}>Min.40% Off</div>
                </div>
                <div style={{ minWidth: 180, textAlign: 'center' }}>
                  <img src="https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=300&q=80" alt="Pens & Stationery" style={{ width: 160, height: 110, objectFit: 'cover', marginBottom: 12, borderRadius: 8 }} />
                  <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 4 }}>Pens & Stationery!</div>
                  <div style={{ color: '#2874f0', fontWeight: 700, fontSize: 16 }}>From ₹99</div>
                </div>
                <div style={{ minWidth: 180, textAlign: 'center' }}>
                  <img src="https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=300&q=80" alt="Toys and Games" style={{ width: 160, height: 110, objectFit: 'cover', marginBottom: 12, borderRadius: 8 }} />
                  <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 4 }}>Toys and Games!</div>
                  <div style={{ color: '#d32f2f', fontWeight: 700, fontSize: 16 }}>Upto 80% Off</div>
                </div>
                <div style={{ minWidth: 180, textAlign: 'center' }}>
                  <img src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=300&q=80" alt="Health Supplements" style={{ width: 160, height: 110, objectFit: 'cover', marginBottom: 12, borderRadius: 8 }} />
                  <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 4 }}>Health Supplements</div>
                  <div style={{ color: '#ff9900', fontWeight: 700, fontSize: 16 }}>Up to 70% off</div>
                </div>
                <div style={{ minWidth: 180, textAlign: 'center' }}>
                  <img src="https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=200&q=80" alt="Pet Essentials" style={{ width: 120, height: 120, objectFit: 'contain', marginBottom: 12, borderRadius: 12 }} />
                  <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 4 }}>Pet Essentials</div>
                  <div style={{ color: '#2874f0', fontWeight: 700, fontSize: 16 }}>From ₹99</div>
                </div>
                <div style={{ minWidth: 180, textAlign: 'center' }}>
                  <img src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=300&q=80" alt="Skin care" style={{ width: 160, height: 110, objectFit: 'cover', marginBottom: 12, borderRadius: 8 }} />
                  <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 4 }}>Skin care</div>
                  <div style={{ color: '#388e3c', fontWeight: 700, fontSize: 16 }}>Under ₹499</div>
                </div>
                <div style={{ minWidth: 180, textAlign: 'center' }}>
                  <img src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80" alt="Lipstick & More" style={{ width: 120, height: 120, objectFit: 'contain', marginBottom: 12, borderRadius: 12 }} />
                  <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 4 }}>Lipstick & More</div>
                  <div style={{ color: '#d32f2f', fontWeight: 700, fontSize: 16 }}>Min 50% Off</div>
                </div>
              </div>
            </div>
          </>
        } />
        <Route path="/cart" element={
          <CartPage cart={cart} updateQty={updateQty} removeFromCart={removeFromCart} removeAllCart={removeAllCart} total={total} />
        } />
        <Route path="/product/:id" element={<ProductPage addToCart={addToCart} isWishlisted={isWishlisted} toggleWishlist={toggleWishlist} user={user} />} />
        <Route path="/search" element={<SearchResults addToCart={addToCart} isWishlisted={isWishlisted} toggleWishlist={toggleWishlist} user={user} />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/category/:categoryName" element={<CategoryPage />} />
      </Routes>
      {/* Toast Notification */}
      {toast && <div className="toast-message">{toast}</div>}

      {/* Quick View Modal */}
      {quickView && (
        <div style={{
          position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
          background: 'rgba(0,0,0,0.3)', zIndex: 3000, display: 'flex', alignItems: 'center', justifyContent: 'center'
        }} onClick={() => setQuickView(null)}>
          <div style={{ background: '#fff', borderRadius: 16, padding: 32, minWidth: 320, minHeight: 220, position: 'relative', boxShadow: '0 8px 32px rgba(0,0,0,0.16)', maxWidth: 400 }} onClick={e => e.stopPropagation()}>
            <button style={{ position: 'absolute', top: 12, right: 12, background: 'none', border: 'none', fontSize: 24, color: '#FF9900', cursor: 'pointer' }} onClick={() => setQuickView(null)}><FaTimes /></button>
            {quickView.badge && <span className="badge" style={{ position: 'absolute', top: 16, left: 16, background: '#FF9900', color: '#fff', borderRadius: 12, padding: '2px 12px', fontWeight: 600, fontSize: 13 }}>{quickView.badge}</span>}
            <img src={quickView.img} alt={quickView.name} style={{ width: 140, height: 140, objectFit: 'contain', marginBottom: 16, borderRadius: 12 }} />
            <h4 style={{ display: 'flex', alignItems: 'center', gap: 8, fontWeight: 700, fontSize: 22, margin: '8px 0 4px 0', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', width: '100%' }}>{React.isValidElement(quickView.icon) ? quickView.icon : null} {quickView.name}</h4>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 4 }}>
              <>{getStars(quickView.rating)}</>
              <span style={{ color: '#888', fontSize: 13, marginLeft: 4 }}>{quickView.rating}</span>
            </div>
            <p className="text-muted" style={{ fontSize: 15, minHeight: 36, margin: '0 0 8px 0', color: '#666' }}>{quickView.desc}</p>
            <div className="fw-bold mb-2" style={{ fontSize: 20 }}><FaRupeeSign style={{ fontSize: 16, marginRight: 2 }} />{quickView.price}</div>
            <button className="btn btn-primary w-100" style={{ borderRadius: 24, fontWeight: 600, background: '#FF9900', border: 'none', marginTop: 8 }} onClick={() => { addToCart(quickView); setQuickView(null); }}>Add to Cart</button>
          </div>
        </div>
      )}
      {/* Footer */}
      <footer className="footer-section" style={{ background: '#222', color: '#ccc', marginTop: 48, fontSize: 15 }}>
        <div style={{ maxWidth: 900, margin: '0 auto', padding: '24px 0', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
          <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', justifyContent: 'center', marginBottom: 8 }}>
            <a href="#" style={{ color: '#ff9900', textDecoration: 'none', fontWeight: 600 }}>About</a>
            <a href="#" style={{ color: '#ff9900', textDecoration: 'none', fontWeight: 600 }}>Contact</a>
            <a href="#" style={{ color: '#ff9900', textDecoration: 'none', fontWeight: 600 }}>Help</a>
            <a href="#" style={{ color: '#ff9900', textDecoration: 'none', fontWeight: 600 }}>Terms</a>
          </div>
          <div style={{ color: '#aaa', fontSize: 14 }}>
            © {new Date().getFullYear()} ShopEase.com
          </div>
        </div>
      </footer>
    </>
  );
}

export default function WrappedApp() {
  return (
    <Router>
      <App />
    </Router>
  );
}

function CategoryPage() {
  const { categoryName } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:5000/api/products?category=${encodeURIComponent(categoryName)}`)
      .then(res => res.json())
      .then(data => {
        setProducts(data.products || []);
        setLoading(false);
      });
  }, [categoryName]);

  return (
    <div style={{ maxWidth: 1200, margin: '32px auto' }}>
      <h2 style={{ fontWeight: 700, fontSize: 28, marginBottom: 24 }}>{categoryName}</h2>
      {loading ? (
        <div style={{ textAlign: 'center', fontSize: 22, color: '#888', padding: 40 }}>Loading products...</div>
      ) : products.length === 0 ? (
        <div style={{ textAlign: 'center', fontSize: 20, color: '#888', padding: 40 }}>No products found.</div>
      ) : (
        <div className="product-grid">
          {products.map(product => (
            <div className="product-card" key={product._id || product.id}>
              {product.image && (
                <img src={product.image} alt={product.name} style={{ width: 120, height: 120, objectFit: 'contain', borderRadius: 12, margin: '0 auto 16px auto', background: '#fafbfc', boxShadow: '0 1px 6px #ff99001a' }} onError={handleImgError} />
              )}
              <div className="product-name">{product.name}</div>
              <div className="product-category">{product.category}</div>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
                <span className="product-price">${product.price}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 