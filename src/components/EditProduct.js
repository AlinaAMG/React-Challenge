import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";


function EditProduct({ products, setProducts }) {
  const [product, setProduct] = useState({
    title: "",
    price: "",
    description: "",
  });

  const [updateMessage, setUpdateMessage] = useState("");

  const { id } = useParams();
  const navigate = useNavigate();



  useEffect(() => {
    // Find the current product to edit
    const currentProduct = products.find((product) => product.id === parseInt(id));
    if (currentProduct) {
      setProduct(currentProduct);
    }
  }, [id, products]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Update the product in local state
    const updatedProducts = products.map((prod) =>
      prod.id === parseInt(id) ? { ...prod, ...product } : prod
    );

    // Save the updated list to localStorage
    localStorage.setItem("products", JSON.stringify(updatedProducts));

    // Update the state with the new product list
    setProducts(updatedProducts);

    
    // Set success message
    setUpdateMessage("Product updated successfully!");

      // Hide message and navigate after 2s
      setTimeout(() => {
        setUpdateMessage("");
        navigate("/products");
      }, 2000);
  };

  return (
    <div>
      <h2 className="title">Edit {product.title}</h2>
      {updateMessage && <p className="success-message">{updateMessage}</p>}
      <form onSubmit={handleSubmit} className="edit-form">
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="title"
            value={product.title}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Price:</label>
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Description:</label>
          <textarea
            name="description"
            value={product.description}
            onChange={handleChange}
            rows="6"
          />
        </div>

        <div className="form-actions">
          <button type="submit" className="update-btn">
            Update Product
          </button>
          <Link to="/products" className="back-link">
            Back to Products
          </Link>
        </div>
      </form>
    </div>
  );
}

export default EditProduct;