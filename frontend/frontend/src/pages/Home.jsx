import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, TextField, Pagination, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import 'tailwindcss/tailwind.css';
import Navbar from '../components/Navbar'; 
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#EC4899', 
    },
    secondary: {
      main: '#DB2777',
    },
  },
});

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [priceFilter, setPriceFilter] = useState('');

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, []);

  useEffect(() => {
    const filtered = products.filter(product => {
      const searchTermLower = searchTerm ? searchTerm.toLowerCase() : '';
      const productName = product.name ? product.name.toLowerCase() : '';
      const productDescription = product.description ? product.description.toLowerCase() : '';
      
      const isCategoryMatch = selectedCategory ? product.category?.name?.toLowerCase().includes(selectedCategory.toLowerCase()) : true;

      
      let isPriceMatch = true;
      if (maxPrice) {
        isPriceMatch = product.price <= parseFloat(maxPrice);
      } else if (priceFilter === 'less50') {
        isPriceMatch = product.price < 50;
      } else if (priceFilter === 'more100') {
        isPriceMatch = product.price > 100;
      }

      return (
        (productName.includes(searchTermLower) || productDescription.includes(searchTermLower)) &&
        isCategoryMatch &&
        isPriceMatch
      );
    });

    setFilteredProducts(filtered);
  }, [searchTerm, selectedCategory, priceFilter, maxPrice, products]);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/categories');
      if (Array.isArray(response.data.data)) {
        setCategories(response.data.data);
      } else {
        console.error('Categories data is not an array:', response.data);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/products');
      if (Array.isArray(response.data.data)) {
        setProducts(response.data.data);
        setFilteredProducts(response.data.data); 
      } else {
        console.error('Products data is not an array:', response.data);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handlePriceChange = (event) => {
    setMaxPrice(event.target.value);
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const displayedProducts = filteredProducts.slice(
    (currentPage - 1) * 4,
    currentPage * 4
  );

  return (
    <div className="w-full top-0 left-0 z-50 p-[12px] md:p-[32px]">
      <Navbar />
      <div className=" mx-auto p-4">
        
        <div className="flex items-center mb-4 gap-5">
          <ThemeProvider theme={theme}>
            <TextField
              label="Search Products"
              variant="outlined"
              fullWidth
              value={searchTerm}
              onChange={handleSearch}
            />
          </ThemeProvider>
        </div>

        {/* Category Filter */}
        <ThemeProvider theme={theme}>
          <div className="mb-4">
            <InputLabel>Category</InputLabel>
            <Select
              value={selectedCategory}
              onChange={handleCategoryChange}
              label="Category"
              fullWidth
            >
              <MenuItem value="">All Categories</MenuItem>
              {categories.map((category) => (
                <MenuItem key={category._id} value={category.name}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
          </div>
        </ThemeProvider>

        {/* Max Price Filter */}
        <ThemeProvider theme={theme}>
          <div className="mb-4">
            <TextField
              label="Max Price"
              variant="outlined"
              fullWidth
              value={maxPrice}
              onChange={handlePriceChange}
              type="number"
            />
          </div>
          <Button
            variant={priceFilter === 'less50' ? 'contained' : 'outlined'}
            onClick={() => setPriceFilter('less50')}
          >
            Less than $50
          </Button>
          <Button
            variant={priceFilter === 'more100' ? 'contained' : 'outlined'}
            onClick={() => setPriceFilter('more100')}
          >
            More than $100
          </Button>
        </ThemeProvider>

        {/* Products */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {displayedProducts.map((product) => (
            <div key={product._id} className="border p-4 rounded">
              <img src={product.image} alt={product.name} className="w-full h-48 object-cover mb-2" />
              <h4 className="font-bold text-pink-600">{product.name}</h4>
              <p className=''>${product.price}</p>
              <p className='font-Jost'>{product.description || "No description available!"}</p>
              <p className='font-Lobster text-pink-600 text-end'>{product.category?.name || "uncategorized"}</p>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-4">
          <ThemeProvider theme={theme}>
            <Pagination
              count={Math.ceil(filteredProducts.length / 4)}
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
            />
          </ThemeProvider>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
