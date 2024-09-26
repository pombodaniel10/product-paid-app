export interface Product {
    id: number;
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
  
export interface CustomerInfo {
    number: string;
    exp_month: string;
    exp_year: string;
    cvc: string;
    card_holder: string;
    deliveryAddress: string;
  }

export interface PaymentMethod {
    card_holder: string;
    token: string;
    amount: number;
}
  