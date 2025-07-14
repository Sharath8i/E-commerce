import mongoose from 'mongoose';
import Product from './models/Product.js';

const MONGO_URI = 'mongodb://localhost:27017/pro';

async function setupIndexes() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB');

    // Create text index for search functionality
    await Product.collection.createIndex({
      name: 'text',
      description: 'text',
      brand: 'text',
      category: 'text'
    });

    console.log('Text index created successfully!');
    
    // Test the index
    const testSearch = await Product.find({ $text: { $search: 'apple' } });
    console.log(`Found ${testSearch.length} products matching 'apple'`);
    
    mongoose.disconnect();
  } catch (error) {
    console.error('Error setting up indexes:', error);
    mongoose.disconnect();
  }
}

setupIndexes(); 