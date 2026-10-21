import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import FilterBar from '../components/FilterBar';
import ProductTable from '../components/ProductTable';

const ProductList = ({ products, onUpdateStock, onDelete }) => {
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tất cả');
  const [notification, setNotification] = useState(location.state?.message || '');

  useEffect(() => {
    if (!notification) return;

    const timer = setTimeout(() => {
      setNotification('');
    }, 3000);

    return () => clearTimeout(timer);
  }, [notification]);

  const filteredProducts = products.filter(({ name, category }) => {
    const matchesName = name.toLowerCase().includes(searchTerm.trim().toLowerCase());
    const matchesCategory =
      selectedCategory === 'Tất cả' || category === selectedCategory;
    return matchesName && matchesCategory;
  });

  return (
    <div>
      {notification && (
        <div className="alert-box">
          <span>{notification}</span>
          <button type="button" onClick={() => setNotification('')}>
            ×
          </button>
        </div>
      )}

      <FilterBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />

      <p>{`Tìm thấy ${filteredProducts.length} sản phẩm`}</p>

      <ProductTable
        products={filteredProducts}
        onUpdateStock={onUpdateStock}
        onDelete={onDelete}
      />
    </div>
  );
};

export default ProductList;