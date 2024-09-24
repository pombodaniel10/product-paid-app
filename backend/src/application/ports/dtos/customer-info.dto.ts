export class CustomerInfoDTO {
    number: string;
    cvc: string;
    exp_month: string;
    exp_year: string;
    card_holder: string;
    email: string;
    address: string;
    city: string;
    postalCode: string;
    amount: number;
    transactionReference: string;
    card_token?: string; // Este se llenará tras tokenizar la tarjeta
  }
