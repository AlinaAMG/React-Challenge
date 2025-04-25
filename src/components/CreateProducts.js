
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function ProductsCreate() {
  const [newProduct, setNewProduct] = useState(null);
 
  useEffect(() => {
    const savedProduct = JSON.parse(localStorage.getItem("newProduct"));
    setNewProduct(savedProduct);
  }, []);
  return (
    <div>
      <h2>Product Added</h2>
      {newProduct ? (
        <div>
          <h3>Title: {newProduct.title}</h3>
          <p>Price: ${newProduct.price}</p>
          <p>Description: {newProduct.description}</p>
        </div>
      ) : (
        <p>No product data available.</p>
      )}
      <Link to="/products">Back to Products</Link>
    </div>
  );
}

export default ProductsCreate;
