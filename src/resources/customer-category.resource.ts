import { KohoApiHelper } from '../index';
import { CustomerCategoryProperties } from "../property-definitions";
import { Resource } from '../resource';

export class CustomerCategory extends Resource {

  constructor (properties: CustomerCategoryProperties, helper: KohoApiHelper) {
    super(properties, helper, 'customers/categories');
  }
}