import { KohoApiHelper } from '.';
import { CustomerProperties, InvoiceProperties, PersonProperties } from './property-definitions';

const Resource : any = (function() {
  let _helper: any;
  let _type: string;

  class R {
    [x: string]: any;

    constructor (properties: CustomerProperties | InvoiceProperties | PersonProperties, helper: KohoApiHelper, type: string) {
      _helper = helper;
      _type = type;

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

    get _helper() {
      return _helper;
    }

    // Recursively update properties in object
    setProperties(object: any, properties: any) {
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

      return await _helper[_type].updateById(this.id, properties);
    }

    async delete() {
      return await _helper[_type].deleteById(this.id);
    }
  }

  return R;
})();

export { Resource };