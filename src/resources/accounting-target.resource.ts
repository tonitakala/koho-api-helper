import { KohoApiHelper } from "..";
import { Resource } from '../resource'; 

export interface AccountingTargetProperties {
  id?: number;
  company_id?: number;
  name: string;
  number: string;
  level?: number;

  [propName: string]: any;
}

export class AccountingTarget extends Resource {
  constructor (properties: AccountingTargetProperties, helper: KohoApiHelper) {
    super(properties, helper, 'employees/profiles');
  }
}