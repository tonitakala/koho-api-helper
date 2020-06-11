import { KohoApiHelper } from '../index';
import { Methods } from '../methods';
import { Contract } from '../resources/contract.resource';
import { ContractProperties } from '../property-definitions';

export class ContractMethods extends Methods {
  constructor (helper: KohoApiHelper) {
    super(helper, 'contracts', Contract);
  }

  async getAll(params: object = {}) : Promise<Contract[]> {
    return await super.getAll(params);
  }

  async getById(id: number) : Promise<Contract> {
    return await super.getById(id);
  }

  async updateById(id: number, properties: ContractProperties) : Promise<void> {
    return await super.updateById(id, properties);
  }

  async deleteById(id: number) : Promise<void> {
    return await super.deleteById(id);
  }

  async create(properties: ContractProperties) : Promise<Contract> {
    return await super.create(properties);
  }

}