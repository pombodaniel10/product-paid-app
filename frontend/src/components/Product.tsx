import React, { useState } from 'react';
import { Product } from '../types';
import '../styles/Product.css';

interface ProductProps {
  product: Product;
  onPayClick: (product: Product, quantity: number) => void;
}

const ProductPage: React.FC<ProductProps> = ({ product, onPayClick }) => {
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    setQuantity(value);
  };

  return (
    <div className="container product-container">
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p className="product-price">Price: ${product.price.toFixed(2)}</p>
      <p>Available: {product.stock}</p>
      <input 
        className="quantity-input"
        type="number" 
        value={quantity} 
        min={1} 
        max={product.stock} 
        onChange={handleQuantityChange} 
      />
      <button onClick={() => onPayClick(product, quantity)}>Pay with Credit Card</button>
    </div>
  );
};

export default ProductPage;