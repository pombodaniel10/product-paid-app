import React from 'react';
import '../styles/TransactionResult.css';

interface TransactionResultProps {
  status: 'SUCCESS' | 'FAILED';
  onReturn: () => void;
}

const TransactionResult: React.FC<TransactionResultProps> = ({ status, onReturn }) => {
  return (
    <div className="container transaction-container">
      {status === 'SUCCESS' ? (
        <p className="transaction-success">Payment Successful!</p>
      ) : (
        <p className="transaction-failed">Payment Failed!</p>
      )}
      <button onClick={onReturn}>Return to Products</button>
    </div>
  );
};

export default TransactionResult;
