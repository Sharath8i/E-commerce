import express from 'express';
import Product from '../models/Product.js';

const router = express.Router();

// Get all products with search and filtering
router.get('/', async (req, res) => {
  try {
    const {
      search,
      category,
      brand,
      minPrice,
      maxPrice,
      gender,
      assured,
      sort,
      limit = 20,
      page = 1
    } = req.query;

    // Build query object
    let query = {};

    // Text search
    if (search) {
      query.$text = { $search: search };
    }

    // Category filter
    if (category && category !== 'All') {
      query.category = category;
    }

    // Brand filter
    if (brand) {
      query.brand = { $regex: brand, $options: 'i' };
    }

    // Price range filter
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = parseFloat(minPrice);
      if (maxPrice) query.price.$lte = parseFloat(maxPrice);
    }

    // Gender filter
    if (gender && gender !== 'All') {
      query.gender = gender;
    }

    // Assured filter
    if (assured === 'true') {
      query.assured = true;
    }

    // Build sort object
    let sortObj = {};
    switch (sort) {
      case 'priceLow':
        sortObj.price = 1;
        break;
      case 'priceHigh':
        sortObj.price = -1;
        break;
      case 'rating':
        sortObj.rating = -1;
        break;
      case 'newest':
        sortObj.createdAt = -1;
        break;
      case 'popularity':
        sortObj.reviewCount = -1;
        break;
      default:
        if (search) {
          sortObj.score = { $meta: 'textScore' };
        } else {
          sortObj.createdAt = -1;
        }
    }

    // Pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Execute query
    const products = await Product.find(query)
      .sort(sortObj)
      .limit(parseInt(limit))
      .skip(skip);

    // Get total count for pagination
    const total = await Product.countDocuments(query);

    res.json({
      products,
      pagination: {
        current: parseInt(page),
        total: Math.ceil(total / parseInt(limit)),
        hasNext: skip + products.length < total,
        hasPrev: parseInt(page) > 1
      },
      total
    });
  } catch (error) {
    res.status(500).json({ message: 'Search failed', error: error.message });
  }
});

// Search suggestions endpoint
router.get('/search/suggestions', async (req, res) => {
  try {
    const { q } = req.query;
    if (!q || q.length < 2) {
      return res.json({ suggestions: [] });
    }

    const suggestions = await Product.aggregate([
      {
        $match: {
          $or: [
            { name: { $regex: q, $options: 'i' } },
            { brand: { $regex: q, $options: 'i' } },
            { category: { $regex: q, $options: 'i' } }
          ]
        }
      },
      {
        $group: {
          _id: null,
          names: { $addToSet: '$name' },
          brands: { $addToSet: '$brand' },
          categories: { $addToSet: '$category' }
        }
      },
      {
        $project: {
          suggestions: {
            $slice: [
              {
                $concatArrays: [
                  { $slice: ['$names', 5] },
                  { $slice: ['$brands', 3] },
                  { $slice: ['$categories', 2] }
                ]
              },
              10
            ]
          }
        }
      }
    ]);

    res.json({ suggestions: suggestions[0]?.suggestions || [] });
  } catch (error) {
    res.status(500).json({ message: 'Failed to get suggestions', error: error.message });
  }
});

// Get search filters (categories, brands, etc.)
router.get('/search/filters', async (req, res) => {
  try {
    const filters = await Product.aggregate([
      {
        $group: {
          _id: null,
          categories: { $addToSet: '$category' },
          brands: { $addToSet: '$brand' },
          genders: { $addToSet: '$gender' },
          minPrice: { $min: '$price' },
          maxPrice: { $max: '$price' }
        }
      }
    ]);

    res.json({
      categories: filters[0]?.categories || [],
      brands: filters[0]?.brands.filter(Boolean) || [],
      genders: filters[0]?.genders || [],
      priceRange: {
        min: filters[0]?.minPrice || 0,
        max: filters[0]?.maxPrice || 1000
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to get filters', error: error.message });
  }
});

// Get single product
router.get('/:id', async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ message: 'Not found' });
  res.json(product);
});

// Create product
router.post('/', async (req, res) => {
  const product = new Product(req.body);
  await product.save();
  res.status(201).json(product);
});

// Update product
router.put('/:id', async (req, res) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!product) return res.status(404).json({ message: 'Not found' });
  res.json(product);
});

// Delete product
router.delete('/:id', async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  if (!product) return res.status(404).json({ message: 'Not found' });
  res.json({ message: 'Deleted' });
});

export default router; 