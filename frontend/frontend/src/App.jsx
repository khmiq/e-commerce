import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";


const App = () => {
  return (
    <Router>
      <Routes>
       
        <Route  path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetails />} />
      
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
