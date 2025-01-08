const Product = require('../models/Product');
const multer = require('multer');
const path = require('path');

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Directory for file uploads
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Unique file name
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|gif/;
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = fileTypes.test(file.mimetype);

    if (extname && mimetype) {
      cb(null, true);
    } else {
      cb(new Error('Only images are allowed.'));
    }
  },
}).single('image');

// Get all products with filters, pagination, and populated categories
exports.getProducts = async (req, res) => {
  try {
    const { page = 1, price, color, category, search } = req.query;
    const filters = {};

    if (price) {
      if (price === '<50') filters.price = { $lt: 50 };
      if (price === '50-100') filters.price = { $gte: 50, $lte: 100 };
      if (price === '>100') filters.price = { $gt: 100 };
    }

    if (color) filters.color = color;
    if (category) filters.category = category;
    if (search) filters.name = { $regex: search, $options: 'i' };

    const products = await Product.find(filters)
      .populate('category') 
      .skip((page - 1) * 10) 
      .limit(10);


    
    const totalProducts = await Product.countDocuments(filters);
    const totalPages = Math.ceil(totalProducts / 10);

    res.status(200).json({ data: products, totalPages });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Create a new product with an image upload
exports.createProduct = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({
        success: false,
        message: `File upload error: ${err.message}`,
      });
    }

    const { name, description, price, category } = req.body;

    if (!name || !description || !price || !category) {
      return res.status(400).json({
        success: false,
        message: 'Name, description, price, and category are required.',
      });
    }

    try {
      const productData = {
        name,
        description,
        price,
        category,
        image: req.file ? req.file.path : null,
      };

      const product = await Product.create(productData);
      res.status(201).json({ success: true, data: product });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  });
};

// Update a product
exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json({ success: true, data: product });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Delete a product
exports.deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: 'Product deleted' });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
