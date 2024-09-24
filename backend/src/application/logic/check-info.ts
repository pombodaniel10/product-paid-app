import { Inject } from '@nestjs/common';
import { PaymentInterface } from '../ports/payment.interface';
import { CustomerInfoDTO } from '../ports/dtos/customer-info.dto';
import { WompiResponseDTO } from '../ports/dtos/wompi-response.dto';

export class CheckInfo {
  constructor(
    @Inject('PaymentInterface')
    private readonly paymentRepository: PaymentInterface,
  ) {}

  async execute(customerInfo: CustomerInfoDTO): Promise<WompiResponseDTO | null> {
    return await this.paymentRepository.checkInfo(customerInfo);
  }
}