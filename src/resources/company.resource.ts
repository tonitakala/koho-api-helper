import { KohoApiHelper } from "..";
import { Resource } from '../resource'; 

export interface CompanyProperties {
  id?: number;
  name: string;
  custom_attributes?: any;

  [propName: string]: any;
}

export class Company extends Resource {
  constructor (properties: CompanyProperties, helper: KohoApiHelper) {
    super(properties, helper, 'companies');
  }
}