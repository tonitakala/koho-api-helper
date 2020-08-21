import { KohoApiHelper } from '../index';
import { OfferProperties } from "../property-definitions";
import { Resource } from '../resource';

/**
 * @constructor
 * @name Offer
 * @param {OfferProperties} properties
 * @param {KohoApiHelper} helper
 */

export class Offer extends Resource {
  constructor (properties: OfferProperties, helper: KohoApiHelper) {
    super(properties, helper, 'offers');
  }

  _updateInterceptor(properties: OfferProperties) {

  }

  async update(properties: OfferProperties) : Promise<void> {
    return await super.update(properties);
  }

  async getOfferPdf() : Promise<Buffer> {
    return await this._helper[this._type].getOfferPdfById(this.id);
  }
}