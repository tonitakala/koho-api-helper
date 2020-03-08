const axios = require('axios');
const Product = require('../api-resources/product');

module.exports = function(helper) {

  /**
   * Get all
   * @memberof KohoApiHelper#
   * @alias products.getAll
   * @returns {Promise|Array<Product>} Array containing results
   */

  this.getAll = async () => {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await axios.get(helper.options.endpoints.products, {
          params : {
            company_id : helper.options.companyId,
            token      : helper.options.token
          }
        });

        const products = result.data.map(product => new Product(product, helper));

        resolve(products);
      } catch (e) {
        reject(e);
      }
    });
  }

  /***
   * Update
   * @memberof KohoApiHelper#
   * @alias products.update
   * @param {Product} product
   * @returns {Promise|void}
   */

  /*this.update = async (product) => {
    return new Promise(async (resolve, reject) => {
      try {
        if ( ! product.id) {
          return reject('Cannot update project: No project.id specified');
        }

        const result = await axios.put(`${helper.options.endpoints.products}/${product.id}`,
          {
            product : product
          }, {
            params : {
              company_id : helper.options.companyId,
              token      : helper.options.token
            }
          }
        );

        resolve();
      } catch (e) {
        reject(e);
      }
    });
  }*/

  /**
   * Get by id
   * @memberof KohoApiHelper#
   * @alias products.getById
   * @params {number} productId Product ID
   * @returns {Promise|Product} Product
   */

  this.getById = async (productId) => {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await axios.get(`${helper.options.endpoints.products}/${productId}`, {
          params : {
            company_id : helper.options.companyId,
            token      : helper.options.token
          }
        });

        const product = new Product(result.data, helper);

        resolve(product);
      } catch (e) {
        reject(e);
      }
    });
  }

  return this;
}