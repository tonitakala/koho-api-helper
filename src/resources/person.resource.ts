import { KohoApiHelper } from '../index';
import { Resource } from '../resource'; 

export interface PersonAccessTokenProperties {
  id: number;
  customer_id: number;
  user_id: number;
  person_id: number;
  email: string;
  is_valid: boolean;
  admin: boolean;
  settings?: object;
  created_at: string;
  updated_at: string;

  [propName: string]: any;
}

export interface PersonProperties {
  id?: number;
  customer_id?: number;
  first_name: string;
  last_name: string;
  description?: string;
  email?: string;
  phone?: string;
  role?: string;
  position?: string;
  archived?: boolean;
  customer_access_tokens?: PersonAccessTokenProperties[];

  [propName: string]: any;
}

export class Person extends Resource {
  constructor (properties: PersonProperties, helper: KohoApiHelper) {
    super(properties, helper, 'persons');
  }

  _updateInterceptor(properties: Partial<PersonProperties>) : void {
    delete properties.customer_access_tokens;
  }

  async archive() : Promise<void> {
    return await super.update({ archived : true });
  }

  async activate() : Promise<void> {
    return await super.update({ archived : false });
  }

  async update(properties: Partial<PersonProperties>) : Promise<void> {
    return await super.update(properties);
  }
}