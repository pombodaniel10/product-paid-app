import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import * as crypto from 'crypto';
import { Injectable } from '@nestjs/common';
import { CustomerInfoDTO } from 'src/application/dtos/customer-info.dto';
import { RequestPayload } from 'src/application/dtos/request-payload';
import { Transaction } from 'src/domain/entities/transaction.entity';
import { WompiResponseDTO } from 'src/application/dtos/wompi-response.dto';
import { TransactionRepository } from '../transaction/transaction.repository';
import { ProductRepository } from '../product/product.repository';
import { Customer } from 'src/domain/entities/customer.entity';
import { CustomerRepository } from '../customer/customer.repository';

@Injectable()
export class PaymentRepository {
  constructor(
    private readonly transactionRepository: TransactionRepository,
    private readonly productRepository: ProductRepository,
    private readonly customerRepository: CustomerRepository,
  ) {}
  private readonly WOMPI_API_URL = process.env.WOMPI_API_URL;
  private readonly WOMPI_PUBLIC_KEY = process.env.WOMPI_PUBLIC_KEY;
  private readonly WOMPI_PRIVATE_KEY = process.env.WOMPI_PRIVATE_KEY;
  private readonly WOMPI_INTEGRITY_KEY = process.env.WOMPI_INTEGRITY_KEY; 
  

  async getPayment(paymentId: string): Promise<any | null> {
    const url = `${this.WOMPI_API_URL}transactions/${paymentId}`;
    try {
      const [transaction] = await this.transactionRepository.getTransaction(paymentId);
      const response = await axios.get(url,{
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.WOMPI_PUBLIC_KEY}`,
        },
      });

      if(transaction.payment_status !== response.data.data.status){
        const _status = response.data.data.status === 'APPROVED' ? 'COMPLETED' : 'DECLINED';
        await this.transactionRepository.updateTransaction(paymentId,{ payment_status: _status });
      }

      const responsePayload = {
        status: response.data.data.status,
        reference: response.data.data.reference,
        transactionId: response.data.data.id,
        amount: response.data.data.amount_in_cents / 100,
        currency: response.data.data.currency,
        paymentMethodType: response.data.data.payment_method.type,
        createdAt: response.data.data.created_at,
        updatedAt: response.data.data.finalized_at,
      };

      return responsePayload;
    } catch (error) {
      throw new Error('Failed to fetch acceptance token: ' + error.message);
    }
  }
  async checkInfo(customerInfo: CustomerInfoDTO): Promise<WompiResponseDTO | any> {
    try {
      const cardToken = await this.tokenizeCard(customerInfo);
      return cardToken;
    } catch (error) {
      console.log('Error checking info:', error);
      if(error.response && error.response.status === 422){
        return { error: error.response.data.error.messages };
      }
      throw new Error('Check info failed');
    }
  }

  async requestPayment(requestPayload: RequestPayload): Promise<WompiResponseDTO | any> {
    try {
      const customer = await this.customerRepository.findById(requestPayload.customerId);
      if(!customer){
        return { error: 'Customer not found' };
      }
      const acceptanceToken = await this.getAcceptanceToken();
      const reference = uuidv4();
      const amount_in_cents = this.convertToCents(requestPayload.amount);
      const signature = this.generateSignature(reference,amount_in_cents);
      const paymentData = {
        amount_in_cents,
        currency:  'COP',
        customer_email: customer.email,
        payment_method: {
          type: 'CARD',
          installments: requestPayload.installments,
          token: requestPayload.token
        },
        reference,
        acceptance_token: acceptanceToken,
        signature: signature,
        customer_data: {
          full_name: customer.first_name + ' ' + customer.last_name,
        }
      };

      const response = await axios.post(`${this.WOMPI_API_URL}transactions`,paymentData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.WOMPI_PRIVATE_KEY}`,
        },
      });

      const _transaction = new Transaction();
      _transaction.product_id = requestPayload.productId;
      _transaction.transaction_id = response.data.data.id;
      _transaction.amount = response.data.data.amount_in_cents / 100;
      _transaction.payment_status = response.data.data.status;
      _transaction.customer_id = requestPayload.customerId;

      const transaction = await this.transactionRepository.saveTransaction(_transaction);

      return transaction;
    } catch (error) { 
      console.error('Error requesting payment:', error);
      if(error.response && error.response.status === 422){
        return { error: error.response.data.error.messages };
      }
      throw new Error('Request payment failed');
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

    let _customer = await this.customerRepository.findByEmail(customerInfo.email);
    if(!_customer){
      const newCustomer = new Customer();
      newCustomer.first_name = customerInfo.card_holder.split(' ')[0];
      newCustomer.last_name = customerInfo.card_holder.split(' ')[1];
      newCustomer.email = customerInfo.email;
      newCustomer.address = customerInfo.address;
      newCustomer.city = customerInfo.city;
      newCustomer.country = customerInfo.country;
      newCustomer.phone_number = customerInfo.phone_number;
      _customer = await this.customerRepository.create(newCustomer);
    }

    const responsePayload = {
      card_token: response.data.data.id,
      card_holder: customerInfo.card_holder,
      customerId: _customer.id,
    };

    return responsePayload;
  }

  private convertToCents(amount: number): number {
    return Math.round(amount * 100);
  }

  private parseWompiResponse(responseData: any): WompiResponseDTO {
    return {
      status: responseData.status,
      transactionId: responseData.data.id,
      amount: responseData.data.amount_in_cents / 100,
      currency: responseData.data.currency,
      paymentMethodType: responseData.data.payment_method.type,
      createdAt: responseData.data.created_at,
      updatedAt: responseData.data.updated_at,
    };
  }
}
