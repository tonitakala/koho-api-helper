import { KohoApiHelper } from '../index';
import { Resource } from '../resource';

export class CustomerGroup extends Resource {
  id?: number;
  name!: string;
  description?: string;
  customer_ids?: number[];
  custom_parameters?: any;


  constructor (properties: CustomerGroup, helper: KohoApiHelper) {
    super(properties, helper, 'customers/groups');
  }
}