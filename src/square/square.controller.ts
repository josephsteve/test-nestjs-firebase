import { Body, Controller, Get, Post } from '@nestjs/common';
import { SquareService } from './square.service';
import { CustomerDto } from './square.model';

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
}
