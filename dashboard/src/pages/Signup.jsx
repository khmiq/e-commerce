import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Box, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import bcg from '../assets/bcg.jpg'
const GlassContainer = styled(Paper)({
  background: 'rgba(255, 255, 255, 0.15)',
  backdropFilter: 'blur(10px)',
  borderRadius: '15px',
  padding: '2rem',
  boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
  border: '1px solid rgba(255, 255, 255, 0.3)',
});

export default function Signup() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const registerUser = async (e) => {
    e.preventDefault();
    const { name, email, password } = data;
    try {
      const { data } = await axios.post('http://localhost:5000/api/auth/signup', { name, email, password });
      if (data.error) {
        toast.error(data.error);
      } else {
        setData({});
        toast.success('Login Successful. Welcome!');
        navigate('/login');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box
      className="flex justify-center items-center h-screen bg-cover bg-center"
      style={{
        backgroundImage: `url(${bcg})`,
      }}
    >
      <GlassContainer elevation={3} className="max-w-md w-full">
        <Typography variant="h4" className="text-center mb-6 text-pink-600 font-bold">
          Sign Up
        </Typography>
        <form onSubmit={registerUser} className="space-y-4">
          <TextField
            fullWidth
            label="Name"
            variant="outlined"
            placeholder="Enter your name"
            value={data.name}
            onChange={(e) => setData({ ...data, name: e.target.value })}
            required
          />
          <TextField
            fullWidth
            label="Email"
            variant="outlined"
            type="email"
            placeholder="Enter your email"
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
            required
          />
          <TextField
            fullWidth
            label="Password"
            variant="outlined"
            type="password"
            placeholder="Enter your password"
            value={data.password}
            onChange={(e) => setData({ ...data, password: e.target.value })}
            required
          />
          <Button
            type="submit"
          
            className="w-full py-2 bg-pink-600 hover:bg-pink-300 hover:text-white"
          >
            <p className='font-Lobster text-pink-600 text-xl md:text-lg '>Submit</p>
          </Button>
        </form>
      </GlassContainer>
    </Box>
  );
}



