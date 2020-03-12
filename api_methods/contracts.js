const axios = require('axios');
const Contract = require('../api_resources/contract');

module.exports = function(helper) {

  /**
   * Get all
   * @memberof KohoApiHelper#
   * @alias contracts.getAll
   * @returns {Promise|Array<Contract>} Array containing results
   */

  this.getAll = async () => {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await axios.get(helper.options.endpoints.contracts, {
          params : {
            company_id : helper.options.companyId,
            token      : helper.options.token
          }
        });

        const contracts = result.data.map(contract => new Contract(contract, helper));

        resolve(contracts);
      } catch (e) {
        reject(e);
      }
    });
  }

  /**
   * @memberof KohoApiHelper#
   * @alias contracts.getById
   * @params {number} contractId
   * @returns {Promise|Contract} Contract
   */

  this.getById = async (contractId) => {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await axios.get(`${helper.options.endpoints.contracts}/${contractId}`, {
          params : {
            company_id : helper.options.companyId,
            token      : helper.options.token
          }
        });

        const contract = new Contract(result.data, helper);

        resolve(contract);
      } catch (e) {
        reject(e);
      }
    });
  }

  /**
   * Update customer
   * @memberof KohoApiHelper#
   * @alias customers.update
   * @param {Customer} customer
   * @returns {Promise|void}
   */

  this.update = async (contract) => {
    return new Promise(async (resolve, reject) => {
      try {
        // Modify verification attributes
        if (contract.verification_level) {
          contract.acceptance_attributes = contract.acceptance_attributes || {};
          contract.acceptance_attributes.verification_level = contract.verification_level;

          delete contract.verification_level;
        }

        if (contract.products) {
          if (contract.products.length) {
            // We need to clean up some properties from the object
            contract.products_attributes = contract.products.map((product, index) => {
              delete product.total_count;
              delete product.net_total;
              delete product.gross_total;
              delete product.accounting_account_number;
              delete product.accounting_target_number;

              if ( ! product.product_type_id) {
                return reject(`product_type_id missing for contract.products[${index}]`);
              }

              if ( ! product.monthly === undefined) {
                return reject(`monthly missing for contract.products[${index}]`);
              }

              if ( ! product.count) {
                return reject(`count missing for contract.products[${index}]`);
              }

              return product;
            });
          }

          delete contract.products;
        }


        if ( ! contract.id) {
          return reject('Cannot update contract: No contract.id specified');
        }

        const result = await axios.put(`${helper.options.endpoints.contracts}/${contract.id}`,
          {
            contract : contract
          }, {
            params : {
              company_id : helper.options.companyId,
              token      : helper.options.token
            }
          }
        );

        console.log(result.data);

        resolve();
      } catch (e) {
        reject(e);
      }
    });
  }


  return this;
}