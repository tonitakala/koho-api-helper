export interface CustomerProperties {
  id?: number;
  name?: string;

  [propName: string]: any;
}

export interface CustomerCategoryProperties {
  id: number;
  name: string;
  description?: string;
  customer_ids?: number[];
}

export interface CustomerGroupProperties {
  id?: number;
  name?: string;
  description?: string;
  customer_ids?: number[];
  custom_parameters?: any;
}

export interface PersonProperties {
  id?: number;
  customer_id?: number;
  first_name?: string;
  last_name?: string;
  description?: string;
  email?: string;
  phone?: string;
  role?: string;
  position?: string;
  archived?: boolean;

  [propName: string]: any;
}

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
  status: string; // approved, unapproved, sent, paid
  created_at: string; // (ISO 8601) [cannot be modified]
  updated_at: string; // (ISO 8601) [cannot be modified]
  billing_date: string; // YYYY-MM-DD
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
  products: InvoiceProductProperties[];
  work_sessions: any;

  [propName: string]: any;
}

export interface ContractProductProperties {
  id?: number;
  name: string;
  count: string;
  monthly: string;
  product_type_id: number;
  price?: number;
  period_price?: number;
  description?: string;
  term_start?: string;
  term_end?: string;
  vat?: number;
  cost?: number;
  code?: string;
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

export interface ContractProperties {
  id?: number;
  name: string;
  description?: string;
  start_date: string; // YYYY-MM-DD
  end_date?: string; // YYYY-MM-DD
  customer_id: number;
  created_at: string;
  updated_at: string;
  billing_interval: number;
  payment_term?: number;
  billing_day?: number;
  accounting_target_id?: number;
  billing_mode?: string; // upfront or afterwards
  billing_offset?: number;
  our_reference?: string;
  your_reference?: string;
  free_text_before_lines?: string;
  free_text_after_lines?: string;
  offer_id?: number;
  confirmed_by_manager?: boolean;
  products?: ContractProductProperties[];

  [propName: string]: any;
}

export interface EmployeeProperties {
  id?: number;
  user_id?: number;
  name: string;
  email: string;
  username: string;
  code?: string;
  team_name?: string;
  hourly_cost?: number;
  profile_template_id?: number;
  profile_name?: string;
  active?: boolean;
  groups?: EmployeeGroupProperties[];
  accounting_target_number?: string;
  accounting_target_2_number?: string;
  accounting_target_3_number?: string;
  accounting_target_4_number?: string;
  accounting_target_id?: number;

  [propName: string]: any;
}

export interface EmployeeGroupProperties {
  id: number;
  name: string;
}

export interface ProductTranslationHashLanguage {
  name?: string;
  description?: string;
}

export interface ProductTranslationHash {
  SE?: ProductTranslationHashLanguage;
  EN?: ProductTranslationHashLanguage;
}

export interface ProductProperties {
  id?: number;
  name: string;
  description?: string;
  price: number;
  gross_price?: number;
  vat?: number;
  cost?: number;
  code?: string;
  monthly: boolean;
  product_category_id?: number;
  unit_of_measurement?: string;
  translation_hash?: ProductTranslationHash;

  [propName: string]: any;
}

export interface ProjectTemplateProperties {
  id: number;
  name: string;
}

export interface ProjectProperties {
  id?: number;
  name: string;
  start_date?: string; // YYYY-MM-DD
  end_date?: string; // YYYY-MM-DD
  customer_id?: number;
  active: boolean;
  description?: string;
  templates?: ProjectTemplateProperties[];
  plan_id?: number;

  [propName: string]: any;
}

export interface SaleProductProperties {
  id?: number;
  name: string;
  count: number;
  product_type_id: number;
  price: number;
  description?: string;
  vat?: number;
  cost?: number;
  code?: string;
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

export interface SaleProperties {
  id?: number;
  name: string;
  customer_id: number;
  products: SaleProductProperties[];

  [propName: string]: any;
}

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