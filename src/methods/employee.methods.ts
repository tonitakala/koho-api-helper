import { KohoApiHelper } from '../index';
import { Methods } from '../methods';
import { Employee } from '../resources/employee.resource';
import { EmployeeProperties } from '../property-definitions';

export class EmployeeMethods extends Methods {
  constructor (helper: KohoApiHelper) {
    super(helper, 'employees', Employee);
  }

  async getAll(params: object = {}) : Promise<Employee[]> {
    return await super.getAll(params);
  }

  async getById(id: number) : Promise<Employee> {
    return await super.getById(id);
  }

  async updateById(id: number, properties: EmployeeProperties) : Promise<void> {
    return await super.updateById(id, properties);
  }

  async deleteById(id: number) : Promise<void> {
    return await super.deleteById(id);
  }

  async create(properties: EmployeeProperties) : Promise<Employee> {
    return await super.create(properties);
  }

}