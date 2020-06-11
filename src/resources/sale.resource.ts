import { SaleProperties } from "../property-definitions";
import { KohoApiHelper } from "..";
import { Resource } from '../resource'; 

export class Sale extends Resource {
  constructor (properties: SaleProperties, helper: KohoApiHelper) {
    super(properties, helper, 'sales');
  }

  _updateInterceptor(properties: SaleProperties) {
    // Rename template_links array for update request (legacy naming?)
    if (properties.products && properties.products.length) {
      properties.products_attributes = properties.products;

      delete properties.products;
    }
  }
}