import React from 'react';
import { formatMoney } from '../data';

const Home = ({ products }) => {
  const totalProducts = products.length;
  const lowStockCount = products.filter(({ stock }) => stock < 5).length;
  const totalValue = products.reduce(
    (sum, { price, stock }) => sum + price * stock,
    0
  );

  return (
    <div>
      <h1>Kho hàng</h1>
      <p>{`Tổng số sản phẩm: ${totalProducts}`}</p>
      <p>{`Số sản phẩm sắp hết hàng: ${lowStockCount}`}</p>
      <p>{`Tổng giá trị kho: ${formatMoney(totalValue)}`}</p>
    </div>
  );
};

export default Home;