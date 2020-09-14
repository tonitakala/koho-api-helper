import { KohoApiHelper } from '../index';
import { Resource } from '../resource';

export interface CustomerGroupProperties {
  id?: number;
  name: string;
  description?: string;
  customer_ids?: number[];
  custom_parameters?: any;

  [propName: string]: any;
}

export class CustomerGroup extends Resource {
  constructor (properties: CustomerGroupProperties, helper: KohoApiHelper) {
    super(properties, helper, 'customers/groups');
  }
}