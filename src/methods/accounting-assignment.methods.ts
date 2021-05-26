import { KohoApiHelper } from '../index';
import { Methods } from '../methods';
import { AccountingAssignment } from '../resources/accounting-assignment.resource';

export class AccountingAssignmentMethods extends Methods {
  constructor (helper: KohoApiHelper) {
    super(helper, 'customers/accounting_assignments', AccountingAssignment);
  }

  async getAll(params: object = {}) : Promise<AccountingAssignment[]> {
    return await super.getAll(params);
  }

}