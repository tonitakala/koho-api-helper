import { KohoApiHelper } from '../index';
import { Methods } from '../methods';
import { Employee, EmployeeProperties } from '../resources/employee.resource';

export class EmployeeMethods extends Methods {
  constructor (helper: KohoApiHelper) {
    super(helper, 'employees', Employee);
  }

  /**
   * Suggested `params`:
   * @param offset Get results starting from this position
   * @param limit to limit the results
   */
  async getAll(params: object = {}) : Promise<Employee[]> {
    return await super.getAll(params);
  }

  async getById(id: number) : Promise<Employee> {
    return await super.getById(id);
  }

  async updateById(id: number, properties: Partial<EmployeeProperties>) : Promise<void> {
    return await super.updateById(id, properties);
  }

  async deleteById(id: number) : Promise<void> {
    return await super.deleteById(id);
  }

  async create(properties: EmployeeProperties) : Promise<Employee> {
    return await super.create(properties);
  }

}