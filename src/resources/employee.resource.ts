import { KohoApiHelper } from '../index';
import { EmployeeProperties, EmployeeGroupProperties, ContractProperties } from "../property-definitions";
import { Resource } from '../resource';

/**
 * @constructor
 * @name Employee
 * @param {EmployeeProperties} properties
 * @param {KohoApiHelper} helper
 */

export class Employee extends Resource {
  constructor (properties: EmployeeProperties, helper: KohoApiHelper) {
    super(properties, helper, 'employees');

    // Populate groups array with group id and name
    this.groups = [];

    for (let i = 0; i < this.group_ids.length; i++) {
      this.groups.push({
        id : this.group_ids[i],
        name : this.group_names[i]
      });
    }

    // Delete original group_ids and group_names parameters that come from api
    delete this.group_ids;
    delete this.group_names;
  }

  _updateInterceptor(properties: EmployeeProperties) {
    // Update groups by ids, not group object
    if (properties.groups !== undefined) {
      properties.group_ids = properties.groups.map((group: any) => group.id);

      delete properties.groups;
    }

    // Update user profile by profile id
    if (properties.profile_template_id !== undefined) {
      properties.set_profile_id = properties.profile_template_id;
    }

    delete properties.profile_name;
    delete properties.profile_template_id;

    // If ID is set we override target number with the id
    if (properties.accounting_target_id === undefined) {

      // Target number is not removed if number is null, therefore set id to null if we want to remove it
      if (properties.accounting_target_number === null) {
        delete properties.accounting_target_id;
      } else {
        properties.set_accounting_target_number = properties.accounting_target_number;
      }
    }

    // Setters not available in Koho API
    // properties.set_accounting_target_2_number = properties.accounting_target_2_number;
    // properties.set_accounting_target_3_number = properties.accounting_target_3_number;
    // properties.set_accounting_target_4_number = properties.accounting_target_4_number;

    // Cannot be sent with update request
    delete properties.accounting_target_number;
    delete properties.accounting_target_2_number;
    delete properties.accounting_target_3_number;
    delete properties.accounting_target_4_number;
  }

  async archive() : Promise<void> {
    return await super.update({ active : false });
  }

  async activate() : Promise<void> {
    return await super.update({ active : true });
  }

  async update(properties: ContractProperties) : Promise<void> {
    return await super.update(properties);
  }
  
}