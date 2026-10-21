import React from 'react';
import { CATEGORIES } from '../data';

const FilterBar = ({ searchTerm, onSearchChange, selectedCategory, onCategoryChange }) => {
  return (
    <div className="filter-bar">
      <div className="filter-group">
        <label htmlFor="search-input">Tìm kiếm</label>
        <input
          id="search-input"
          type="text"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Nhập tên sản phẩm..."
        />
      </div>

      <div className="filter-group">
        <label htmlFor="category-select">Danh mục</label>
        <select
          id="category-select"
          value={selectedCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
        >
          <option value="Tất cả">Tất cả</option>
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default FilterBar;