import React from 'react';
import ProductRow from './ProductRow';

const ProductTable = ({ products, onUpdateStock, onDelete }) => {
  if (products.length === 0) {
    return <p>Không có dữ liệu</p>;
  }

  return (
    <table className="product-table">
      <thead>
        <tr>
          <th>Tên sản phẩm</th>
          <th>Danh mục</th>
          <th>Giá</th>
          <th>Tồn kho</th>
          <th>Thao tác</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <ProductRow
            key={product.id}
            product={product}
            onUpdateStock={onUpdateStock}
            onDelete={onDelete}
          />
        ))}
      </tbody>
    </table>
  );
};

export default ProductTable;