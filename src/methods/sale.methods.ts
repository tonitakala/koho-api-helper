import { KohoApiHelper } from '../index';
import { Methods } from '../methods';
import { Sale } from '../resources/sale.resource';

export class SaleMethods extends Methods {
  constructor (helper: KohoApiHelper) {
    super(helper, 'sales', Sale);
  }

  _validateProperties(properties: Partial<Sale>) : void {
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

  async updateById(id: number, properties: Partial<Sale>) : Promise<void> {
    return await super.updateById(id, properties);
  }

  async deleteById(id: number) : Promise<void> {
    return await super.deleteById(id);
  }

  async create(properties: Sale, customerId: number) : Promise<Sale> {
    if (customerId) {
      properties.customer_id = customerId;
    }

    properties.products_attributes = properties.products;
    delete properties.products;

    return await super.create(properties);
  }
}