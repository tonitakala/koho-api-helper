import { KohoApiHelper } from '../index';
import { Methods } from '../methods';
import { EmployeeTeam, EmployeeTeamProperties } from '../resources/employee-team.resource';

export class EmployeeTeamMethods extends Methods {
  constructor (helper: KohoApiHelper) {
    super(helper, 'employees/teams', EmployeeTeam);
  }

  async getAll(params: object = {}) : Promise<EmployeeTeam[]> {
    return await super.getAll(params);
  }
}