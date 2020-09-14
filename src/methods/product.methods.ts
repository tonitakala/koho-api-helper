import { KohoApiHelper } from '../index';
import { Methods } from '../methods';
import { Product, ProductProperties } from '../resources/product.resource';

export class ProductMethods extends Methods {
  constructor (helper: KohoApiHelper) {
    super(helper, 'product_types', Product);
  }

  async getAll(params: object = {}) : Promise<Product[]> {
    return await super.getAll(params);
  }

  async getById(id: number) : Promise<Product> {
    return await super.getById(id);
  }

  async updateById(id: number, properties: Partial<ProductProperties>) : Promise<void> {
    return await super.updateById(id, properties);
  }

  async deleteById(id: number) : Promise<void> {
    return await super.deleteById(id);
  }

  async create(properties: ProductProperties) : Promise<Product> {
    return await super.create(properties);
  }

}