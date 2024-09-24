import { CustomerInfoDTO } from './dtos/customer-info.dto';
import { WompiResponseDTO } from './dtos/wompi-response.dto';

export interface PaymentInterface {
  checkInfo(customerInfo: CustomerInfoDTO): Promise<WompiResponseDTO | null>;
  requestPayment(customerInfo: CustomerInfoDTO): Promise<WompiResponseDTO>;
  getPayment(paymentId: string): Promise<any | null>;
}