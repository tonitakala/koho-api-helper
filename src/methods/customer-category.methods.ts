import { KohoApiHelper } from '../index';
import { Methods } from '../methods';
import { CustomerCategory } from '../resources/customer-category.resource';

export class CustomerCategoryMethods extends Methods {
  constructor (helper: KohoApiHelper) {
    super(helper, 'customers/categories', CustomerCategory);
  }

  async getAll(params: object = {}) : Promise<CustomerCategory[]> {
    return await super.getAll(params);
  }

}