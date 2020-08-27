import { KohoApiHelper } from "..";
import { Resource } from '../resource'; 

export class Notification extends Resource {
  id?: number;
  customer_id!: number;
  name!: string;
  description?: string;
  cause?: string;
  employee_id?: number;
  object_type?: string;
  object_id?: number;
  company_id?: number;
  created_at?: string;
  updated_at?: string;

  constructor (properties: Notification, helper: KohoApiHelper) {
    super(properties, helper, 'customers/notifications');
  }
}