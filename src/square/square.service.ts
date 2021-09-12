import { Injectable } from '@nestjs/common';
import { Client, CreatePaymentRequest, Environment, Location } from "square";
import { ConfigService } from '@nestjs/config';
import { v4 as uuidv4 } from 'uuid';
import { CustomerDto, ProcessPaymentDto } from "./square.model";

@Injectable()
export class SquareService {
  constructor(private configService: ConfigService) {}
  private config = {
    environment: Environment.Sandbox,
    accessToken: this.configService.get<string>('SQUARE_ACCESS_TOKEN'),
    timeout: 3000,
  };
  private squareClient = new Client(this.config);

  public async getLocation(): Promise<Location> {
    console.log(this.config);
    const { locationsApi } = this.squareClient;
    try {
      const listLocationsResponse = await locationsApi.listLocations();
      return listLocationsResponse.result.locations[0];
    } catch (error) {
      console.log('There was an error in your request: ', error);
    }
  }

  public async createCustomer(customer: CustomerDto): Promise<CustomerDto> {
    const { customersApi } = this.squareClient;
    const idempotencyKey = uuidv4();
    const requestBody = {
      idempotencyKey: idempotencyKey.toString(),
      givenName: customer.firstName,
      familyName: customer.lastName,
    };
    try {
      const { result } = await customersApi.createCustomer(requestBody);
      return {
        id: result.customer.id,
        ...customer,
      };
    } catch (error) {
      console.log(error);
    }
  }

  public async processPayment(paymentData: ProcessPaymentDto): Promise<any> {
    const { paymentsApi, locationsApi } = this.squareClient;
    const locationResponse = await locationsApi.retrieveLocation(
      this.configService.get<string>('SQUARE_LOCATION_ID'),
    );
    const currency = locationResponse.result.location.currency;
    const idempotencyKey = uuidv4();
    const requestBody: CreatePaymentRequest = {
      ...paymentData,
      idempotencyKey: idempotencyKey.toString(),
      amountMoney: {
        ...paymentData.amountMoney,
        currency,
      },
    };
    try {
      const {
        result: { payment },
      } = await paymentsApi.createPayment(requestBody);

      return JSON.stringify(
        payment,
        (key, value) => {
          return typeof value === 'bigint' ? parseInt(String(value)) : value;
        },
        4,
      );
    } catch (error) {
      console.log(error);
    }
  }
}
