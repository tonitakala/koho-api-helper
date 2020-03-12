/**
 * Product properties
 * @typedef {Object} ProductProperties
 * @property {number} id Product ID
 * @property {string} name Product name
 * @property {string} [description] Product description
 * @property {number} price Price
 * @property {number} [gross_price] Gross price
 * @property {number} vat VAT percent
 * @property {number} [cost] Cost
 * @property {string} [code] Product code
 * @property {boolean} monthly Is product contract product
 * @property {number} [product_category_id] Product category ID
 * @property {string} unit_of_measurement Number of measurement (default: pc)
 * @property {Object} [translation_hash] Translation hash
 * @property {object} [translation_hash.LANG] LANG (SE or EN) language translations (includes name and description)
 * @property {any} [_] Other properties. Please consult Koho customer service
 */

/**
 * Product instance
 * @constructor
 * @param {ProductProperties} properties Any properties to instantiate Class with
 * @param {KohoApiHelper} helper KohoApiHelper instance
 */

const Product = function(properties, helper) {
  this.properties = properties;

  if (typeof properties !== 'object' || properties === null) {
    throw 'Incorrect properties in resource initialization';
  }

  if (typeof helper !== 'object' || helper === null) {
    throw 'Incorrect helper in resource initialization';
  }

  if ( ! properties.id) {
    throw 'Cannot instantiate without project id';
  }

  /**
   * Update
   * @name update
   * @function
   * @memberof Product#
   * @param {ProductProperties} updatedProperties Updated properties
   * @returns {Promise|void}
   */

  this.update = async (updatedProperties) => {
    this.properties = { ...properties, ...updatedProperties };

    return await helper.products.update(this.properties);
  }

  /**
   * Archive
   * @name archive
   * @function
   * @memberof Product#
   * @returns {Promise|void}
   */

  this.archive = async () => {
    this.properties.active = false;

    return await helper.products.update(this.properties);
  }

  /**
   * Activate
   * @name activate
   * @function
   * @memberof Product#
   * @returns {Promise|void}
   */

  this.activate = async () => {
    this.properties.active = true;

    return await helper.products.update(this.properties);
  }

  return new Proxy(this, {
    get : function (instance, name) {
      return Object.hasOwnProperty.call(instance.properties, name) ? instance.properties[name] : instance[name];
    }
  });
}

module.exports = Product;