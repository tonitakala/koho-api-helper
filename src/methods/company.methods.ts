import { KohoApiHelper } from '../index';
import { Methods } from '../methods';
import { Company, CompanyProperties } from '../resources/company.resource';

export class CompanyMethods extends Methods {
  constructor (helper: KohoApiHelper) {
    super(helper, 'companies', Company, 'company');
  }

  async getAll(params: { [propName: string]: any; } = {}) : Promise<Company[]> {
    return await super.getAll(params);
  }

  /**
   * Update company settings, be careful with this one
   */
  async updateSettingsById(companyId: number, settings: any) : Promise<void> {
    const _settings = { ...settings };
    
    // Custom attributes need to be saved as string
    if (_settings.custom_attributes && typeof _settings.custom_attributes !== 'string') {
      _settings.custom_attributes = JSON.stringify(_settings.custom_attributes, null, 2);
    }

    await this._helper().request(`${this._helper().options.url}/settings`, 'POST', { settings : _settings });

    return;
  }
}