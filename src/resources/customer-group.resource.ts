import { KohoApiHelper } from '../index';
import { CustomerGroupProperties } from "../property-definitions";
import { Resource } from '../resource';

export class CustomerGroup extends Resource {

  constructor (properties: CustomerGroupProperties, helper: KohoApiHelper) {
    super(properties, helper, 'customers/groups');
  }
}