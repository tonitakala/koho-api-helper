import { KohoApiHelper } from '../index';
import { Methods } from '../methods';
import { WorkSessionAssignment, WorkSessionAssignmentProperties } from '../resources/work-session-assignment.resource';

export class WorkSessionAssignmentMethods extends Methods {
  constructor (helper: KohoApiHelper) {
    super(helper, 'work_session/assignments', WorkSessionAssignment);
  }

  /**
   * Suggested `params`:
   * @param start_date Assignment date starting from (YYYY-MM-DD)
   * @param end_date Assignment date ending by (YYYY-MM-DD)
   * @param plan true to only show project plans (projektisuunnitelma)
   * @param no_plan true to only show assignments (työmääräys)
   * @param updated_after Get objects updated after YYYY-MM-DD 
   * @param confirmed true to only show confirmed assignments
   * @param unconfirmed true to only show unconfirmed assignments
   * @param offset Get results starting from this position
   * @param limit to limit the results
   */
  async getAll(params: object = {}) : Promise<WorkSessionAssignment[]> {
    return await super.getAll(params);
  }

  async getById(id: number) : Promise<WorkSessionAssignment> {
    return await super.getById(id);
  }

  async updateById(id: number, properties: Partial<WorkSessionAssignmentProperties>) : Promise<void> {
    return await super.updateById(id, properties);
  }

  async deleteById(id: number) : Promise<void> {
    return await super.deleteById(id);
  }
}