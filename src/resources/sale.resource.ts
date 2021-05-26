import { KohoApiHelper } from "..";
import { Resource } from '../resource'; 

export interface SaleProductProperties {
  id?: number;
  name: string;
  count: number;
  product_type_id: number;
  price: number;
  description?: string;
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

export interface SaleProperties {
  id?: number;
  name: string;
  customer_id?: number;
  products?: SaleProductProperties[];
  products_attributes?: SaleProductProperties[];

  [propName: string]: any;
}

export class Sale extends Resource {

  constructor (properties: SaleProperties, helper: KohoApiHelper) {
    super(properties, helper, 'sales');
  }

  _updateInterceptor(properties: Partial<SaleProperties>) : void {
    // Rename template_links array for update request (legacy naming?)
    if (properties.products && properties.products.length) {
      properties.products_attributes = properties.products;

      delete properties.products;
    }
  }

  async update (properties: Partial<SaleProperties>) : Promise<void> {
    return super.update(properties);
  }
}