import { KohoApiHelper } from '../index';
import { Methods } from '../methods';
import { Invoice } from '../resources/invoice.resource';
import { InvoiceProperties } from '../property-definitions';

export class InvoiceMethods extends Methods {
  constructor (helper: KohoApiHelper) {
    super(helper, 'invoices', Invoice);
  }

  async getAll(params: object = {}) : Promise<Invoice[]> {
    return await super.getAll(params);
  }

  async getById(id: number) : Promise<Invoice> {
    return await super.getById(id);
  }

  async updateById(id: number, properties: InvoiceProperties) : Promise<void> {
    return await super.updateById(id, properties);
  }

  async deleteById(id: number) : Promise<void> {
    return await super.deleteById(id);
  }

  async create(properties: InvoiceProperties) : Promise<Invoice> {
    return await super.create(properties);
  }

  async getByCustomerId(customerId: number) : Promise<Invoice[]> {
    const result = await this.request(this._uri, 'GET', null, { customer_id : customerId });
    const invoices = result.map((r: InvoiceProperties) => new Invoice(r, this._helper()));

    return invoices;
  }

  async getByContractId(contractId: number) : Promise<Invoice[]> {
    throw new Error('Not implemented in Koho API');

    const result = await this.request(this._uri, 'GET', null, { contract_id : contractId });
    const invoices = result.map((r: InvoiceProperties) => new Invoice(r, this._helper()));

    return invoices;
  }
}