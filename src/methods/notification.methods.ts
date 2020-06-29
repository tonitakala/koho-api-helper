import { KohoApiHelper } from '../index';
import { Methods } from '../methods';
import { Notification } from '../resources/notification.resource';
import { NotificationProperties } from '../property-definitions';

export class NotificationMethods extends Methods {
  constructor (helper: KohoApiHelper) {
    super(helper, 'customers/notifications', Notification);
  }

  _validateProperties(properties: NotificationProperties) {

  }

  async getAll(params: { start_date?: string; end_date?: string; [propName: string]: any; } = {}) : Promise<Notification[]> {
    return await super.getAll(params);
  }

  async create(customerId: number, message: string) : Promise<void> {
    await this._helper.request(`${this._helper.options.url}/customers/${customerId}/notifications`, 'POST', this._generateProperties({ name: message }));

    return;
  }
}