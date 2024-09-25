export interface Product {
    id: string;
    image: string;
    name: string;
    description: string;
    price: number;
    stock: number;
  }
  
export interface Transaction {
    id: string;
    product: Product;
    status: 'SUCCESS' | 'FAILED';
    amount: number;
    baseFee: number;
    deliveryFee: number;
  }
  
export interface PaymentInfo {
    cardNumber: string;
    expirationDate: string;
    cvv: string;
    deliveryAddress: string;
  }
  