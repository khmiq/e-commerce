const Category = require('../models/Category');
const Product =  require('../models/Product');
const multer = require('multer');
const path = require('path');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Specify the directory to save uploaded files
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName); // Save file with a unique name
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|gif/; // Allowed file types
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = fileTypes.test(file.mimetype);

    if (extname && mimetype) {
      cb(null, true);
    } else {
      cb(new Error('Only images are allowed.'));
    }
  },
}).single('image'); // Expecting a single file upload with the key 'image'

// Controller for creating a category
exports.createCategory = async (req, res) => {
    upload(req, res, async (err) => {
      if (err) {
        return res.status(400).json({
          success: false,
          message: `File upload error: ${err.message}`,
        });
      }
  
      const { name, description } = req.body;
  
      if (!name || !description) {
        return res.status(400).json({
          success: false,
          message: 'Name and description are required.',
        });
      }
  
      try {
        const categoryData = {
          name,
          description,
          image: req.file ? req.file.path : null, // Save file path
        };
  
        const category = await Category.create(categoryData);
        res.status(201).json({
          success: true,
          data: category,
        });
      } catch (error) {
        res.status(400).json({
          success: false,
          message: error.message,
        });
      }
    });
  };
  
  





exports.getCategories = async (req, res) => {
    try {
        const { page = 1, limit = 10, name } = req.query;

        const query = {};
        if (name) {
            query.name = { $regex: name, $options: 'i' }; // Case-insensitive search
        }

        const categories = await Category.find(query)
            .skip((page - 1) * limit)
            .limit(parseInt(limit));

        const total = await Category.countDocuments(query);

        res.status(200).json({
            success: true,
            data: categories,
            total,
            totalPages: Math.ceil(total / limit),
        });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

exports.updateCategory = async(req, res) => {
    try{
        const category = await Category.findByIdAndUpdate(req.params.id, req.body, {new: true})
        res.status(200).json({success:true, data:category})
    } catch (error){
        res.status(400).json({success:false , message:error.message})
    }
};


exports.deleteCategory =  async(req, res)=>{
    try{
        const category = await Category.findByIdAndDelete(req.params.id)
        res.status(200).json({success: true, message:"Category deleted"})
    } catch(error) {
        res.status(400).json({success: false, message: error.message})
    }
}