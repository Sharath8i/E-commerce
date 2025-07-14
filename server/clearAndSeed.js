import mongoose from 'mongoose';
import Product from './models/Product.js';

const MONGO_URI = 'mongodb://localhost:27017/pro';

const products = [
  { name: 'Smart Watch', price: 99, category: 'Wearables' },
  { name: 'Wireless Headphones', price: 59, category: 'Audio' },
  { name: 'Gaming Mouse', price: 39, category: 'Gaming' },
  { name: 'DSLR Camera', price: 499, category: 'Photography' },
  { name: 'Laptop', price: 899, category: 'Computers' },
  { name: 'Tablet', price: 299, category: 'Tablets' },
  { name: "Men's T-Shirt", price: 19, category: 'Men' },
  { name: "Women's Dress", price: 29, category: 'Women' },
  { name: "Kids' Jacket", price: 25, category: 'Kids' },
  { name: 'Bluetooth Speaker', price: 45, category: 'Audio' },
  // Richer products below
  { name: 'Yoga Mat', price: 25, category: 'Sports', img: 'https://images.pexels.com/photos/4056723/pexels-photo-4056723.jpeg?auto=compress&w=400&q=80', desc: 'Comfortable yoga mat for your daily practice.' },
  { name: 'Dog Food', price: 18, category: 'Pets', img: 'https://images.pexels.com/photos/4587997/pexels-photo-4587997.jpeg?auto=compress&w=400&q=80', desc: 'Nutritious food for your dog.' },
  { name: 'Baby Stroller', price: 120, category: 'Baby', img: 'https://images.pexels.com/photos/3933276/pexels-photo-3933276.jpeg?auto=compress&w=400&q=80', desc: 'Lightweight and foldable stroller.' },
  { name: 'Sunscreen', price: 15, category: 'Beauty', img: 'https://images.pexels.com/photos/3373745/pexels-photo-3373745.jpeg?auto=compress&w=400&q=80', desc: 'SPF 50+ sunscreen for all skin types.' },
  { name: 'Protein Bar', price: 3, category: 'Health', img: 'https://images.pexels.com/photos/5938360/pexels-photo-5938360.jpeg?auto=compress&w=400&q=80', desc: 'Healthy protein bar for energy.' },
  { name: 'Sunglasses', price: 25, category: 'Accessories', img: 'https://images.pexels.com/photos/46710/pexels-photo-46710.jpeg?auto=compress&w=400&q=80', desc: 'Trendy sunglasses for all seasons.' },
  { name: 'Cookware Set', price: 60, category: 'Kitchen', img: 'https://images.pexels.com/photos/276528/pexels-photo-276528.jpeg?auto=compress&w=400&q=80', desc: 'Non-stick cookware set for your kitchen.' },
  { name: 'Novel: Mystery Night', price: 12, category: 'Books', img: 'https://images.pexels.com/photos/46274/pexels-photo-46274.jpeg?auto=compress&w=400&q=80', desc: 'A thrilling mystery novel.' },
  { name: 'Lip Balm', price: 6, category: 'Beauty', img: 'https://images.pexels.com/photos/3738341/pexels-photo-3738341.jpeg?auto=compress&w=400&q=80', desc: 'Moisturizing lip balm for daily use.' },
  { name: 'Wall Art', price: 45, category: 'Home Decor', img: 'https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&w=400&q=80', desc: 'Beautiful wall art to decorate your home.' },
  { name: 'Notebook', price: 5, category: 'Stationery', img: 'https://images.pexels.com/photos/4145195/pexels-photo-4145195.jpeg?auto=compress&w=400&q=80', desc: 'A5 ruled notebook for school and office.' },
];

async function clearAndSeed() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB');
    
    // Clear all products
    await Product.deleteMany({});
    console.log('Cleared all products from database');
    
    // Insert new products with correct field names
    await Product.insertMany(products);
    console.log('Database reseeded with correct field names!');
    
    // Verify the data
    const count = await Product.countDocuments();
    console.log(`Total products in database: ${count}`);
    
    // Show a sample product to verify field names
    const sample = await Product.findOne();
    console.log('Sample product fields:', Object.keys(sample.toObject()));
    
    mongoose.disconnect();
  } catch (error) {
    console.error('Error:', error);
    mongoose.disconnect();
  }
}

clearAndSeed(); 