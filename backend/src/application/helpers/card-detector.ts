// src/application/helpers/card-detector.ts
export type CardType = 'Visa' | 'MasterCard' | 'Amex' | null;

export function detectCardType(cardNumber: string): CardType {
  const visaRegex = /^4[0-9]{12}(?:[0-9]{3})?$/;
  const masterCardRegex = /^5[1-5][0-9]{14}$/;
  const amexRegex = /^3[47][0-9]{13}$/;

  if (visaRegex.test(cardNumber)) {
    return 'Visa';
  } else if (masterCardRegex.test(cardNumber)) {
    return 'MasterCard';
  } else if (amexRegex.test(cardNumber)) {
    return 'Amex';
  }

  return null;
}
