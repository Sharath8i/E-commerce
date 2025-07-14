import express from 'express';
import Review from '../models/Review.js';
import User from '../models/User.js';
import Product from '../models/Product.js';
import jwt from 'jsonwebtoken';

const router = express.Router();

// Middleware to authenticate user via JWT
function auth(req, res, next) {
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
}

// POST /api/reviews - Add a review (requires login)
router.post('/', auth, async (req, res) => {
  try {
    const { product, rating, comment } = req.body;
    if (!product || !rating || !comment) return res.status(400).json({ message: 'Missing fields' });
    // Prevent duplicate review by same user for same product
    const exists = await Review.findOne({ user: req.user.id, product });
    if (exists) return res.status(400).json({ message: 'You already reviewed this product' });
    const review = new Review({ user: req.user.id, product, rating, comment });
    await review.save();
    res.status(201).json(review);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/reviews/:productId - Get all reviews for a product
router.get('/:productId', async (req, res) => {
  try {
    const reviews = await Review.find({ product: req.params.productId })
      .populate('user', 'name')
      .sort({ createdAt: -1 });
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router; 