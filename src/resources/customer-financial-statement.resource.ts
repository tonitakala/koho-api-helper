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

  async update(properties: Partial<CustomerFinancialStatementProperties>) : Promise<void> {
    if (!properties.id || !properties.customer_id) {
      throw new Error('Financial statement update requires id and customer_id properties');
    }

    return await super.update(properties);
  }

  // Päivitys PUT /customers/id/financial_statements, mutta mukaan parametrinä financial_statement_id, jota päivitetään.
  // Update parameters ALWAYS require customer_id for url along with financial_statement_id (converted from id)
  // There is no logic in this whatsoever
  _updateInterceptor(properties: any) {
    properties.financial_statement_id = this.id;
    properties.customer_id = this.customer_id;
  }
}