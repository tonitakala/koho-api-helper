import { settings } from 'cluster';
import { KohoApiHelper } from '../index';
import { Methods } from '../methods';
import { CustomReport } from '../resources/custom-report.resource';

export class CustomReportMethods extends Methods {
  constructor (helper: KohoApiHelper) {
    super(helper, 'report/custom', CustomReport);
  }

  /**
   * Suggested `params`:
   * @param settings.term_start date starting from (YYYY-MM-DD)
   * @param settings.term_end date ending to YYYY-MM-DD
   */

  async getById(id: number, params?: { settings?: { term_start?: string; term_end?: string;} }) : Promise<any> {
    const constructedParams : { [propName: string]: string | number | undefined; } = {};

    if (params?.settings) {
      for (const [key, value] of Object.entries(params.settings)) {
        constructedParams[`settings[${key}]`] = value;
      }
    }

    return await this.request(`${this._uri}/${id}`, 'GET', null, constructedParams);
  }
}