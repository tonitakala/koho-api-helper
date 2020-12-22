import { KohoApiHelper } from '../index';
import { Methods } from '../methods';
import { WorkSession, WorkSessionProperties } from '../resources/work-session.resource';

export class WorkSessionMethods extends Methods {
  constructor (helper: KohoApiHelper) {
    super(helper, 'work_sessions', WorkSession);
  }

  /**
   * There are a lot of work sessions. It is preferable to define `start_date` and `end_date` in params. They can be specified in any parseable date format (YYYY-MM-DD for example).
   */
  async getAll(params: object = {}) : Promise<WorkSession[]> {
    return await super.getAll(params);
  }

  async getById(id: number) : Promise<WorkSession> {
    return await super.getById(id);
  }

  async updateById(id: number, properties: Partial<WorkSessionProperties>) : Promise<void> {
    return await super.updateById(id, properties);
  }

  async deleteById(id: number) : Promise<void> {
    return await super.deleteById(id);
  }
}