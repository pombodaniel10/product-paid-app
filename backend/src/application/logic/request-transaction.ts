import { Inject } from '@nestjs/common';
import { PaymentInterface } from '../ports/payment.interface';
import { CustomerInfoDTO } from '../ports/dtos/customer-info.dto';
import { WompiResponseDTO } from '../ports/dtos/wompi-response.dto';

export class RequestPayment {
  constructor(
    @Inject('PaymentInterface')
    private readonly paymentRepository: PaymentInterface) {}

  async execute(customerInfo: CustomerInfoDTO): Promise<WompiResponseDTO> {
    return this.paymentRepository.requestPayment(customerInfo);
  }
}
