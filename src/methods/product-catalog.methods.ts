import { KohoApiHelper } from '../index';
import { Methods } from '../methods';
import { ProductCatalog } from '../resources/product-catalog.resource';

export class ProductCatalogMethods extends Methods {
  constructor (helper: KohoApiHelper) {
    super(helper, 'product_type//catalogs', ProductCatalog);
  }

  async getAll(params: object = {}) : Promise<ProductCatalog[]> {
    return await super.getAll(params);
  }

  async getById(resourceId: number) : Promise<ProductCatalog> {
    return await super.getById(resourceId);
  }

  async updateById(resourceId: number, properties: Partial<ProductCatalog>) : Promise<void> {
    return await super.updateById(resourceId, properties)
  }
}