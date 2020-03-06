const axios = require('axios');
const Project = require('../api-resources/project');

module.exports = function(helper) {

  /**
   * Get all projects
   * @memberof KohoApiHelper#
   * @alias projects.getAll
   * @returns {Promise|Array<Project>} Array containing projects
   */

  this.getAll = async () => {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await axios.get(helper.options.endpoints.projects, {
          params : {
            company_id : helper.options.companyId,
            token      : helper.options.token
          }
        });

        const projects = result.data.map(project => new Project(project, helper));

        resolve(projects);
      } catch (e) {
        reject(e);
      }
    });
  }

  /**
   * Get project by id
   * @memberof KohoApiHelper#
   * @alias projects.getById
   * @params {number} projectId Project ID
   * @returns {Promise|Project} Project
   */

  this.getById = async (projectId) => {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await axios.get(`${helper.options.endpoints.projects}/${projectId}`, {
          params : {
            company_id : helper.options.companyId,
            token      : helper.options.token
          }
        });

        const project = new Project(result.data, helper);

        resolve(project);
      } catch (e) {
        reject(e);
      }
    });
  }


  /**
   * Update project
   * @memberof KohoApiHelper#
   * @alias projects.update
   * @param {Project} project
   * @returns {Promise|void}
   */

  this.update = async (project) => {
    return new Promise(async (resolve, reject) => {
      try {
        if ( ! project.id) {
          return reject('Cannot update project: No project.id specified');
        }

        // Rename template_links array for update request (legacy naming?)
        if (project.template_links && project.template_links.length) {
          project.project.template_links_attributes = project.template_links;

          delete project.template_links;
        }

        const result = await axios.put(`${helper.options.endpoints.projects}/${project.id}`,
          {
            project : project
          }, {
            params : {
              company_id : helper.options.companyId,
              token      : helper.options.token
            }
          }
        );

        resolve();
      } catch (e) {
        reject(e);
      }
    });
  }

  /**
   * Create project
   * @memberof KohoApiHelper#
   * @alias projects.create
   * @param {ProjectProperties} project Project properties
   * @param {number} [templateId] Project template ID to link the project to
   * @returns {Promise|Project}
   */

  this.create = async (project, templateId) => {
    return new Promise(async (resolve, reject) => {
      try {
        if (project.id) {
          return reject('Cannot create project: project.id was specified in properties');
        }

        if (!project.customer_id) {
          return reject('Cannot create project: no project.customer_id specified in properties');
        }

        if (!project.name) {
          return reject('Cannot create project: no project.name specified in properties');
        }

        // link to template
        if (templateId) {
          project.template_links_attributes = [{ template_id : templateId }];
        }

        // Rename template_links array for update request (legacy naming?)
        if (project.template_links && project.template_links.length) {
          project.project.template_links_attributes = project.template_links;

          delete project.template_links;
        }

        const result = await axios.post(helper.options.endpoints.projects,
          {
            project : project
          }, {
            params : {
              company_id : helper.options.companyId,
              token      : helper.options.token
            }
          }
        );

        const projectId = result.data.id;
        const projectCreated = await this.getById(projectId);

        resolve(projectCreated);
      } catch (e) {
        reject(e);
      }
    });
  }


  return this;
}