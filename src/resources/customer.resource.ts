import { KohoApiHelper } from '../index';
import { Resource } from '../resource';
import { Person } from './person.resource';
import { Invoice } from "./invoice.resource";
import { Employee } from './employee.resource';

export class Customer extends Resource {
  id?: number;
  company_id?: number;
  name!: string;
  description?: string;
  number?: number;
  code?: string;
  organization_id?: string;
  customer_category_id?: number;
  archived?: boolean;
  invoice_name?: string;
  address?: string;
  zip_code?: string;
  city?: string;
  region?: string;
  country?: string;
  delivery_name?: string;
  delivery_address?: string;
  delivery_zip_code?: string;
  delivery_city?: string;
  delivery_country?: string;
  website?: string;
  phone?: string;
  email?: string;
  created_at?: string;
  updated_at?: string;
  ovt_identifier?: string;
  electronic_invoicing_intermediary?: string;
  default_invoice_delivery_method?: string;
  default_invoice_template_id?: number;
  web_invoice_address?: string;
  delivery_region?: string;
  address_extra?: string;
  delivery_address_extra?: string;
  accounting_software_delivery_method?: string;
  invoice_language?: string;
  default_our_reference?: string;
  default_your_reference?: string;
  custom_parameters?: object;
  persons?: Person[];
  employees?: Employee[];
  group_ids?: number[];
  archived_at?: string;
  zero_vat?: boolean;
  posting_group?: string;
  block_sessions?: boolean;
  marketing_ban?: boolean;
  
  constructor (properties: Customer, helper: KohoApiHelper) {
    super(properties, helper, 'customers');
  }

  _updateInterceptor(properties: Partial<Customer>) : void {

    // rename persons to persons_attributes and remove access tokens
    if (properties.persons) {
      if (properties.persons.length) {
        properties.persons_attributes = properties.persons.map((person: Partial<Person>) => {
          if (person.customer_access_tokens) {
            delete person.customer_access_tokens;
          }

          return person;
        });
      }

      delete properties.persons;
    }

    // Rename employees array for update request
    if (properties.employees) {
      if (properties.employees.length) {
        properties.responsibilities_attributes = properties.employees;
      }

      delete properties.employees;
    }

  }

  async archive() : Promise<void> {
    return await super.update({ archived : true });
  }

  async activate() : Promise<void> {
    return await super.update({ archived : false });
  }

  async getInvoices() : Promise<Invoice[]> {
    return await this._helper().invoices.getByCustomerId(this.id);
  }

  async update(properties: Partial<Customer>) : Promise<void> {
    return await super.update(properties);
  }

  async addNotification(message: string) : Promise<void> {
    return await this._helper()[this._type()].addNotificationById(this.id, message);
  }
  
  async addFile(folderId: number, name: string, fileBuffer: Buffer, fileMetadata: { filename: string; contentType: string }, description?: string) : Promise<void> {
    return await this._helper()[this._type()].addFileById(this.id, folderId, name, fileBuffer, fileMetadata, description);
  }
}