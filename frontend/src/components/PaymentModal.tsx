import React, { useState } from 'react';
import { PaymentInfo } from '../types';
import '../styles/PaymentModal.css';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (paymentInfo: PaymentInfo) => void;
}

const PaymentModal: React.FC<PaymentModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [cardNumber, setCardNumber] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');

  const handleSubmit = () => {
    onSubmit({
      cardNumber,
      expirationDate,
      cvv,
      deliveryAddress,
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal">
      <h2>Enter Payment Information</h2>
      <input
        type="text"
        placeholder="Card Number"
        value={cardNumber}
        onChange={(e) => setCardNumber(e.target.value)}
      />
      <input
        type="text"
        placeholder="Expiration Date"
        value={expirationDate}
        onChange={(e) => setExpirationDate(e.target.value)}
      />
      <input
        type="text"
        placeholder="CVV"
        value={cvv}
        onChange={(e) => setCvv(e.target.value)}
      />
      <input
        type="text"
        placeholder="Delivery Address"
        value={deliveryAddress}
        onChange={(e) => setDeliveryAddress(e.target.value)}
      />
      <button onClick={handleSubmit}>Submit</button>
      <button onClick={onClose}>Cancel</button>
    </div>
  );
};

export default PaymentModal;
