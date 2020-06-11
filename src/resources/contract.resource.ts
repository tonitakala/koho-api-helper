import { KohoApiHelper } from '../index';
import { ContractProperties, ContractProductProperties } from "../property-definitions";
import { Resource } from '../resource';

/**
 * @constructor
 * @name Contract
 * @param {ContractProperties} properties
 * @param {KohoApiHelper} helper
 */

export class Contract extends Resource {
  constructor (properties: ContractProperties, helper: KohoApiHelper) {
    super(properties, helper, 'contracts');
  }

  _updateInterceptor(properties: ContractProperties) {
    if (properties.verification_level) {
      properties.acceptance_attributes = properties.acceptance_attributes || {};
      properties.acceptance_attributes.verification_level = properties.verification_level;

      delete properties.verification_level;
    }

    if (properties.products) {
      if (properties.products.length) {
        // We need to clean up some properties from the object
        properties.products_attributes = properties.products.map((product: ContractProductProperties, index) => {
          delete product.total_count;
          delete product.net_total;
          delete product.gross_total;
          delete product.accounting_account_number;
          delete product.accounting_target_number;

          if ( ! product.product_type_id) {
            throw new Error(`product_type_id missing for contract.products[${index}]`);
          }

          if ( ! product.monthly === undefined) {
            throw new Error(`monthly missing for contract.products[${index}]`);
          }

          if ( ! product.count) {
            throw new Error(`count missing for contract.products[${index}]`);
          }

          return product;
        });
      }

      delete properties.products;
    }
  }

  async update(properties: ContractProperties) : Promise<void> {
    return await super.update(properties);
  }
}