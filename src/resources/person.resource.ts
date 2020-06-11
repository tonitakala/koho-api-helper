import { PersonProperties } from "../property-definitions";
import { KohoApiHelper } from '../index';
import { Resource } from '../resource'; 

/**
 * @typedef {Object} PersonAccessTokenProperties
 * @property {number} id Access token ID
 * @property {number} customer_id Customer ID
 * @property {number} user_id
 * @property {number} person_id
 * @property {string} email
 * @property {Boolean} is_valid
 * @property {Boolean} admin
 * @property {Object} settings
 * @property {string} created_at
 * @property {string} updated_at
 * @property {any} [_] Other properties. Please consult Koho customer service
 */

/**
 * @constructor
 * @name Person
 * @param {PersonProperties} properties
 * @param {KohoApiHelper} helper
 */

export class Person extends Resource {
  constructor (properties: PersonProperties, helper: KohoApiHelper) {
    super(properties, helper, 'persons');
  }

  _updateInterceptor(properties: PersonProperties) {
    delete properties.customer_access_tokens;
  }

  async archive() : Promise<void> {
    return await super.update({ archived : true });
  }

  async activate() : Promise<void> {
    return await super.update({ archived : false });
  }

  async update(properties: PersonProperties) : Promise<void> {
    return await super.update(properties);
  }
}