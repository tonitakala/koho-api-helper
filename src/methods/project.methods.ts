import { KohoApiHelper } from '../index';
import { Methods } from '../methods';
import { Project } from '../resources/project.resource';
import { ProjectProperties } from '../property-definitions';

export class ProjectMethods extends Methods {
  constructor (helper: KohoApiHelper) {
    super(helper, 'projects', Project);
  }

  _validateProperties(properties: ProjectProperties) {
    if (!properties.customer_id) {
      throw new Error('Missing customer_id for project');
    }

    if (!properties.name) {
      throw new Error('Missing name for project');
    }
  }

  async getAll(params: object = {}) : Promise<Project[]> {
    return await super.getAll(params);
  }

  async getById(id: number) : Promise<Project> {
    return await super.getById(id);
  }

  async updateById(id: number, properties: ProjectProperties) : Promise<void> {
    return await super.updateById(id, properties);
  }

  async deleteById(id: number) : Promise<void> {
    return await super.deleteById(id);
  }

  async create(properties: ProjectProperties, templateId?: number) : Promise<Project> {
    if (templateId) {
      properties.template_links_attributes = [{ template_id : templateId }];
    }

    return await super.create(properties);
  }

  async getByCustomerId(customerId: number) : Promise<Project[]> {
    const result = await this.request(`${this._uri}/find_by_customer/${customerId}`);
    const projects = result.map((r: ProjectProperties) => new Project(r, this._helper()));

    return projects;
  }
}