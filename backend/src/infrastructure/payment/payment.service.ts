import { Injectable } from '@nestjs/common';
import { PaymentRepository } from './payment.repository';

@Injectable()
export class PaymentService {
    constructor(
        private readonly paymentRepository: PaymentRepository,
    ) {}
    
    async getPayment(paymentId: string): Promise<any | null> {
        return this.paymentRepository.getPayment(paymentId);
    }
    
    async requestPayment(paymentInfo: any): Promise<any> {
        return this.paymentRepository.requestPayment(paymentInfo);
    }

    async checkInfo(paymentInfo: any): Promise<any> {
        return this.paymentRepository.checkInfo(paymentInfo);
    }
 
}