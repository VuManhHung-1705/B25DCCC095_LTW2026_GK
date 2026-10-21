import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CATEGORIES } from '../data';

const AddProduct = ({ onAdd }) => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (name.trim() === '' || category === '' || price === '' || stock === '') {
      setError('Vui lòng nhập đầy đủ thông tin');
      return;
    }

    const numPrice = Number(price);
    const numStock = Number(stock);

    if (numPrice <= 0 || !Number.isInteger(numStock) || numStock < 0) {
      setError('Giá phải lớn hơn 0, số lượng là số nguyên không âm');
      return;
    }

    const trimmedName = name.trim();
    onAdd({
      name: trimmedName,
      category,
      price: numPrice,
      stock: numStock,
    });

    const message = `Đã thêm sản phẩm ${trimmedName}`;
    navigate('/products', { replace: true, state: { message } });
  };

  return (
    <div>
      <h2>Thêm mới</h2>
      <form onSubmit={handleSubmit} className="product-form" noValidate>
        <div className="form-group">
          <label htmlFor="name">Tên sản phẩm</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="category">Danh mục</label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="price">Giá</label>
          <input
            id="price"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="stock">Số lượng tồn</label>
          <input
            id="stock"
            type="number"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
          />
        </div>

        <button type="submit">Thêm</button>
      </form>

      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default AddProduct;