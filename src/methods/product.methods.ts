import { KohoApiHelper } from '../index';
import { Methods } from '../methods';
import { Product } from '../resources/product.resource';
import { ProductProperties } from '../property-definitions';

export class ProductMethods extends Methods {
  constructor (helper: KohoApiHelper) {
    super(helper, 'product_types', Product);
  }

  _validateProperties(properties: ProductProperties) {

  }

  async getAll(params: object = {}) : Promise<Product[]> {
    return await super.getAll(params);
  }

  async getById(id: number) : Promise<Product> {
    return await super.getById(id);
  }

  async updateById(id: number, properties: ProductProperties) : Promise<void> {
    return await super.updateById(id, properties);
  }

  async deleteById(id: number) : Promise<void> {
    return await super.deleteById(id);
  }

  async create(properties: ProductProperties) : Promise<Product> {
    return await super.create(properties);
  }

}