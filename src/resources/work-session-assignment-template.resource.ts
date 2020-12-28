import { KohoApiHelper } from '../index';
import { Resource } from '../resource';

export interface WorkSessionAssignmentTemplateRequirementProperties {
  id?: number;
  name: string;
  description?: string;
  completed_at?: string;
  date: string;
  assignment_id?: number;
}

export interface WorkSessionAssignmentTemplateProperties {
  id?: number;
  name: string;
  description?: string;
  start_date?: string;
  end_date?: string;
  continuity?: string; // monthly, yearly..
  interval?: number;
  category_id?: number;
  category_name?: string;
  display_type?: string; // monthly, yearly, weekly..
  month_offset?: number;
  generate_past_days?: number;
  employee_policy?: string; // include_project_responsibilities etc
  customer_ids?: number[];
  requirements: WorkSessionAssignmentTemplateRequirementProperties[];

  [propName: string]: any;
}



export class WorkSessionAssignmentTemplate extends Resource {
  constructor (properties: WorkSessionAssignmentTemplateProperties, helper: KohoApiHelper) {
    super(properties, helper, 'work_session_assignment_template');
  }
}