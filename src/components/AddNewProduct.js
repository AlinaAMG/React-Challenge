
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";

 function AddNewProduct() {
  const [product, setProduct] = useState({
    title: "",
    price: "",
    description: "",
  });

  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(""); 
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Basic form validation
    if (!product.title || !product.price || !product.description) {
      setError("All fields are required.");
      return;
    }
  
    setLoading(true); 
   
    axios
      .post("https://fakestoreapi.com/products", product)
      .then((response) => {
        console.log("New Product Added:", response.data);
  
        // Save the new product to localStorage
        localStorage.setItem("newProduct", JSON.stringify(response.data)); 
        
        const existingProducts = JSON.parse(localStorage.getItem("products")) || [];
        existingProducts.push(response.data); // Add the new product to the list
        localStorage.setItem("products", JSON.stringify(existingProducts)); // Save back to localStorage
  
        
        navigate(`/products/create`, { state: { product: response.data } });
      })
      .catch((err) => {
        console.log("Error adding product:", err);
        setError("An error occurred while adding the product.");
      })
      .finally(() => {
        setLoading(false); 
      });
  };

  return (
    <div className="add-product-form">
    <h2>Add New Product</h2>
    {error && <p style={{ color: "red" }}>{error}</p>} 
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Name:</label>
        <input
          type="text"
          name="title"
          value={product.title}
          onChange={handleChange}
          required
        />
      </div>
  
      <div className="form-group">
        <label>Price:</label>
        <input
          type="number"
          name="price"
          value={product.price}
          onChange={handleChange}
          required
        />
      </div>
  
      <div className="form-group">
        <label>Description:</label>
        <textarea
          name="description"
          value={product.description}
          onChange={handleChange}
          required
        />
      </div>
  
      <div className="form-actions">
        <button type="submit" disabled={loading}>
          {loading ? "Adding..." : "Add Product"}
        </button>
        <Link to="/products" className="go-back-link">Go Back</Link>
      </div>
    </form>
  </div>
  );
}

export default AddNewProduct;
