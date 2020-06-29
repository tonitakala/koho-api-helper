import { KohoApiHelper } from '../index';
import { Methods } from '../methods';
import { Sale } from '../resources/sale.resource';
import { SaleProperties } from '../property-definitions';

export class SaleMethods extends Methods {
  constructor (helper: KohoApiHelper) {
    super(helper, 'sales', Sale);
  }

  _validateProperties(properties: SaleProperties) {
    if (!properties.products_attributes) {
      throw new Error('Missing products for sale');
    }
  }

  async getAll(params: object = {}) : Promise<Sale[]> {
    return await super.getAll(params);
  }

  async getById(id: number) : Promise<Sale> {
    return await super.getById(id);
  }

  async updateById(id: number, properties: SaleProperties) : Promise<void> {
    return await super.updateById(id, properties);
  }

  async deleteById(id: number) : Promise<void> {
    return await super.deleteById(id);
  }

  async create(properties: SaleProperties, customerId: number) {
    if (customerId) {
      properties.customer_id = customerId;
    }

    properties.products_attributes = properties.products;
    delete properties.products;

    return await super.create(properties);
  }
}