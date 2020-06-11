import { ProductProperties } from "../property-definitions";
import { KohoApiHelper } from '../index';
import { Resource } from '../resource'; 

export class Product extends Resource {
  constructor (properties: ProductProperties, helper: KohoApiHelper) {
    super(properties, helper, 'products');
  }

  _updateInterceptor(properties: ProductProperties) {

  }

  async archive() : Promise<void> {
    return await super.update({ active : false });
  }

  async activate() : Promise<void> {
    return await super.update({ active : true });
  }

  async update(properties: ProductProperties) : Promise<void> {
    return await super.update(properties);
  }

}