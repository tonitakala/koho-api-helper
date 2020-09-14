import { KohoApiHelper } from '../index';
import { Resource } from '../resource';

export interface InvoiceProductProperties {
  id?: number;
  name: string;
  description?: string;
  count: number;
  monthly: boolean;
  product_type_id: number;
  price?: number;
  vat?: number;
  cost?: string;
  code?: string;
  invoice_position?: number;
  discount_percentage?: number;
  custom_parameters?: any;
  accounting_account_id?: number;
  accounting_target_id?: number;
  accounting_account_number?: string;
  accounting_target_number?: string;
  gross_total?: number;
  total_count?: number;
  net_total?: number;

  [propName: string]: any;
}

export interface InvoiceProperties {
  id?: number;
  name: string;
  number?: number;
  description?: string;
  contract_id?: number;
  customer_id: number;
  due_date: string; // YYYY-MM-DD
  status?: string; // approved, unapproved, sent, paid
  created_at?: string; // (ISO 8601) [cannot be modified]
  updated_at?: string; // (ISO 8601) [cannot be modified]
  billing_date?: string; // YYYY-MM-DD
  term_start?: string;
  approved?: string;
  paid?: string;
  payment_term?: number;
  our_reference?: string;
  your_reference?: string;
  free_text_before_lines?: string;
  free_text_after_lines?: string;
  delivery_method?: string;
  gross_amount?: number;
  net_amount?: number;
  refund_to_id?: number;
  project_id?: number;
  products?: InvoiceProductProperties[];
  work_sessions?: any;

  [propName: string]: any;
}

export class Invoice extends Resource {

  constructor (properties: InvoiceProperties, helper: KohoApiHelper) {
    super(properties, helper, 'invoices');
  }

  async update(properties: Partial<InvoiceProperties>) : Promise<void> {
    return await super.update(properties);
  }
}