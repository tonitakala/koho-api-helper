import { KohoApiHelper } from '../index';
import { Resource } from '../resource';

export interface WorkSessionShiftProperties {
  id: number,
  company_id: number,
  employee_name: string,
  description: string,
  start_time: string,
  end_time: string,
  date: string,
  employee_id: number,
  created_at: string,
  updated_at: string,
  hours: number,
  type_id: number,
  type_name: string,

  [propName: string]: any;
}


export class WorkSessionShift extends Resource {
  constructor (properties: WorkSessionShiftProperties, helper: KohoApiHelper) {
    super(properties, helper, 'workSessionShift');
  }
}