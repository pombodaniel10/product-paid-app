import { Inject, NotFoundException } from '@nestjs/common';
import { PaymentInterface } from '../ports/payment.interface';

export class GetPayment {
  constructor(
    @Inject('PaymentInterface')
    private readonly paymentRepository: PaymentInterface
  ) {}

  async execute(paymentId: string): Promise<any | null> {
    const product = await this.paymentRepository.getPayment(paymentId);
    if (!product) {
      throw new NotFoundException(`Payment with ID ${paymentId} not found.`);
    }
    return product;
  }
}