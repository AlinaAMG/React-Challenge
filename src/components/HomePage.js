import axios from 'axios';
import React, { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';

function HomePage({ products, setProducts }) {
  const [deleteMessage, setDeleteMessage] = useState("");

  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem('products'));
    if (storedProducts) {
      setProducts(storedProducts);
    } else {
      axios
        .get('https://fakestoreapi.com/products')
        .then((res) => {
          setProducts(res.data);
          localStorage.setItem('products', JSON.stringify(res.data));
        })
        .catch((err) => console.log('Error fetching products:', err));
    }
  }, [setProducts]);

  const handleDelete = (productId) => {
    const updatedProducts = products.filter(
      (product) => product.id !== productId
    );
    setProducts(updatedProducts);
    // Update localStorage after deletion
    localStorage.setItem('products', JSON.stringify(updatedProducts));
     // Set the delete message
    setDeleteMessage("Product deleted successfully!");
    
    
    // Hide the message after 3 seconds
    setTimeout(() => {
      setDeleteMessage("");
    }, 3000); // Reset message after 3 seconds

  };

  return (
    <div>
      <h2 className="title">Products</h2>
      {deleteMessage && <p className="delete-message">{deleteMessage}</p>}
      <table className="product-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products &&
            products.map((product) => (
              <tr key={product.id}>
                <td>{product.title}</td>
                <td>{product.description}</td>
                <td>${product.price}</td>
                <td>
                  <Link
                    to={`/products/show/${product.id}`}
                    style={{ marginRight: '10px' }}
                  >
                    Show
                  </Link>
                  <Link
                    to={`/products/edit/${product.id}`}
                    style={{ marginRight: '10px' }}
                  >
                    Edit
                  </Link>
                  <button onClick={() => handleDelete(product.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <Link className="new-product-link" to="/products/new">
        Add Product
      </Link>
    </div>
  );
}

export default HomePage;
