import React, { useState, useEffect } from "react";
import { useParams,Link } from "react-router-dom";


function ProductDetails({ products }) {
  const [product, setProduct] = useState(null);
  const { id } = useParams();

  useEffect(() => {
  
    const currentProduct = products.find((prod) => prod.id === parseInt(id));
    if (currentProduct) {
      setProduct(currentProduct);
    }
  }, [id, products]); 

  if (!product) return <p>Loading...</p>;

  return (
    <div className="product-details">
      <h1 className="product-title">{product.title}</h1>
      <div className="product-info">
        <h3 className="product-price">Name: {product.title}</h3>
        <h3 className="product-price">Price: ${product.price}</h3>
        <h3 className="product-description">Description: {product.description}</h3>
      </div>

      <div className="product-links">
        <Link to="/products" className="back-link">Back</Link>
        <Link to={`/products/edit/${id}`} className="edit-link">Edit</Link>
      </div>
    </div>
  );
}

export default ProductDetails;

