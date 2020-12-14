import { KohoApiHelper } from '../index';
import { Methods } from '../methods';
import { EmployeeProfile, EmployeeProfileProperties } from '../resources/employee-profile.resource';

export class EmployeeProfileMethods extends Methods {
  constructor (helper: KohoApiHelper) {
    super(helper, 'employees/profiles', EmployeeProfile);
  }

  async getAll(params: object = {}) : Promise<EmployeeProfile[]> {
    return await super.getAll(params);
  }
}