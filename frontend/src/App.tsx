import React, { useState } from 'react';
import ProductPage from './components/Product';
import PaymentModal from './components/PaymentModal';
import PaymentSummary from './components/PaymentSummary';
import TransactionResult from './components/TransactionResult';
import { Product, PaymentInfo } from './types';

const App: React.FC = () => {
  const [selectedProduct] = useState<Product>({
    id: '2',
    image: 'https://m.media-amazon.com/images/I/71TCyb382zL.jpg',
    name: 'Cool Gadget',
    description: 'This is a cool gadget.',
    price: 100,
    stock: 20,
  });

  const [quantity, setQuantity] = useState<number>(1);
  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo | null>(null);
  const [transactionStatus, setTransactionStatus] = useState<'SUCCESS' | 'FAILED' | null>(null);

  const [isModalOpen, setModalOpen] = useState(false);
  const [isSummaryVisible, setSummaryVisible] = useState(false);

  const handlePayClick = (product: Product, quantity: number) => {
    setQuantity(quantity);
    setModalOpen(true);
  };

  const handlePaymentSubmit = (info: PaymentInfo) => {
    setPaymentInfo(info);
    setSummaryVisible(true);
  };

  const handleConfirmPayment = () => {
    // Simula llamada a backend para procesar pago
    const isSuccess = Math.random() > 0.5;  // Simula un resultado de pago aleatorio
    setTransactionStatus(isSuccess ? 'SUCCESS' : 'FAILED');
  };

  const handleReturnToProductPage = () => {
    setTransactionStatus(null);
    setSummaryVisible(false);
  };

  return (
    <div className="App">
      {transactionStatus ? (
        <TransactionResult status={transactionStatus} onReturn={handleReturnToProductPage} />
      ) : isSummaryVisible && paymentInfo ? (
        <PaymentSummary
          product={selectedProduct}
          quantity={quantity}
          baseFee={5.00}
          deliveryFee={10.00}
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