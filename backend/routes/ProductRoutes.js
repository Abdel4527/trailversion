const express = require('express');
const Product = require('../models/Product');
const { protect,admin } = require('../middleware/authMiddleware');
const mongoose = require('mongoose');

const router = express.Router();

// @route   POST /api/products
// @desc    Create a new product    
// @access  Private/Admin
router.post("/", protect, admin, async (req, res) => {
  const {
    name,
    description,
    price,
    currency,
    discountPrice,
    countInStock,
    sku,
    category,
    brand, // Include brand
    sizes,
    colors,
    collections,
    material, // Include material
    gender,
    images,
  } = req.body;

  try {
    const product = new Product({
      name,
      description,
      price,
      currency,
      discountPrice,
      countInStock,
      sku,
      category,
      brand, // Save brand
      sizes,
      colors,
      collections,
      material, // Save material
      gender,
      images,
      user: req.user._id,
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    console.error("Error creating product:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});

// @route   PUT /api/products/:id
// @desc    Update a product
// @access  Private/Admin
router.put('/:id', protect, admin, async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (product) {
            product.name = req.body.name || product.name;
            product.description = req.body.description || product.description;
            product.price = req.body.price || product.price;
            product.currency = req.body.currency || product.currency;
            product.discountPrice = req.body.discountPrice || product.discountPrice;
            product.countInStock = req.body.countInStock || product.countInStock;
            product.sku = req.body.sku || product.sku;
            product.category = req.body.category || product.category;
            product.brand = req.body.brand || product.brand;
            product.sizes = req.body.sizes || product.sizes;
            product.colors = req.body.colors || product.colors;
            product.collections = req.body.collections || product.collections;
            product.material = req.body.material || product.material;
            product.gender = req.body.gender || product.gender;
            product.images = req.body.images || product.images; // Allow updating images

            const updatedProduct = await product.save();
            res.json(updatedProduct);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        console.error('Error updating product:', error.message);
        res.status(500).json({ message: 'Server error' });
    }
});

// @route   DELETE /api/products/:id
// @desc    Delete a product
// @access  Private/Admin

router.delete('/:id', protect, admin, async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (product) {
            await product.deleteOne();
            res.status(200).json({ message: 'Product removed' });
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});

// @route   GET /api/products/
// @desc    Get all products
// @access  Public
router.get('/', async (req, res) => {
    try {
        const { collection, size, color, gender, minPrice, maxPrice, sortBy, search, category, material, brand, limit } = req.query;
        const query = {};

        if (collection && collection.toLocaleString() !== 'all') {
            query.collections = collection;
        }

        if (category && category.toLocaleString() !== 'all') {
            query.category = category;
        }

        if (material) {
            query.material = { $in: material.split(',') };
        }

        if (brand) {
            query.brand = { $in: brand.split(',') };
        }

        if (gender) {
            query.gender = gender;
        }

        if (color) {
            query.colors = { $in: [color] };
        }

        if (size) {
            query.sizes = { $in: size.split(',') };
        }

        if (minPrice || maxPrice) {
            query.price = {};
            if (minPrice) query.price.$gte = Number(minPrice);
            if (maxPrice) query.price.$lte = Number(maxPrice);
        }

        if (search) {
            query.$or = [
                { name: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } },
            ];
        }

        // Define sorting criteria
        let sortCriteria = {};
        if (sortBy) {
            switch (sortBy) {
                case "priceAsc":
                    sortCriteria = { price: 1 };
                    break;
                case "priceDesc":
                    sortCriteria = { price: -1 };
                    break;
                case "popularity":
                    sortCriteria = { rating: -1 };
                    break;
                default:
                    break;
            }
        }

        // Fetch products with query and sorting
        let products = await Product.find(query).sort(sortCriteria).limit(limit ? Number(limit) : 0);
        res.json(products);

    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});

// @route   GET /api/products/bestsellers
// @desc    Get best-selling products
// @access  Public

router.get('/best-seller', async (req, res) => {
    try {
        const bestSeller = await Product.findOne({}).sort({ rating: -1 });
        if (bestSeller) {
            res.json(bestSeller);
        } else {
            res.status(404).json({ message: 'Best seller not found' });
        }
    } catch (error) {
        
        console.error(error);
        res.status(500).send('Server error');
    }
});

router.get("/filters", async (req, res) => {
    try {
      const brands = await Product.distinct("brand");
      const materials = await Product.distinct("material");
      const categories = await Product.distinct("category");
      const colors = await Product.distinct("colors");
      const sizes = await Product.distinct("sizes");
  
      res.json({ brands, materials, categories, colors, sizes });
    } catch (error) {
      console.error("Error fetching filter options:", error.message);
      res.status(500).json({ message: "Server error" });
    }
  });
// @route   GET /api/products/new-arrivals
// @desc    Get new arrival products
// @access  Public

router.get('/new-arrivals', async (req, res) => {
    try {
        const newArrivals = await Product.find().sort({ createdAt: -1 }).limit(10);
        res.json(newArrivals);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});

// @route   GET /api/products/:id
// @desc    Get product by ID
// @access  Public

router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});

// @route   GET /api/products/similar/:id
// @desc    Get similar products by category
// @access  Public

router.get('/similar/:id', async (req, res) => {
    const { id } = req.params;

    // Validate the ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid product ID' });
    }

    try {
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const similarProducts = await Product.find({
            _id: { $ne: id },
            category: product.category,
            gender: product.gender,
        }).limit(4);

        if (similarProducts.length === 0) {
            return res.status(404).json({ message: 'No similar products found' });
        }

        res.json(similarProducts);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});

// @route   GET /api/products/filters
// @desc    Get filter options
// @access  Public



module.exports = router;