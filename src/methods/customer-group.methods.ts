import { KohoApiHelper } from '../index';
import { Methods } from '../methods';
import { CustomerGroup } from '../resources/customer-group.resource';

export class CustomerGroupMethods extends Methods {
  constructor (helper: KohoApiHelper) {
    super(helper, 'customers/groups', CustomerGroup);
  }

  async getAll(params: object = {}) : Promise<CustomerGroup[]> {
    return await super.getAll(params);
  }
}