// import React, { useState } from 'react'
// import axios from 'axios'
// import { toast } from 'react-hot-toast'
// import { useNavigate } from 'react-router-dom'

// export default function Login() {
//   const navigate = useNavigate()
  
//   const [data, setData] = useState({
//     email: '',
//     password: '',
//   })

//   const login = async (e) => {
//     e.preventDefault()
//     const { email, password } = data
//     try {
//       const response = await axios.post('http://localhost:5000/api/auth/login', { email, password })
//       const { data: resData } = response

//       if (resData.error) {
//         toast.error(resData.error)
//       } else {
//         setData({})  // Clear the form only after successful login
//         toast.success('Login successful!')
//         navigate('/')  // Redirect to the home page after successful login
//       }
//     } catch (error) {
//       console.error(error.response?.data?.error || "An unexpected error occurred")
//       toast.error(error.response?.data?.error || "Something went wrong")
//     }
//   }

//   return (
//     <div>
//       <form onSubmit={login}>
//         <label htmlFor="email">Email</label>
//         <input
//           type="email"
//           name="email"
//           placeholder="Enter your email"
//           value={data.email}  // value is controlled, no undefined
//           onChange={(e) => setData({ ...data, email: e.target.value })}
//         />

//         <label htmlFor="password">Password</label>
//         <input
//           type="password"
//           name="password"
//           placeholder="Enter your password"
//           value={data.password}  // value is controlled, no undefined
//           onChange={(e) => setData({ ...data, password: e.target.value })}
//         />

//         <button className='bg-red-400' type="submit">Login</button>
//       </form>
//     </div>
//   )
// }




import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { Paper, TextField, Button, Typography } from '@mui/material';
import bcg from '../assets/bcg.jpg'; 

const GlassContainer = styled(Paper)({
  background: 'rgba(255, 255, 255, 0.15)',
  backdropFilter: 'blur(10px)',
  padding: '2rem',
  width: '100%',
  maxWidth: '400px',
  borderRadius: '10px',
});

export default function Login() {
  const navigate = useNavigate();
  
  const [data, setData] = useState({
    email: '',
    password: '',
  });

  const login = async (e) => {
    e.preventDefault();
    const { email, password } = data;
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      const { data: resData } = response;

      if (resData.error) {
        toast.error(resData.error);
      } else {
        setData({}); // Clear the form only after successful login
        toast.success('Login successful!');
        navigate('/'); 
      }
    } catch (error) {
      console.error(error.response?.data?.error || "An unexpected error occurred");
      toast.error(error.response?.data?.error || "Something went wrong");
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundImage: `url(${bcg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <GlassContainer elevation={3}>
      <Typography variant="h4" className="text-center mb-6 text-pink-600 font-bold">
          Login
        </Typography>
        <form onSubmit={login}>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={data.email} // value is controlled, no undefined
            onChange={(e) => setData({ ...data, email: e.target.value })}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={data.password} // value is controlled, no undefined
            onChange={(e) => setData({ ...data, password: e.target.value })}
          />
          {/* <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Login
          </Button> */}
           <Button
            type="submit"
          
            className="w-full py-2 bg-pink-600 hover:bg-pink-300 hover:text-white"
          >
            <p className='font-Lobster text-pink-600 text-xl md:text-lg '>Login</p>
          </Button>
        </form>
      </GlassContainer>
    </div>
  );
}
