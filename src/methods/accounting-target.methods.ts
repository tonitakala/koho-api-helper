import { KohoApiHelper } from '../index';
import { Methods } from '../methods';
import { AccountingTarget, AccountingTargetProperties } from '../resources/accounting-target.resource';

export class AccountingTargetMethods extends Methods {
  constructor (helper: KohoApiHelper) {
    super(helper, 'accounting/targets', AccountingTarget, 'accounting_target');
  }

  async getAll(params: object = {}) : Promise<AccountingTarget[]> {
    return await super.getAll(params);
  }

  /**
   * 
   * @param properties Provide: `name`, `level` and `number`
   */

  async create(properties: Partial<AccountingTargetProperties>) : Promise<AccountingTarget> {
    return await super.create(properties);
  }
}