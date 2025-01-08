const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require('cors');
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/product');
const categoryRoutes = require('./routes/category');
const fs = require('fs');
const path = require('path');
const cookieParser = require('cookie-parser')



dotenv.config();

const corsOptions = {
  origin: ['http://localhost:5173', 'http://localhost:5174'], // Multiple origins
};

const app = express();
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser())
app.use(express.urlencoded({ extended: false }));
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);

const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}



mongoose
.connect(process.env.MONGO_URI)
.then(() => console.log("connected to db"))
.catch((err) => console.error(err));

app.listen(process.env.PORT, () => {
    console.log(`Process is running on port ${process.env.PORT}`)
});
console.log(process.env.JWT_SECRET);  // Should print your JWT secret
