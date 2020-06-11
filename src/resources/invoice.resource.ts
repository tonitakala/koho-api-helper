import { KohoApiHelper } from '../index';
import { InvoiceProperties } from "../property-definitions";
import { Resource } from '../resource';

export class Invoice extends Resource {
  constructor (properties: InvoiceProperties, helper: KohoApiHelper) {
    super(properties, helper, 'invoices');
  }

  _updateInterceptor(properties: InvoiceProperties) {

  }

  async update(properties: InvoiceProperties) : Promise<void> {
    return await super.update(properties);
  }
}