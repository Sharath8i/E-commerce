import express from 'express';

const router = express.Router();
let cart = [];

// Get cart
router.get('/', (req, res) => {
  res.json(cart);
});

// Add to cart
router.post('/add', (req, res) => {
  const { product, qty } = req.body;
  const exists = cart.find(item => item.product.id === product.id);
  if (exists) {
    exists.qty += qty;
  } else {
    cart.push({ product, qty });
  }
  res.json(cart);
});

// Update cart item
router.put('/update', (req, res) => {
  const { productId, qty } = req.body;
  const item = cart.find(item => item.product.id === productId);
  if (item) item.qty = qty;
  res.json(cart);
});

// Remove from cart
router.delete('/remove/:productId', (req, res) => {
  cart = cart.filter(item => item.product.id !== Number(req.params.productId));
  res.json(cart);
});

export default router; 