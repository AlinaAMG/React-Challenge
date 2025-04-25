import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import HomePage from './components/HomePage'; 
import ProductDetails from './components/ProductDetails'; 
import EditProduct from './components/EditProduct'; 
import AddNewProduct from './components/AddNewProduct'; 
import CreateProducts from "./components/CreateProducts";
import UpdatedProduct from './components/UpdatedProduct';
import PageNotFound from './components/PageNotFound'; 


function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    
    axios
      .get('https://fakestoreapi.com/products')
      .then((res) => {
        setProducts(res.data); 
      })
      .catch((err) => {
        console.log('Error fetching products:', err);
      });
  }, []);

  return (
    <div>
      <BrowserRouter>
        <Routes>
          
          <Route path="/products" element={<HomePage products={products} setProducts={setProducts} />} />

         
          <Route path="/products/show/:id" element={<ProductDetails products={products} />} />

         
          <Route path="/products/edit/:id" element={<EditProduct products={products} setProducts={setProducts} />} />

          
          <Route path="/products/new" element={<AddNewProduct setProducts={setProducts} />} />

         
          <Route path="/products/create" element={<CreateProducts />} />   
          
          <Route path="/products/update/:id" element={<UpdatedProduct />} />
         
        
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
