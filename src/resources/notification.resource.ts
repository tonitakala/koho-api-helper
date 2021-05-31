import { KohoApiHelper } from "..";
import { Resource } from '../resource'; 

export interface NotificationProperties {
  id?: number;
  customer_id: number;
  name: string;
  description?: string;
  cause?: string;
  employee_id?: number;
  object_type?: string;
  object_id?: number;
  company_id?: number;
  created_at?: string;
  updated_at?: string;

  [propName: string]: any;
}

export class Notification extends Resource {
  constructor (properties: NotificationProperties, helper: KohoApiHelper) {
    super(properties, helper, 'notifications');
  }
}