/**
 * @typedef {Object} PersonProperties
 * @property {number} id Person ID
 * @property {number} customer_id Customer ID
 * @property {string} [first_name]
 * @property {string} [last_name]
 * @property {string} [description]
 * @property {string} [email]
 * @property {string} [phone]
 * @property {string} [role] Titteli
 * @property {string} [position] Rooli
 * @property {Boolean} [archived]
 * @property {PersonAccessTokenProperties[]} customer_access_tokens Customer Portal access tokens
 * @property {any} [_] Other properties. Please consult Koho customer service
 */

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
 * Person instance
 * @constructor
 * @param {PersonProperties} properties
 * @param {KohoApiHelper} helper
 */

const Person = function(properties, helper) {
  this.properties = properties;

  if (typeof properties !== 'object' || properties === null) {
    throw 'Incorrect properties in resource initialization';
  }

  if (typeof helper !== 'object' || helper === null) {
    throw 'Incorrect helper in resource initialization';
  }

  if ( ! properties.id) {
    throw 'Cannot instantiate without person id';
  }

  /**
   * @name update
   * @function
   * @memberof Person#
   * @param {PersonProperties} updatedProperties Updated properties
   * @returns {Promise|void}
   */

  this.update = async (updatedProperties) => {
    this.properties = { ...properties, ...updatedProperties };

    return await helper.persons.update(this.properties);
  }

  /**
   * Archive person
   * @name archive
   * @function
   * @memberof Person#
   * @returns {Promise|void}
   */

  this.archive = async () => {
    this.properties.archived = true;

    return await helper.persons.update(this.properties);
  }

  /**
   * Activate person
   * @name activate
   * @function
   * @memberof Person#
   * @returns {Promise|void}
   */

  this.activate = async () => {
    this.properties.archived = false;

    return await helper.persons.update(this.properties);
  }

  return new Proxy(this, {
    get : function (instance, name) {
      return Object.hasOwnProperty.call(instance.properties, name) ? instance.properties[name] : instance[name];
    }
  });
}

module.exports = Person;