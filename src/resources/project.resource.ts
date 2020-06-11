import { ProjectProperties } from "../property-definitions";
import { KohoApiHelper } from "..";
import { Resource } from '../resource'; 

export class Project extends Resource {
  constructor (properties: ProjectProperties, helper: KohoApiHelper) {
    super(properties, helper, 'projects');
  }

  _updateInterceptor(properties: ProjectProperties) {
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

  async update(properties: ProjectProperties) : Promise<void> {
    return await super.update(properties);
  }

}