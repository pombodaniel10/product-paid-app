import React, { useState } from 'react';
import ProductPage from './components/Product';
import PaymentModal from './components/PaymentModal';
import { useSelector } from 'react-redux';
import { RootState } from './store/store';
import PaymentSummary from './components/PaymentSummary';
import TransactionResult from './components/TransactionResult';
import { Product } from './types';

const App: React.FC = () => {
  const [selectedProduct] = useState<Product>({
    id: 2,
    image: 'https://m.media-amazon.com/images/I/71TCyb382zL.jpg',
    name: 'Cool Gadget',
    description: 'This is a cool gadget.',
    price: 100000,
    stock: 20,
  });

  const [quantity, setQuantity] = useState<number>(1);
  const [transactionStatus, setTransactionStatus] = useState<'SUCCESS' | 'FAILED' | 'PENDING' | null>(null);
  const [transactionId, setTransactionId] = useState<string | null>(null);
  const { paymentMethod, transaction } = useSelector((state: RootState) => state.payment);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isSummaryVisible, setSummaryVisible] = useState(false);

  const handlePayClick = (quantity: number) => {
    setQuantity(quantity);
    setModalOpen(true);
  };

  const handlePaymentSubmit = () => {
    setSummaryVisible(true);
  };

  const handleConfirmPayment = () => {
      if (transaction) {
        setTransactionId(transaction.transaction_id);
      }
      setTransactionStatus('PENDING');
  };

  const handleReturnToProductPage = () => {
    setTransactionStatus(null);
    setSummaryVisible(false);
  };

  return (
    <div className="App">
      {transactionStatus && transaction && transactionId ? (
        <TransactionResult transactionId={transactionId} status={transactionStatus} onReturn={handleReturnToProductPage} />
      ) : isSummaryVisible ? (
        <PaymentSummary
          product={selectedProduct}
          quantity={quantity}
          baseFee={selectedProduct.price * 0.19}
          deliveryFee={10000.00}
          paymentMethod={paymentMethod}
          onConfirmPayment={handleConfirmPayment}
        />
      ) : (
        <ProductPage productId={selectedProduct.id} onPayClick={handlePayClick} />
      )}

      <PaymentModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handlePaymentSubmit}
      />
    </div>
  );
};

export default App;