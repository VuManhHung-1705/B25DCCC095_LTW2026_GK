import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import axios from 'axios';
import Layout from './components/Layout';
import Home from './pages/Home';
import ProductList from './pages/ProductList';
import AddProduct from './pages/AddProduct';
import ProductDetail from './pages/ProductDetail';
import './App.css';

const App = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const savedProducts = localStorage.getItem('gk_products');
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts));
      setLoading(false);
      return;
    }

    const controller = new AbortController();

    axios
      .get('/data/products.json', { signal: controller.signal })
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        if (axios.isCancel(err)) {
          return;
        }
        setError('Không tải được dữ liệu');
        setLoading(false);
      });

    return () => {
      controller.abort();
    };
  }, []);

  useEffect(() => {
    if (!loading) {
      localStorage.setItem('gk_products', JSON.stringify(products));
    }
  }, [products, loading]);

  const handleUpdateStock = (id, delta) => {
    setProducts((prevProducts) =>
      prevProducts.map((item) =>
        item.id === id
          ? { ...item, stock: Math.max(0, item.stock + delta) }
          : item
      )
    );
  };

  const handleDeleteProduct = (id) => {
    setProducts((prevProducts) => prevProducts.filter((item) => item.id !== id));
  };

  const handleAddProduct = (newProductData) => {
    setProducts((prevProducts) => {
      const maxId = prevProducts.reduce(
        (max, item) => (item.id > max ? item.id : max),
        0
      );
      const newProduct = {
        id: maxId + 1,
        ...newProductData,
      };
      return [...prevProducts, newProduct];
    });
  };

  return (
    <Routes>
      <Route path="/" element={<Layout loading={loading} error={error} />}>
        <Route index element={<Home products={products} />} />
        <Route
          path="products"
          element={
            <ProductList
              products={products}
              onUpdateStock={handleUpdateStock}
              onDelete={handleDeleteProduct}
            />
          }
        />
        <Route
          path="products/new"
          element={<AddProduct onAdd={handleAddProduct} />}
        />
        <Route
          path="products/:id"
          element={<ProductDetail products={products} />}
        />
      </Route>
    </Routes>
  );
};

export default App;