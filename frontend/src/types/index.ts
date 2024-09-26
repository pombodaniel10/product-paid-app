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
    transaction_id: string;
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
    card_token: string;
    customerId: number;
}
  