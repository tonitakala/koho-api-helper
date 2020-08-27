import { KohoApiHelper } from '../index';
import { Resource } from '../resource'; 

export interface ProductTranslationHashLanguage {
  name?: string;
  description?: string;
}

export interface ProductTranslationHash {
  SE?: ProductTranslationHashLanguage;
  EN?: ProductTranslationHashLanguage;
}

export class Product extends Resource {
  id?: number;
  name!: string;
  description?: string;
  price!: number;
  gross_price?: number;
  vat?: number;
  cost?: number;
  code?: string;
  monthly!: boolean;
  product_category_id?: number;
  unit_of_measurement?: string;
  translation_hash?: ProductTranslationHash;

  constructor (properties: Product, helper: KohoApiHelper) {
    super(properties, helper, 'products');
  }

  async archive() : Promise<void> {
    return await super.update({ active : false });
  }

  async activate() : Promise<void> {
    return await super.update({ active : true });
  }

  async update (properties: Partial<Product>) : Promise<void> {
    return super.update(properties);
  }
}