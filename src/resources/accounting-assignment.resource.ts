import { KohoApiHelper } from '../index';
import { Resource } from '../resource';


export interface AccountingAssingmentProperties {
  id: number;
  name: string;
  company_id: number;

  [propName: string]: any;
}

export class AccountingAssignment extends Resource {
  constructor (properties: AccountingAssingmentProperties, helper: KohoApiHelper) {
    super(properties, helper, 'accountingAssignment');
  }
}