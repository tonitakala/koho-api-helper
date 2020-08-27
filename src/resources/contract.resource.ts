import { KohoApiHelper } from '../index';
import { Resource } from '../resource';

export interface ContractProductProperties {
  id?: number;
  name: string;
  count: string;
  monthly: string;
  product_type_id: number;
  price?: number;
  period_price?: number;
  description?: string;
  term_start?: string;
  term_end?: string;
  vat?: number;
  cost?: number;
  code?: string;
  discount_percentage?: number;
  custom_parameters?: any; 
  accounting_account_id?: number;
  accounting_target_id?: number;
  accounting_account_number?: string;
  accounting_target_number?: string;
  gross_total?: number;
  total_count?: number;
  net_total?: number;

  [propName: string]: any;
}

export class Contract extends Resource {
  id?: number;
  name!: string;
  description?: string;
  start_date?: string; // YYYY-MM-DD
  end_date?: string; // YYYY-MM-DD
  customer_id?: number;
  created_at?: string;
  updated_at?: string;
  billing_interval?: number;
  payment_term?: number;
  billing_day?: number;
  accounting_target_id?: number;
  billing_mode?: string; // upfront or afterwards
  billing_offset?: number;
  our_reference?: string;
  your_reference?: string;
  free_text_before_lines?: string;
  free_text_after_lines?: string;
  offer_id?: number;
  confirmed_by_manager?: boolean;
  products?: ContractProductProperties[];

  constructor (properties: Contract, helper: KohoApiHelper) {
    super(properties, helper, 'contracts');
  }

  _updateInterceptor(properties: Contract) : void {
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

  async update(properties: Contract) : Promise<void> {
    return await super.update(properties);
  }
}