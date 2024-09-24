import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { PaymentInterface } from '../../application/ports/payment.interface';
import { CustomerInfoDTO } from 'src/application/ports/dtos/customer-info.dto';
import { WompiResponseDTO } from 'src/application/ports/dtos/wompi-response.dto';
import * as crypto from 'crypto';

export class PaymentRepositoryAdapter implements PaymentInterface {
  private readonly WOMPI_API_URL = process.env.WOMPI_API_URL;
  private readonly WOMPI_PUBLIC_KEY = process.env.WOMPI_PUBLIC_KEY;
  private readonly WOMPI_PRIVATE_KEY = process.env.WOMPI_PRIVATE_KEY;
  private readonly WOMPI_INTEGRITY_KEY = process.env.WOMPI_INTEGRITY_KEY;

  async getPayment(paymentId: string): Promise<any | null> {
    const url = `${this.WOMPI_API_URL}transactions/${paymentId}`;
    try {
      const response = await axios.get(url,{
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.WOMPI_PUBLIC_KEY}`,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch acceptance token: ' + error.message);
    }
  }

  async checkInfo(customerInfo: CustomerInfoDTO): Promise<WompiResponseDTO> {
    try {
      const cardToken = await this.tokenizeCard(customerInfo);

      return cardToken;
    } catch (error) {
      console.error('Error checking info:', error);
      throw new Error('Check info failed');
    }
  }

  async requestPayment(customerInfo: CustomerInfoDTO): Promise<WompiResponseDTO | any> {
    try {
      const acceptanceToken = await this.getAcceptanceToken();
      const reference = uuidv4();
      const amount_in_cents = this.convertToCents(customerInfo.amount);
      const signature = this.generateSignature(reference,amount_in_cents);
      const paymentData = {
        amount_in_cents,
        currency:  'COP',
        customer_email: 'customer@test.com', // Puedes cambiar esto por el email real del cliente
        payment_method: {
          type: 'CARD',
          installments: 1,
          token: customerInfo.card_token
        },
        reference,
        acceptance_token: acceptanceToken,
        signature: signature,
        customer_data: {
          full_name: customerInfo.card_holder
        }
      };

      const response = await axios.post(`${this.WOMPI_API_URL}transactions`,paymentData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.WOMPI_PRIVATE_KEY}`,
        },
      });

      return this.parseWompiResponse(response.data);
    } catch (error) {
      if(error.response.status === 422){
      return { error: error.response.data.error.messages };
      }
      throw new Error('Payment failed');
    }
  }

  private async getAcceptanceToken(): Promise<string> {
    const url = `${this.WOMPI_API_URL}merchants/${this.WOMPI_PUBLIC_KEY}`;
    try {
      const response = await axios.get(url);
      const acceptanceToken = response.data.data.presigned_acceptance.acceptance_token;
      return acceptanceToken;
    } catch (error) {
      throw new Error('Failed to fetch acceptance token: ' + error.message);
    }
  }

  private generateSignature(
    reference: string,
    amount_in_cents: number,
    currency: string = 'COP',
  ): string {
    const dataToSign = `${reference}${amount_in_cents}${currency}${this.WOMPI_INTEGRITY_KEY}`;
    const hash = crypto.createHash('sha256').update(dataToSign).digest('hex');
    return hash;
  }

  private async tokenizeCard(customerInfo: CustomerInfoDTO): Promise<any> {
    const response = await axios.post(`${this.WOMPI_API_URL}tokens/cards`, {
      number: customerInfo.number,
      cvc: customerInfo.cvc,
      exp_month: customerInfo.exp_month,
      exp_year: customerInfo.exp_year,
      card_holder: customerInfo.card_holder,
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.WOMPI_PUBLIC_KEY}`,
      },
    });
    return response.data.data;
  }

  private convertToCents(amount: number): number {
    return Math.round(amount * 100);
  }

  private parseWompiResponse(responseData: any): WompiResponseDTO {
    return {
      status: responseData.status,
      transactionId: responseData.data.id,
      amount: responseData.data.amount_in_cents / 100, // Convertir de centavos a pesos
      currency: responseData.data.currency,
      paymentMethodType: responseData.data.payment_method.type,
      createdAt: responseData.data.created_at,
      updatedAt: responseData.data.updated_at,
    };
  }
}
