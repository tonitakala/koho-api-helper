import { KohoApiHelper } from '../index';
import { Methods } from '../methods';
import { WorkSessionShift, WorkSessionShiftProperties } from '../resources/work-session-shift.resource';

export class WorkSessionShiftMethods extends Methods {
  constructor (helper: KohoApiHelper) {
    super(helper, 'work_session/shifts', WorkSessionShift);
  }

    /**   
   * Suggested `params`:
   * @param start_date date starting from (YYYY-MM-DD)
   * @param end_date date ending by (YYYY-MM-DD)
   * @param employee_id filter with employee_id
   * @param type_id filter with type
   * @param updated_after Get objects updated after YYYY-MM-DD 
   */
  async getAll(params: object = {}) : Promise<WorkSessionShift[]> {
    return await super.getAll(params);
  }
}