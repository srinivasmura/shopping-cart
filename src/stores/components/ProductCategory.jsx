import React from 'react'
const ProductCategory = ({ onCategoryChange }) => {
  const categories = [
    'all Products',
    "men's clothing",
    "women's clothing",
    'electronics',
    'jewelery'
  ];

  const handleChange = (e) => {
    onCategoryChange(e.target.value);
  };

  return (
    <select onChange={handleChange} className="category-dropdown">
      {categories.map(category => (
        <option key={category} value={category}>
          {category.charAt(0).toUpperCase() + category.slice(1)}
        </option>
      ))}
    </select>
  );
}

export default ProductCategory;