import { KohoApiHelper } from '../index';
import { Methods } from '../methods';
import { CustomerFinancialStatement } from '../resources/customer-financial-statement.resource';

export class CustomerFinancialStatementMethods extends Methods {
  constructor (helper: KohoApiHelper) {
    super(helper, 'customers/financial_statements', CustomerFinancialStatement);
  }

  async getAll(params: object = {}) : Promise<CustomerFinancialStatement[]> {
    return await super.getAll(params);
  }

  async updateById(id: number, properties: Partial<CustomerFinancialStatement>) : Promise<void> {
    if ( ! properties.customer_id) {
      throw new Error('customer_id is required property when updating financial statement');
    }


    return await this.request(`customers/${properties.customer_id}/financial_statements`, 'PUT', {
      financial_statement_id : id,
      financial_statement : properties
    });
  }
}