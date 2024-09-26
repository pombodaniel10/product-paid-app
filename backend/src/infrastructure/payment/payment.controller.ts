import { Body, Param, Controller, Get, Post } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CustomerInfoDTO } from 'src/application/dtos/customer-info.dto';
import { WompiResponseDTO } from 'src/application/dtos/wompi-response.dto';

@Controller('payments')
export class PaymentController {
  constructor(
    private readonly paymentService: PaymentService,
  ) {}

  @Post('check-info')
  async checkInfo(@Body() customerInfo: CustomerInfoDTO): Promise<any> {
    return await this.paymentService.checkInfo(customerInfo);
  }

  @Post('request-payment')
  async requestPayment(@Body() customerInfo: CustomerInfoDTO): Promise<WompiResponseDTO> {
    return this.paymentService.requestPayment(customerInfo);
  }

  @Get(':id')
  async getTransaction(@Param('id') id: string): Promise<any | null> {
    return this.paymentService.getPayment(id);
  }
}
