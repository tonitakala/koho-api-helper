import { KohoApiHelper } from '../index';
import { Resource } from '../resource';

export interface CustomerCategoryProperties {
  id?: number;
  name: string;
  description?: string;
  customer_ids?: number[];

  [propName: string]: any;
}

export class CustomerCategory extends Resource {
  constructor (properties: CustomerCategoryProperties, helper: KohoApiHelper) {
    super(properties, helper, 'customers/categories');
  }
}