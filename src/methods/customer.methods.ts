import { KohoApiHelper } from '../index';
import { Methods } from '../methods';
import { Customer } from '../resources/customer.resource';
import { CustomerProperties } from '../property-definitions';

export class CustomerMethods extends Methods {
  constructor (helper: KohoApiHelper) {
    super(helper, 'customers', Customer);
  }

  async getAll(params: object = {}) : Promise<Customer[]> {
    return await super.getAll(params);
  }

  async getById(id: number) : Promise<Customer> {
    return await super.getById(id);
  }

  async updateById(id: number, properties: CustomerProperties) : Promise<void> {
    return await super.updateById(id, properties);
  }

  async deleteById(id: number) : Promise<void> {
    return await super.deleteById(id);
  }

  async create(properties: CustomerProperties) : Promise<Customer> {
    return await super.create(properties);
  }

   async getByName(name: string) : Promise<Customer[]> {
    const result = await super.request(this._uri, 'GET', null, { name });
    const resources = result.data.map((r: CustomerProperties) => new Customer(r, this._helper));

    return resources;
   }

  async getByNumber(number: string) : Promise<Customer[]> {
    const result = await this.request(this._uri, 'GET', null, { number });
    const resources = result.data.map((r: CustomerProperties) => new Customer(r, this._helper));

    return resources;
   }

  async getByCode(code: string) : Promise<Customer[]> {
    const result = await this.request(this._uri, 'GET', null, { code });
    const resources = result.data ? result.data.map((r: CustomerProperties) => new Customer(r, this._helper)) : [];

    return resources;
  }

  async getByOrganizationId(organization_id: string) : Promise<Customer[]> {
    const result = await this.request(this._uri, 'GET', null, { organization_id });
    const resources = result.data ? result.data.map((r: CustomerProperties) => new Customer(r, this._helper)) : [];

    return resources;
  }
}