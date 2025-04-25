import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';

function UpdatedProduct() {
    const { id } = useParams(); 
    const [product, setProduct] = useState([]);
  
    useEffect(() => {
      axios
        .get(`https://fakestoreapi.com/products/${id}`)
        .then((response) => {
          setProduct(response.data);
        })
        .catch((error) => {
          console.error("Error fetching updated product:", error);
        });
    }, [id]); 
  
    if (!product) {
      return <p>Loading updated product...</p>;
    }
  
    return (
      <div className="updated-product">
        <h2>Updated Product</h2>
        <p className="product-info">
          <strong>Title:</strong> {product.title}
        </p>
        <p className="product-info">
          <strong>Price:</strong> ${product.price}
        </p>
        <p className="product-info">
          <strong>Description:</strong> {product.description}
        </p>
        <Link to="/products" className="back-link">Back to homepage</Link>
      </div>
    );
  }
  
  export default UpdatedProduct;
  

