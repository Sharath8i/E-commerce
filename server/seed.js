import mongoose from 'mongoose';
import Product from './models/Product.js';

const MONGO_URI = 'mongodb://localhost:27017/pro'; // Change if your DB URI is different

const categories = [
  'Electronics', 'Wearables', 'Audio', 'Photography', 'Gaming', 'Computers', 'Tablets', 'Men', 'Women', 'Kids', 'Books', 'Beauty', 'Sports', 'Kitchen', 'Pets', 'Stationery', 'Baby', 'Health', 'Accessories', 'Grocery', 'Mobiles', 'Fashion', 'Home & Furniture', 'Appliances', 'Travel', 'Toys', 'Vehicles'
];

const sampleNames = [
  'Pro', 'Max', 'Ultra', 'Lite', 'Plus', 'Mini', 'Smart', 'Advance', 'Elite', 'Prime', 'Classic', 'Eco', 'Flex', 'Active', 'Go', 'Air', 'Power', 'Zoom', 'Edge', 'Core', 'Neo', 'X', 'S', 'One', 'Gen', 'Next', 'Wave', 'Pulse', 'Fit', 'Fresh', 'Style'
];

const sampleImages = [
  'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80'
];

function getRandomName(category) {
  const adj = sampleNames[Math.floor(Math.random() * sampleNames.length)];
  return `${category} ${adj}`;
}

function getRandomImage() {
  return sampleImages[Math.floor(Math.random() * sampleImages.length)];
}

async function seedProducts() {
  await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
  await Product.deleteMany({});
  const products = [];
  for (const category of categories) {
    for (let i = 0; i < 20; i++) {
      products.push({
        name: getRandomName(category),
        description: `A great ${category} product for your needs.`,
        price: Math.floor(Math.random() * 10000) + 500,
        image: getRandomImage(),
        category,
        stock: Math.floor(Math.random() * 100) + 1,
        rating: Math.floor(Math.random() * 5) + 1,
        reviewCount: Math.floor(Math.random() * 200),
        assured: Math.random() > 0.7,
        featured: Math.random() > 0.8,
        discount: Math.floor(Math.random() * 50),
        gender: ['Men', 'Women', 'Kids', 'Unisex'][Math.floor(Math.random() * 4)],
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }
  }
  await Product.insertMany(products);
  console.log('Seeded', products.length, 'products');
}

seedProducts().then(() => process.exit()); 