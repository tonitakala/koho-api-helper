import { KohoApiHelper } from '../index';
import { Methods } from '../methods';
import { Person, PersonProperties } from '../resources/person.resource';

export class PersonMethods extends Methods {
  constructor (helper: KohoApiHelper) {
    super(helper, 'customer/persons', Person);
  }

  _validateProperties(properties: PersonProperties) {
    if (!properties.customer_id) {
      throw new Error('Missing customer_id for person');
    }
  }

  async getAll(params: object = {}) : Promise<Person[]> {
    return await super.getAll(params);
  }

  async getById(id: number) : Promise<Person> {
    return await super.getById(id);
  }

  async updateById(id: number, properties: Partial<PersonProperties>) : Promise<void> {
    return await super.updateById(id, properties);
  }

  async deleteById(id: number) : Promise<void> {
    return await super.deleteById(id);
  }

  async create(properties: PersonProperties) : Promise<Person> {
    return await super.create(properties);
  }
}