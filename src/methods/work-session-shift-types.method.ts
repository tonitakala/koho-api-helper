import { KohoApiHelper } from '../index';
import { Methods } from '../methods';
import { WorkSessionShiftType, WorkSessionShiftTypeProperties } from '../resources/work-session-shift-type.resource';


export class WorkSessionShiftTypeMethods extends Methods {
  constructor (helper: KohoApiHelper) {
    super(helper, 'work_session/shifts/types', WorkSessionShiftType);
  }

  async getAll(params: object = {}) : Promise<WorkSessionShiftType[]> {
    return await super.getAll(params);
  }
}