import { CustomerMethods } from './methods/customer.methods';
import { PersonMethods } from './methods/person.methods';
import { InvoiceMethods } from './methods/invoice.methods';
import { ContractMethods } from './methods/contract.methods';
import { EmployeeMethods } from './methods/employee.methods';
import { ProductMethods } from './methods/product.methods';
import { ProjectMethods } from './methods/project.methods';
import { SaleMethods } from './methods/sale.methods';
import { NotificationMethods } from './methods/notification.methods';

import { default as got } from 'got';
import { CustomerCategoryMethods } from './methods/customer-category.methods';
import { CustomerGroupMethods } from './methods/customer-group.methods';

type KohoApiHelperOptions = {
  token: string;
  companyId?: number;
  enterpriseId?: number;
  url?: string;
}

export class KohoApiHelper {
  [propName: string]: any;
  options: any;

  readonly customers: CustomerMethods;
  readonly persons: PersonMethods;
  readonly invoices: InvoiceMethods;
  readonly contracts: ContractMethods;
  readonly employees: EmployeeMethods;
  readonly products: ProductMethods;
  readonly projects: ProjectMethods;
  readonly sales: SaleMethods;
  readonly notifications: NotificationMethods;
  readonly customersCategories: CustomerCategoryMethods;
  readonly customersGroups: CustomerGroupMethods;

  constructor(options: KohoApiHelperOptions) {
    this.options = options || {};

    if ( ! this.options.token) {
      throw new Error('No API token specified');
    }

    if ( ! this.options.companyId && ! this.options.enterpriseId) {
      throw new Error('No Company ID or enterpriseId specified');
    }

    if (! this.options.url) {
      this.options.url = 'https://suite-beta.koho-online.com/api';
    }

    this.customers = new CustomerMethods(this);
    this.customersCategories = new CustomerCategoryMethods(this);
    this.customersGroups = new CustomerGroupMethods(this);
    this.persons = new PersonMethods(this);
    this.invoices = new InvoiceMethods(this);
    this.contracts = new ContractMethods(this);
    this.employees = new EmployeeMethods(this);
    this.products = new ProductMethods(this);
    this.projects = new ProjectMethods(this);
    this.sales = new SaleMethods(this);
    this.notifications = new NotificationMethods(this);
  }

  async request(url: string, method?: string, data?: any, params?: any, options?: any) : Promise<any> {
    if ( ! url) {
      throw new Error('Missing URL for request');
    }

    const gotOptions = {
      method: method || 'GET',
      searchParams: { ...this._authParams, ...params },
      ...options
    }

    if (gotOptions.method !== 'GET') {
      gotOptions.json = data;
    }

    return await got(url, gotOptions).json();
  }

  get _authParams() {
    const params : any = {
      token : this.options.token
    }

    if (this.options.enterpriseId) {
      params.enterprise_id = this.options.enterpriseId
    }

    if (this.options.companyId) {
      params.company_id = this.options.companyId
    }

    return params;
  }
}