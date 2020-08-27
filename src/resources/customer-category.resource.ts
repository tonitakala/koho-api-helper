import { KohoApiHelper } from '../index';
import { Resource } from '../resource';

export class CustomerCategory extends Resource {
  id?: number;
  name!: string;
  description?: string;
  customer_ids?: number[];

  constructor (properties: CustomerCategory, helper: KohoApiHelper) {
    super(properties, helper, 'customers/categories');
  }
}