import { CustomerMethods } from './methods/customer.methods';
import { PersonMethods } from './methods/person.methods';
import { InvoiceMethods } from './methods/invoice.methods';
import { ContractMethods } from './methods/contract.methods';
import { EmployeeMethods } from './methods/employee.methods';
import { ProductMethods } from './methods/product.methods';
import { ProjectMethods } from './methods/project.methods';
import { SaleMethods } from './methods/sale.methods';

import axios, { AxiosResponse } from 'axios';

type KohoApiHelperOptions = {
  token: string;
  companyId?: number;
  enterpriseId?: number;
  url?: string;
}

export class KohoApiHelper {
  options: any;

  readonly customers: CustomerMethods;
  readonly persons: PersonMethods;
  readonly invoices: InvoiceMethods;
  readonly contracts: ContractMethods;
  readonly employees: EmployeeMethods;
  readonly products: ProductMethods;
  readonly projects: ProjectMethods;
  readonly sales: SaleMethods;

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
    this.persons = new PersonMethods(this);
    this.invoices = new InvoiceMethods(this);
    this.contracts = new ContractMethods(this);
    this.employees = new EmployeeMethods(this);
    this.products = new ProductMethods(this);
    this.projects = new ProjectMethods(this);
    this.sales = new SaleMethods(this);
  }

  async request(url: string, method?: string, data?: any, params?: any, options?: any) : Promise<AxiosResponse> {
    if ( ! url) {
      throw new Error('Missing URL for request');
    }

    method = method || 'GET';
    data = data || {};

    return await axios.request({
      url    : url,

      method : method,
      data   : data,

      // concatenate auth params + original params
      params : { ...this._authParams, ...params },

      ...options
    });
  }

  get _authParams() {
    const params : any = {
      token : this.options.token
    }

    // Use company id or enterprise id (prefer company id)
    if (this.options.companyId) {
      params.company_id = this.options.companyId
    } else {
      params.enterprise_id = this.options.enterpriseId
    }

    return params;
  }
}