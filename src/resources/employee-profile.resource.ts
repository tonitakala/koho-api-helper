import { KohoApiHelper } from "..";
import { Resource } from '../resource'; 

export interface EmployeeProfileProperties {
  id?: number;
  company_id?: number;
  name: string;

  [propName: string]: any;
}

export class EmployeeProfile extends Resource {
  constructor (properties: EmployeeProfileProperties, helper: KohoApiHelper) {
    super(properties, helper, 'employees/profiles');
  }
}