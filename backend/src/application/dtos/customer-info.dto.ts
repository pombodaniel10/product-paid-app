export class CustomerInfoDTO {
    number: string;
    cvc: string;
    exp_month: string;
    exp_year: string;
    card_holder: string;
    email: string;
    phone_number: string;
    address: string;
    city: string;
    country: string;
    card_token?: string; 
    customerId?: number;
    productId?: number;
  }
