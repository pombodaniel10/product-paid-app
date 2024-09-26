import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store/store';
import { checkPaymentInfo } from '../store/slices/payment';
import '../styles/PaymentModal.css';

interface PaymentModalProps {
  isOpen: boolean;
  onSubmit: (paymentInfo: any) => void;
  onClose: () => void;
}

const PaymentModal: React.FC<PaymentModalProps> = ({ isOpen, onSubmit, onClose }) => {
  const dispatch: AppDispatch = useDispatch();
  const [cardHolder, setCardHolder] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const { paymentMethod } = useSelector((state: RootState) => state.payment);


  const handleSubmit = async () => {
    const customerInfo = {
      card_holder: cardHolder,
      number: cardNumber,
      exp_month: expirationDate.split('/')[0],
      exp_year: expirationDate.split('/')[1],
      cvc: cvv,
      address: deliveryAddress,
      country,
      city,
      email,
      phoneNumber,
    };

    try {
      await dispatch(checkPaymentInfo(customerInfo));
      onSubmit(paymentMethod);
      onClose();
    } catch (error) {
      console.error('Error during checkInfo call', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal">
      <h2>Enter Payment Information</h2>
      <input 
        type="text"
        placeholder="Name on Card"
        value={cardHolder}
        onChange={(e) => setCardHolder(e.target.value)}
      />
      <input
        type="text"
        placeholder="Card Number"
        value={cardNumber}
        onChange={(e) => setCardNumber(e.target.value)}
      />
      <input
        type="text"
        placeholder="Expiration Date (MM/YY)"
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
      <input
        type="text"
        placeholder="Country"
        value={country}
        onChange={(e) => setCountry(e.target.value)}
      />
      <input
        type="text"
        placeholder="City"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <input
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="text"
        placeholder="Phone Number"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
      />
      <button onClick={handleSubmit}>Add payment method</button>
    </div>
  );
};

export default PaymentModal;