import { KohoApiHelper } from '../index';
import { Methods } from '../methods';
import { WorkSessionAssignment, WorkSessionAssignmentProperties } from '../resources/work-session-assignment.resource';

export class WorkSessionAssignmentMethods extends Methods {
  constructor (helper: KohoApiHelper) {
    super(helper, 'work_session/assignments', WorkSessionAssignment);
  }

  /**
   * There are a lot of work session assignments. It is preferable to define `start_date` and `end_date` in params. They can be specified in any parseable date format (YYYY-MM-DD for example).
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