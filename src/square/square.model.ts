import { Money } from 'square/src/models/money';

export class CustomerDto {
  id?: string;
  firstName: string;
  lastName: string;
  address: BillingAddress;
}

export class BillingAddress {
  addressLine1: string;
  locality: string; // city
  sublocality3: string;  // state
  postalCode: string;
}

export class ProcessPaymentDto {
  customerId: string;
  sourceId: string;
  idempotencyKey?: string;
  amountMoney: Money;
  billingAddress: BillingAddress;
  referenceId: string; // order number
}

export class PaymentFormDto {
  firstName: string;
  lastName: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  orderNumber: string;
  amount: bigint;
  token: string;
}