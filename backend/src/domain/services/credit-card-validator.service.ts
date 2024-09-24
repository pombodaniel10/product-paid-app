export class CreditCardValidator {
    detectCardType(cardNumber: string): string | null {
      const mastercardPattern = /^5[1-5][0-9]{14}$/;
      const visaPattern = /^4[0-9]{12}(?:[0-9]{3})?$/;
  
      if (mastercardPattern.test(cardNumber)) {
        return 'MasterCard';
      } else if (visaPattern.test(cardNumber)) {
        return 'VISA';
      }
      return null;
    }
}  