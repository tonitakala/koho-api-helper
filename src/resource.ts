import { KohoApiHelper } from '.';
import { CustomerProperties, InvoiceProperties, PersonProperties } from './property-definitions';

class Resource {
  [x: string]: any;

  constructor (properties: any, helper: KohoApiHelper, type: string) {
    this._helper = () => helper;
    this._type = () => type;

    if (!properties || typeof properties !== 'object') {
      throw new Error('Incorrect or missing properties in resource initialization');
    }

    if (!helper || typeof helper !== 'object') {
      throw new Error('Incorrect or missing helper in resource initialization');
    }

    if (!type || typeof type !== 'string') {
      throw new Error('Incorrect or missing type in resource initialization');
    }

    if ( ! properties.id) {
      throw new Error('Missing id in property initialization');
    }

    this.setProperties(this, properties);
  }

  // Recursively update properties in object
  setProperties(object: any, properties: any) {
    delete properties._helper;
    delete properties._type;

    for (const property in properties) {
      if (typeof properties[property] === 'object' && properties[property] !== null && !Array.isArray(properties[property])) {
        if (!object[property]) {
          object[property] = {};
        }

        this.setProperties(object[property], properties[property]);
      } else {
        object[property] = properties[property];
      }
    }
  }

  async update(properties: any) {
    this.setProperties(this, properties);

    if (typeof this._updateInterceptor === 'function') {
      this._updateInterceptor(properties);
    }

    return await this._helper()[this._type()].updateById(this.id, properties);
  }

  async delete() {
    return await this._helper()[this._type()].deleteById(this.id);
  }
}

export { Resource };