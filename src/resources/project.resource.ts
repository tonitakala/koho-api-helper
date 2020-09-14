import { KohoApiHelper } from "..";
import { Resource } from '../resource'; 

export interface ProjectTemplateProperties {
  id: number;
  name?: string;
}

export interface ProjectProperties {
  id?: number;
  name: string;
  start_date?: string; // YYYY-MM-DD
  end_date?: string; // YYYY-MM-DD
  customer_id?: number;
  active?: boolean;
  description?: string;
  templates?: ProjectTemplateProperties[];
  plan_id?: number;

  [propName: string]: any;
}

export class Project extends Resource {
  constructor (properties: ProjectProperties, helper: KohoApiHelper) {
    super(properties, helper, 'projects');
  }

  _updateInterceptor(properties: Partial<ProjectProperties>) : void {
    // Rename template_links array for update request (legacy naming?)
    if (properties.template_links && properties.template_links.length) {
      properties.template_links_attributes = properties.template_links;

      delete properties.template_links;
    }
  }

  async archive() : Promise<void> {
    return await super.update({ active : false });
  }

  async activate() : Promise<void> {
    return await super.update({ active : true });
  }

  async update (properties: Partial<ProjectProperties>) : Promise<void> {
    return super.update(properties);
  }
}