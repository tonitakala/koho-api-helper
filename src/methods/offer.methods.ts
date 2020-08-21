import { KohoApiHelper } from '../index';
import { Methods } from '../methods';
import { Offer } from '../resources/offer.resource';
import { OfferProperties } from '../property-definitions';

export class OfferMethods extends Methods {
  constructor (helper: KohoApiHelper) {
    super(helper, 'offers', Offer);
  }

  async getAll(params: object = {}) : Promise<Offer[]> {
    return await super.getAll(params);
  }

  async getById(id: number) : Promise<Offer> {
    return await super.getById(id);
  }

  async getOfferPdfById(id: number) : Promise<Buffer> {
    return await this.requestBuffer(`${this._uri}/${id}/pdf`);
  }

  async updateById(id: number, properties: OfferProperties) : Promise<void> {
    return await super.updateById(id, properties);
  }

  async deleteById(id: number) : Promise<void> {
    return await super.deleteById(id);
  }

  async create(properties: OfferProperties) : Promise<Offer> {
    return await super.create(properties);
  }
}