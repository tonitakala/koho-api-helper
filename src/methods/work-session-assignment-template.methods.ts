import { KohoApiHelper } from '../index';
import { Methods } from '../methods';
import { WorkSessionAssignmentTemplate, WorkSessionAssignmentTemplateProperties } from '../resources/work-session-assignment-template.resource';

export class WorkSessionAssignmentTemplateMethods extends Methods {
  constructor (helper: KohoApiHelper) {
    super(helper, 'work_session/assignment/templates', WorkSessionAssignmentTemplate);
  }

  async getAll(params: object = {}) : Promise<WorkSessionAssignmentTemplate[]> {
    return await super.getAll(params);
  }

  async getById(id: number) : Promise<WorkSessionAssignmentTemplate> {
    return await super.getById(id);
  }

  async updateById(id: number, properties: Partial<WorkSessionAssignmentTemplateProperties>) : Promise<void> {
    return await super.updateById(id, properties);
  }

  async deleteById(id: number) : Promise<void> {
    return await super.deleteById(id);
  }
}