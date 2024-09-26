import React from 'react';
import { Product } from '../types';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { requestTransaction } from '../store/slices/payment';
import '../styles/PaymentSummary.css';

interface PaymentSummaryProps {
  product: Product;
  quantity: number;
  baseFee: number;
  deliveryFee: number;
  paymentMethod: any | null;
  onConfirmPayment: (transactionRequest: any) => void;
}

const PaymentSummary: React.FC<PaymentSummaryProps> = ({ product, quantity, baseFee, deliveryFee, paymentMethod, onConfirmPayment }) => {
  const dispatch: AppDispatch = useDispatch();
  const { transaction } = useSelector((state: RootState) => state.payment);


  const productTotal = product.price * quantity;
  const total = productTotal + baseFee + deliveryFee;
  console.log('paymentMethod', paymentMethod);
  const paymentPayload = {
    card_holder: paymentMethod?.card_holder,
    token: paymentMethod?.card_token,
    amount: total,
    product_id: product.id,
    customer_id: paymentMethod?.customerId,
    installments: 1,
  };

  const handleConfirmPayment = async () => {
    await dispatch(requestTransaction(paymentPayload));
    onConfirmPayment(transaction);
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
