import { KohoApiHelper } from '../index';
import { Resource } from '../resource';

export interface WorkSessionShiftTypeProperties {
  id: number,
  company_id: number,
  name: string,
  code: string,
  absent: boolean,
  cumulative: boolean,
  whole_days: boolean,
  work: boolean,
  admin_confirm: boolean,
  justify: boolean,
  created_at: string,
  updated_at: string,
  tracker: boolean,
  hidden: boolean

  [propName: string]: any;
}


export class WorkSessionShiftType extends Resource {
  constructor (properties: WorkSessionShiftTypeProperties, helper: KohoApiHelper) {
    super(properties, helper, 'workSessionShiftType');
  }
}