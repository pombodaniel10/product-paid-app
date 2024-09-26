import axios from 'axios';
import { CustomerInfo, PaymentMethod } from '../types';

export const checkInfo = async (customerInfo: CustomerInfo) => {
  try {
    const response = await axios.post('http://localhost:3001/payments/check-info', customerInfo);
    return response.data;
  } catch (error) {
    console.error('Error checking info:', error);
    throw error;
  }
};

export const requestPayment = async (paymentMethod: PaymentMethod) => {
  try {
    const response = await axios.post('http://localhost:3001/payments/request-payment', paymentMethod);
    return response.data;
  } catch (error) {
    console.error('Error requesting payment:', error);
    throw error;
  }
};

export const getTransaction = async (transactionId: string) => {
  try {
    const response = await axios.get(`http://localhost:3001/payments/transaction/${transactionId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching transaction:', error);
    throw error;
  }
}
