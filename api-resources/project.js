/**
 * Project properties
 * @typedef {Object} ProjectProperties
 * @property {number} id Project ID
 * @property {string} name Project name
 * @property {string} [start_date] Start date (YYYY-MM-DD)
 * @property {string} [end_date] End date (YYYY-MM-DD)
 * @property {string} [customer_id] Customer ID
 * @property {boolean} [active] Status
 * @property {string} [description] Project description
 * @property {any} [_] Other properties. Please consult Koho customer service
 */

/**
 * Project instance
 * @constructor
 * @param {ProjectProperties} properties Any project properties to instantiate Class with
 * @param {KohoApiHelper} helper KohoApiHelper instance
 */

const Project = function(properties, helper) {
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
   * Update project
   * @name update
   * @function
   * @memberof Project#
   * @param {ProjectProperties} updatedProperties Updated properties
   * @returns {Promise|void}
   */

  this.update = async (updatedProperties) => {
    this.properties = { ...properties, ...updatedProperties };

    return await helper.projects.update(this.properties);
  }

  /**
   * Archive project
   * @name archive
   * @function
   * @memberof Project#
   * @returns {Promise|void}
   */

  this.archive = async () => {
    this.properties.active = false;

    return await helper.projects.update(this.properties);
  }

  /**
   * Activate project
   * @name activate
   * @function
   * @memberof Project#
   * @returns {Promise|void}
   */

  this.activate = async () => {
    this.properties.active = true;

    return await helper.projects.update(this.properties);
  }

  return new Proxy(this, {
    get : function (instance, name) {
      return Object.hasOwnProperty.call(instance.properties, name) ? instance.properties[name] : instance[name];
    }
  });
}

module.exports = Project;