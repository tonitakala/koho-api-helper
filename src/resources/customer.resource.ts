import { KohoApiHelper } from '../index';
import { CustomerProperties, PersonProperties } from "../property-definitions";
import { Resource } from '../resource';
import { Invoice } from "./invoice.resource";

export class Customer extends Resource {

  constructor (properties: CustomerProperties, helper: KohoApiHelper) {
    super(properties, helper, 'customers');

    /*if (properties.persons && properties.persons.length) {
      this.properties.persons = properties.persons.map((person) => new Person(person, helper));
    }*/
  }

  _updateInterceptor(properties: CustomerProperties) {

    // rename persons to persons_attributes and remove access tokens
    if (properties.persons) {
      if (properties.persons.length) {
        properties.persons_attributes = properties.persons.map((person: PersonProperties) => {
          if (person.customer_access_tokens) {
            delete person.customer_access_tokens;
          }

          return person;
        });
      }

      delete properties.persons;
    }

    // Rename employees array for update request
    if (properties.employees) {
      if (properties.employees.length) {
        properties.responsibilities_attributes = properties.employees;
      }

      delete properties.employees;
    }

  }

  async archive() : Promise<void> {
    return await super.update({ archived : true });
  }

  async activate() : Promise<void> {
    return await super.update({ archived : false });
  }

  async getInvoices() : Promise<Invoice[]> {
    return await this._helper().invoices.getByCustomerId(this.id);
  }

  async update(properties: CustomerProperties) : Promise<void> {
    return await super.update(properties);
  }

  async addNotification(message: string) : Promise<void> {
    return await this._helper()[this._type()].addNotificationById(this.id, message);
  }
  
  async addFile(folderId: number, name: string, fileBuffer: Buffer, fileMetadata: { filename: string; contentType: string }, description?: string) : Promise<void> {
    return await this._helper()[this._type()].addFileById(this.id, folderId, name, fileBuffer, fileMetadata, description);
  }
}