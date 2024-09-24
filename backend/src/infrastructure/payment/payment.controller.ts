import { Body, Controller, Post } from '@nestjs/common';
import { CheckInfo } from 'src/application/logic/check-info';
import { RequestPayment } from 'src/application/logic/request-transaction';
import { CustomerInfoDTO } from 'src/application/ports/dtos/customer-info.dto';
import { WompiResponseDTO } from 'src/application/ports/dtos/wompi-response.dto';

@Controller('payments')
export class Payment {
  constructor(
    private readonly checkInfoUseCase: CheckInfo,
    private readonly requestPaymentUseCase: RequestPayment,
  ) {}

  @Post('check-info')
  async checkInfo(@Body() customerInfo: CustomerInfoDTO): Promise<WompiResponseDTO> {
    return this.checkInfoUseCase.execute(customerInfo);
  }

  @Post('request-payment')
  async requestPayment(@Body() customerInfo: CustomerInfoDTO): Promise<WompiResponseDTO> {
    return this.requestPaymentUseCase.execute(customerInfo);
  }
}
