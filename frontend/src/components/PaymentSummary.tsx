import React from 'react';
import { Product } from '../types';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store/store';
import { requestTransaction } from '../store/slices/payment';
import '../styles/PaymentSummary.css';
import { PaymentMethod } from '../types';

interface PaymentSummaryProps {
  product: Product;
  quantity: number;
  baseFee: number;
  deliveryFee: number;
  paymentMethod: PaymentMethod | null;
  onConfirmPayment: (transactionRequest: any) => void;
}

const PaymentSummary: React.FC<PaymentSummaryProps> = ({ product, quantity, baseFee, deliveryFee, paymentMethod, onConfirmPayment }) => {
  const dispatch: AppDispatch = useDispatch();

  const productTotal = product.price * quantity;
  const total = productTotal + baseFee + deliveryFee;

  const handleConfirmPayment = async () => {
    const transactionRequest = requestTransaction(paymentMethod);
    await dispatch(requestTransaction(paymentMethod));
    onConfirmPayment(transactionRequest);
  };

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
      <button onClick={handleConfirmPayment}>Confirm Payment</button>
    </div>
  );
};

export default PaymentSummary;
