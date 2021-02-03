import { KohoApiHelper } from '../index';
import { Resource } from '../resource';

export interface CustomReportProperties {
  [propName: string]: any;
}

export class CustomReport extends Resource {
  constructor (properties: CustomReportProperties, helper: KohoApiHelper) {
    super(properties, helper, 'customReport');
  }
}