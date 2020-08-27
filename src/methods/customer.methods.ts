import { KohoApiHelper } from '../index';
import { Methods } from '../methods';
import { Customer } from '../resources/customer.resource';

const FormData = require('form-data');

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

  async updateById(id: number, properties: Partial<Customer>) : Promise<void> {
    return await super.updateById(id, properties);
  }

  async deleteById(id: number) : Promise<void> {
    return await super.deleteById(id);
  }

  async create(properties: Customer) : Promise<Customer> {
    return await super.create(properties);
  }

   async getByName(name: string) : Promise<Customer[]> {
    const result = await super.request(this._uri, 'GET', null, { name });
    const resources = result.map((r: Customer) => new Customer(r, this._helper()));

    return resources;
   }

  async getByNumber(number: string) : Promise<Customer[]> {
    const result = await this.request(this._uri, 'GET', null, { number });
    const resources = result.map((r: Customer) => new Customer(r, this._helper()));

    return resources;
   }

  async getByCode(code: string) : Promise<Customer[]> {
    const result = await this.request(this._uri, 'GET', null, { code });
    const resources = result ? result.map((r: Customer) => new Customer(r, this._helper())) : [];

    return resources;
  }

  async getByOrganizationId(organization_id: string) : Promise<Customer[]> {
    const result = await this.request(this._uri, 'GET', null, { organization_id });

    const resources = result ? result.map((r: Customer) => new Customer(r, this._helper())) : [];

    return resources;
  }

  async addNotificationById(id: number, message: string) : Promise<void> {
    return await this._helper().notifications.create(id, message);
  }

  async addFileById(id: number, folderId: number, name: string, fileBuffer: Buffer, fileMetadata: { filename: string; contentType: string }, description?: string) : Promise<void> {
    const form = new FormData();

    form.append('file[folder_id]', folderId.toString());
    form.append('file[name]', name);

    if (description) {
      form.append('file[description]', description);
    }

    form.append('file[data]', fileBuffer, fileMetadata);

    await this.request(`${this._uri}/${id}/attach_file`, 'POST', null, null, {
      body : form
    });
  }
}