import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { getTransactionStatus } from '../store/slices/payment';
import '../styles/TransactionResult.css';

interface TransactionResultProps {
  status: 'SUCCESS' | 'FAILED' | 'PENDING';
  transactionId: string;
  onReturn: () => void;
}

const TransactionResult: React.FC<TransactionResultProps> = ({ status, transactionId, onReturn }) => {
  const dispatch: AppDispatch = useDispatch();
  const transaction = useSelector((state: RootState) => state.payment.transaction);
  const [transactionStatus, setTransactionStatus] = React.useState<string | null>(null);

  useEffect(() => {
    if (status === 'PENDING') {
      const interval = setInterval(() => {
        dispatch(getTransactionStatus(transactionId));
      }, 2000);

      return () => clearInterval(interval);
    }
  }, [dispatch, status, transactionId]);

  useEffect(() => {
    if (transaction) {
      setTransactionStatus(transaction.status);
    }
  }, [transaction]);
  
  return (
    <div className="container transaction-container">
      {transactionStatus === 'SUCCESS' ? (
      <p className="transaction-success">Payment Successful!</p>
      ) : transactionStatus === 'FAILED' ? (
      <p className="transaction-failed">Payment Failed!</p>
      ) : (
      <p className="transaction-pending">Payment Pending...</p>
      )}
      <button onClick={onReturn}>Return to Products</button>
    </div>
  );
};

export default TransactionResult;
