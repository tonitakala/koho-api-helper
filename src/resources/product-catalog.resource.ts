import { KohoApiHelper } from '../index';
import { Resource } from '../resource'; 

export interface ProductCatalogPrice {
  product_type_id: number;
  net_price?: number;
  percentage?: number;
}

export class ProductCatalog extends Resource {
  id?: number;
  company_id?: number;
  created_at!: string;
  valid_from?: string;
  valid_to?: string;
  name!: string;
  description?: string;
  customer_ids!: number[];
  linked_customer_ids!: number[];
  prices?: ProductCatalogPrice[];

  constructor (properties: ProductCatalog, helper: KohoApiHelper) {
    super(properties, helper, 'productsCatalogs');
  }

  async update (properties: Partial<ProductCatalog>) : Promise<void> {
    return super.update(properties);
  }

  async addCustomerToCatalogByCustomerId(customerId: number, companyHasMultipleCatalogsEnabled: boolean) : Promise<void> {
    if (companyHasMultipleCatalogsEnabled) {
      this.linked_customer_ids = this.linked_customer_ids || [];
      this.linked_customer_ids.push(customerId);

      return await this._helper()[this._type()].updateById(this.id, {
        linked_customer_ids: this.linked_customer_ids
      });
    } else {
      this.customer_ids = this.customer_ids || [];
      this.customer_ids.push(customerId);

      return await this._helper()[this._type()].updateById(this.id, {
        customer_ids: this.customer_ids
      });
    }
  }

  async removeCustomerFromCatalogByCustomerId(customerId: number, companyHasMultipleCatalogsEnabled: boolean) : Promise<void> {
    if (companyHasMultipleCatalogsEnabled) {
      this.linked_customer_ids = this.linked_customer_ids || [];
      
      if ( ! this.linked_customer_ids.includes(customerId)) {
        return;
      }

      this.linked_customer_ids.splice(this.linked_customer_ids.indexOf(customerId), 1);

      return await this._helper()[this._type()].updateById(this.id, {
        linked_customer_ids: this.linked_customer_ids
      });
    } else {
      this.customer_ids = this.customer_ids || [];

      if ( ! this.customer_ids.includes(customerId)) {
        return;
      }

      this.customer_ids.splice(this.customer_ids.indexOf(customerId), 1);

      return await this._helper()[this._type()].updateById(this.id, {
        customer_ids: this.customer_ids
      });
    }
  }
}