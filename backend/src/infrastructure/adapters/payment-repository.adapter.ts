import axios from 'axios';
import { PaymentInterface } from '../../application/ports/payment.interface';
import { CustomerInfoDTO } from 'src/application/ports/dtos/customer-info.dto';
import { WompiResponseDTO } from 'src/application/ports/dtos/wompi-response.dto';
import * as crypto from 'crypto';

export class PaymentRepositoryAdapter implements PaymentInterface {
  private readonly WOMPI_API_URL = '';
  private readonly WOMPI_PUBLIC_KEY = '';
  private readonly WOMPI_PRIVATE_KEY = '';
  private readonly WOMPI_INTEGRITY_KEY = '';



  async checkInfo(customerInfo: CustomerInfoDTO): Promise<WompiResponseDTO> {
    try {
      const cardToken = await this.tokenizeCard(customerInfo);

      return cardToken;
    } catch (error) {
      console.error('Error checking info:', error);
      throw new Error('Check info failed');
    }
  }

  async requestPayment(customerInfo: CustomerInfoDTO): Promise<WompiResponseDTO> {
    try {
      const acceptanceToken = await this.getAcceptanceToken();
      const signature = this.generateSignature('12121212',200000);
      const response = await axios.post(`${this.WOMPI_API_URL}transactions`, {
        acceptance_token: acceptanceToken,
        amount_in_cents: "300000",
        signature,
        customerEmail: 'sdsdsd@.com',
        paymentMethod: {
          type: 'CARD',
          token: customerInfo.card_token,
          installments: 1
        },
        currency: 'COP',
        redirect_url: null,
        reference: 'askasn123813n',
        customer_data: {
          full_name: 'Maximo'
        },
        shipping_address: {
          address_line_1: 'cerquita a la casa',
          country: 'colombia',
          region: 'bol',
          city: 'cartagena',
          phone_number: '573001234567'
        }
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.WOMPI_PUBLIC_KEY}`,
        },
      });

      return this.parseWompiResponse(response.data);
    } catch (error) {
      console.error('Error requesting payment:', error);
      throw new Error('Payment failed');
    }
  }

  private async getAcceptanceToken(): Promise<string> {
    const url = `${this.WOMPI_API_URL}merchants/pub_stagtest_g2u0HQd3ZMh05hsSgTS2lUV8t3s4mOt7`;
    try {
      const response = await axios.get(url);
      const acceptanceToken = response.data.data.presigned_acceptance.acceptance_token;
      return acceptanceToken;
    } catch (error) {
      throw new Error('Failed to fetch acceptance token: ' + error.message);
    }
  }

  private generateSignature(
    transactionId: string,
    amountInCents: number,
    currency: string = 'COP',
  ): string {
    const dataToSign = `${transactionId}${amountInCents}${currency}${this.WOMPI_INTEGRITY_KEY}`;
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
