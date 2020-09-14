import { KohoApiHelper } from '../index';
import { Resource } from '../resource';

export interface CustomerFinancialStatementProperties {
  id?: number;
  customer_id: string;
  date: string;
  revenue?: number;
  profit?: number;
  balance?: number;
  personnel?: number;
  description?: string;
  created_at?: string;
  updated_at?: string;

  [propName: string]: any;
}

export class CustomerFinancialStatement extends Resource {
  constructor (properties: CustomerFinancialStatementProperties, helper: KohoApiHelper) {
    super(properties, helper, 'customers/financial_statements');
  }
}