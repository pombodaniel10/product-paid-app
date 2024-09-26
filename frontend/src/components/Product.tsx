import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProduct } from '../store/slices/product';
import { RootState, AppDispatch } from '../store/store';
import '../styles/Product.css';

interface ProductPageProps {
  productId: number;
  onPayClick: (quantity: number) => void;
}

const ProductPage: React.FC<ProductPageProps> = ({ productId, onPayClick }) => {
  const dispatch: AppDispatch = useDispatch();
  const product = useSelector((state: RootState) => state.product.product);
  const status = useSelector((state: RootState) => state.product.loading);
  const error = useSelector((state: RootState) => state.product.error);

  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    setQuantity(value);
  };

  useEffect(() => {
    dispatch(fetchProduct(productId));
  }, [dispatch, productId]);

  if (status && !error) {
    return <div className="loading">Loading...</div>;
  }

  if (status && error) {
    return <div className="error">Failed to load product.</div>;
  }

  return (
    <div className="product-page">
      {product && (
        <>
          <div className="product-image">
            <img src={product.image} alt={product.name} />
          </div>
          <div className="product-info">
            <h2 className="product-title">{product.name}</h2>
            <p className="product-description">{product.description}</p>
            <p className="product-price">Price: ${product.price}</p>
            <p className="product-units">Units Available: {product.stock}</p>
            <input 
              className="quantity-input"
              type="number" 
              value={quantity} 
              min={1} 
              max={product.stock} 
              onChange={handleQuantityChange} 
            />
            <button onClick={() => onPayClick(quantity)}>Pay with Credit Card</button>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductPage;