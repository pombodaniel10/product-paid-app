import React from 'react';
import { Product } from '../types';
import '../styles/PaymentSummary.css';

interface PaymentSummaryProps {
  product: Product;
  quantity: number;
  baseFee: number;
  deliveryFee: number;
  onConfirmPayment: () => void;
}

const PaymentSummary: React.FC<PaymentSummaryProps> = ({ product, quantity, baseFee, deliveryFee, onConfirmPayment }) => {
  const productTotal = product.price * quantity;
  const total = productTotal + baseFee + deliveryFee;

  return (
    <div className="container summary-container">
      <h2>Payment Summary</h2>
      <div className="summary-row">
        <p>Product:</p>
        <p>{product.name}</p>
      </div>
      <div className="summary-row">
        <p>Quantity:</p>
        <p>{quantity}</p>
      </div>
      <div className="summary-row">
        <p>Product Total:</p>
        <p>${productTotal.toFixed(2)}</p>
      </div>
      <div className="summary-row">
        <p>Base Fee:</p>
        <p>${baseFee.toFixed(2)}</p>
      </div>
      <div className="summary-row">
        <p>Delivery Fee:</p>
        <p>${deliveryFee.toFixed(2)}</p>
      </div>
      <div className="summary-row summary-total">
        <p>Total:</p>
        <p>${total.toFixed(2)}</p>
      </div>
      <button onClick={onConfirmPayment}>Confirm Payment</button>
    </div>
  );
};

export default PaymentSummary;
