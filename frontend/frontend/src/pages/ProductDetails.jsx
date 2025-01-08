import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../axiosConfig";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axiosInstance.get(`/api/products/${id}`);
        setProduct(response.data.data);
      } catch (error) {
        console.error("Error fetching product details", error);
      }
    };

    fetchProduct();
  }, [id]);

  return product ? (
    <div>
      <h1>{product.name}</h1>
      <p>Price: {product.price}</p>
      <p>Color: {product.color}</p>
    </div>
  ) : (
    <p>Loading...</p>
  );
};

export default ProductDetails;
