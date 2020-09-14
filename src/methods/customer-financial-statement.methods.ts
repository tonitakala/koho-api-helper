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
}