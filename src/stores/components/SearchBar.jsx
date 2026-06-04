import React from 'react'
import ProductCategory from './ProductCategory'

const SearchBar = ({ onCategoryChange, onSearchChange }) => {
  return (
    <div className='search-bar flex-box'>
      <div className="left-search">
        Search: <input
          type='text'
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search products..."
        />
        <ProductCategory onCategoryChange={onCategoryChange} />
      </div>


    </div>
  )
}

export default SearchBar