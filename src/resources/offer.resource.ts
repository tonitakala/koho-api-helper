import { KohoApiHelper } from '../index';
import { Resource } from '../resource';
import { ContractProductProperties } from './contract.resource';

export class Offer extends Resource {
  id?: number;
  name!: string;
  customer_id?: number;
  original_seller_id?: number;
  template_id?: number;
  description?: string;
  probability?: number;
  one_time_net_total?: string;
  monthly_net_total?: string;
  valid_to?: string; // YYYY-MM-DD
  originated_at?: string; // ISO TIMESTAMP
  outcome?: string;
  resolved_at?: string; // ISO TIMESTAMP
  parameters?: any; // Additional Koho parameters
  custom_parameters?: any;
  products?: ContractProductProperties[];

  constructor (properties: Offer, helper: KohoApiHelper) {
    super(properties, helper, 'offers');
  }

  async update(properties: Partial<Offer>) : Promise<void> {
    return await super.update(properties);
  }

  async getOfferPdf() : Promise<Buffer> {
    return await this._helper()[this._type()].getOfferPdfById(this.id);
  }
}