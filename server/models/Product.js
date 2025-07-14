import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  oldPrice: { type: Number },
  category: { type: String, required: true },
  brand: { type: String },
  description: { type: String },
  tags: [{ type: String }],
  images: [{ type: String }],
  img: { type: String },
  desc: { type: String },
  assured: { type: Boolean, default: false },
  rating: { type: Number, default: 0 },
  reviewCount: { type: Number, default: 0 },
  stock: { type: Number, default: 0 },
  gender: { type: String, enum: ['Men', 'Women', 'Unisex', 'Kids'], default: 'Unisex' },
  featured: { type: Boolean, default: false },
  discount: { type: Number, default: 0 }
}, { 
  timestamps: true,
  // Add text index for search functionality
  indexes: [
    { name: 'text', description: 'text', brand: 'text', category: 'text' }
  ]
});

export default mongoose.model('Product', productSchema); 