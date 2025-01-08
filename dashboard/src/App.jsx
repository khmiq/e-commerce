import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {Toaster} from 'react-hot-toast'


// import ProductDetails from "./pages/ProductDetails";
import Login from "./pages/Login";
import SignupPage from "./pages/Signup";
import AdminDashboard from "./pages/AdminDashboard";
// import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
  return (
    <Router>
       <Toaster position="bottom-right" toastOptions={{duration: 2000}}/>
      <Routes>
        <Route path='/' element={<AdminDashboard/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<SignupPage/>}/>
        {/* <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        /> */}
        
        <Route path="*" element={<div>Page not found</div>} /> 
      </Routes>
    </Router>
  );
};

export default App;
