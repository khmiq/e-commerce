import React, { useState, useEffect } from 'react';
import {
  Button,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Modal,
  Box,
  MenuItem,
} from '@mui/material';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
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
  
const Dashboard = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [isCategory, setIsCategory] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    image: null,
    _id: null,
  });
  const [imageUrl, setImageUrl] = useState('');
  const [error, setError] = useState('');

  const BASE_URL = 'http://localhost:5000';

  
  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/categories`);
      setCategories(response.data.data || []);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

 
  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/products`);
      setProducts(response.data.data || []);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, []);

  
  const handleOpenModal = (type, item = null) => {
    setIsCategory(type === 'category');
    if (item) {
      setFormData({
        name: item.name || '',
        description: item.description || '',
        price: item.price || '',
        category: item.category || '',
        image: null,
        _id: item._id || null,
      });
      setImageUrl(item.imageUrl || '');
    } else {
      setFormData({
        name: '',
        description: '',
        price: '',
        category: '',
        image: null,
        _id: null,
      });
      setImageUrl('');
    }
    setOpenModal(true);
  };


  const handleCloseModal = () => {
    setOpenModal(false);
    setError('');
  };

  
  const handleSubmit = async () => {
    if (!formData.name || !formData.description || (!isCategory && (!formData.price || !formData.category))) {
      setError('Please fill in all required fields.');
      return;
    }

    const form = new FormData();
    form.append('name', formData.name);
    form.append('description', formData.description);

    if (!isCategory) {
      form.append('price', parseFloat(formData.price));
      form.append('category', formData.category);
    }

    if (formData.image) {
      form.append('image', formData.image);
    }

    const endpoint = isCategory ? `${BASE_URL}/api/categories` : `${BASE_URL}/api/products`;
    const url = formData._id ? `${endpoint}/${formData._id}` : endpoint;

    try {
      const config = {
        headers: { 'Content-Type': 'multipart/form-data' },
      };
      if (formData._id) {
        await axios.put(url, form, config);
      } else {
        await axios.post(url, form, config);
      }
      handleCloseModal();
      fetchCategories();
      fetchProducts();
    } catch (error) {
      console.error('Error response:', error.response?.data);
      setError(error.response?.data?.message || 'Error submitting the form. Please try again.');
    }
  };

  
  const handleDelete = async (id, type) => {
    const endpoint = type === 'category' ? `${BASE_URL}/api/categories/${id}` : `${BASE_URL}/api/products/${id}`;
    try {
      await axios.delete(endpoint);
      fetchCategories();
      fetchProducts();
    } catch (error) {
      console.error('Error deleting item:', error.response?.data?.message);
      setError('Error deleting the item. Please try again.');
    }
  };

 
  const { getRootProps, getInputProps } = useDropzone({
    accept: { 'image/jpeg': ['.jpg', '.jpeg'], 'image/png': ['.png'], 'image/gif': ['.gif'] },
    maxFiles: 1,
    onDrop: (acceptedFiles, fileRejections) => {
      if (fileRejections.length > 0) {
        setError('Invalid file type or size. Please upload a valid image file.');
      } else if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        setFormData({ ...formData, image: file });
        setError('');
      }
    },
  });

  return (
    <div className="p-8">
      <ThemeProvider theme={theme}>
      <div className="flex gap-4">
        <Button variant="contained" color="secondary" onClick={() => handleOpenModal('category')}>
          Add Category
        </Button>
        <Button variant="contained" color="secondary" onClick={() => handleOpenModal('product')}>
          Add Product
        </Button>
      </div>


      <TableContainer component={Paper} className="mt-4">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell color="secondary"><p className='text-pink-600 text-xl font-Lobster'>Category Name</p></TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categories.map((category) => (
              <TableRow key={category._id}>
                <TableCell>{category.name}</TableCell>
                <TableCell>
                  <Button onClick={() => handleOpenModal('category', category)} color="primary">
                    Edit
                  </Button>
                  <Button onClick={() => handleDelete(category._id, 'category')} color="error">
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

     
      <TableContainer component={Paper} className="mt-4">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><p className='text-pink-600 text-xl font-Lobster'>Product Name</p></TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product._id}>
                <TableCell>{product.name}</TableCell>
                <TableCell>
                  <Button onClick={() => handleOpenModal('product', product)} color="primary">
                    Edit
                  </Button>
                  <Button onClick={() => handleDelete(product._id, 'product')} color="error">
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Modal */}
      <Modal open={openModal} onClose={handleCloseModal}>
        <Box className="bg-white p-6 rounded-md w-96 mx-auto mt-20">
          <TextField
            label="Name"
            fullWidth
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="mb-4"
          />
          <TextField
            label="Description"
            fullWidth
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="mb-4"
          />
          {!isCategory && (
            <>
              <TextField
                label="Price"
                fullWidth
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="mb-4"
              />
              <TextField
                select
                label="Category"
                fullWidth
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="mb-4"
              >
                {categories.map((cat) => (
                  <MenuItem key={cat._id} value={cat._id}>
                    {cat.name}
                  </MenuItem>
                ))}
              </TextField>
            </>
          )}
          <div className="mb-4">
            {imageUrl && (
              <div className="mb-2">
                <img src={imageUrl} alt="existing" className="w-24 h-24 object-cover" />
              </div>
            )}
            <div {...getRootProps()} className="border p-4 border-dashed">
              <input {...getInputProps()} />
              <p>Drag & drop an image here, or click to select one</p>
            </div>
          </div>

          {error && <p className="text-pink-500">{error}</p>}

          <div className="flex justify-between mt-4">
            <Button onClick={handleCloseModal} variant="outlined">
              Cancel
            </Button>
            <Button onClick={handleSubmit} variant="contained" color="primary">
              Submit
            </Button>
          </div>
        </Box>
      </Modal>
      </ThemeProvider>

      
      
    </div>
  );
};

export default Dashboard;

