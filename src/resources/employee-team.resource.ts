import { KohoApiHelper } from "..";
import { Resource } from '../resource'; 

export interface EmployeeTeamProperties {
  id?: number;
  company_id?: number;
  name: string;
  employee_ids?: number[];
  foreman_ids?: number[];

  [propName: string]: any;
}

export class EmployeeTeam extends Resource {
  constructor (properties: EmployeeTeamProperties, helper: KohoApiHelper) {
    super(properties, helper, 'employees/teams');
  }
}