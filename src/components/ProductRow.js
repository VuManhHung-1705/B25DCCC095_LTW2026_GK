import React from 'react';
import { Link } from 'react-router-dom';
import { formatMoney } from '../data';

const ProductRow = ({ product, onUpdateStock, onDelete }) => {
  const { id, name, category, price, stock } = product;
  const isLowStock = stock < 5;

  return (
    <tr className={isLowStock ? 'low-stock' : ''}>
      <td>
        <Link to={`/products/${id}`}>{name}</Link>
      </td>
      <td>{category}</td>
      <td>{formatMoney(price)}</td>
      <td>{stock}</td>
      <td>
        <button
          type="button"
          onClick={() => onUpdateStock(id, 1)}
        >
          +
        </button>
        <button
          type="button"
          onClick={() => onUpdateStock(id, -1)}
          disabled={stock === 0}
        >
          -
        </button>
        <button
          type="button"
          onClick={() => onDelete(id)}
        >
          Xóa
        </button>
      </td>
    </tr>
  );
};

export default ProductRow;