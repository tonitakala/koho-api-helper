import { KohoApiHelper } from '../index';
import { Methods } from '../methods';
import { Project, ProjectProperties } from '../resources/project.resource';

export class ProjectMethods extends Methods {
  constructor (helper: KohoApiHelper) {
    super(helper, 'projects', Project);
  }

  _validateProperties(properties: ProjectProperties) : void {
    if (!properties.customer_id) {
      throw new Error('Missing customer_id for project');
    }

    if (!properties.name) {
      throw new Error('Missing name for project');
    }
  }

  /**
   * Suggested `params`:
   * @param offset Get results starting from this position
   * @param limit to limit the results
   */
  async getAll(params: object = {}) : Promise<Project[]> {
    return await super.getAll(params);
  }

  async getById(id: number) : Promise<Project> {
    return await super.getById(id);
  }

  async updateById(id: number, properties: Partial<ProjectProperties>) : Promise<void> {
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