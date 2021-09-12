import { Body, Controller, Get, Post } from '@nestjs/common';
import { SquareService } from './square.service';
import { CustomerDto, PaymentFormDto } from './square.model';

@Controller('square')
export class SquareController {
  constructor(private squareService: SquareService) {}

  @Get('location')
  async getLocation(): Promise<any> {
    return await this.squareService.getLocation();
  }

  @Post('customer')
  async createCustomer(@Body() customer: CustomerDto): Promise<any> {
    return await this.squareService.createCustomer(customer);
  }

  @Post('paynow')
  async payNow(@Body() paymentForm: PaymentFormDto): Promise<any> {
    const custResp = await this.squareService.createCustomer({
      firstName: paymentForm.firstName,
      lastName: paymentForm.lastName,
    });
    return await this.squareService.processPayment({
      customerId: custResp.id,
      sourceId: paymentForm.token,
      amountMoney: {
        amount: paymentForm.amount,
      },
      referenceId: paymentForm.orderNumber,
      billingAddress: {
        addressLine1: paymentForm.street,
        locality: paymentForm.city,
        sublocality3: paymentForm.state,
        postalCode: paymentForm.zip,
      },
    });
  }
}
