import { KohoApiHelper } from '../index';
import { Methods } from '../methods';
import { Notification, NotificationProperties } from '../resources/notification.resource';

export class NotificationMethods extends Methods {
  constructor (helper: KohoApiHelper) {
    super(helper, 'customers/notifications', Notification);
  }

  async getAll(params: { start_date?: string; end_date?: string; [propName: string]: any; } = {}) : Promise<Notification[]> {
    return await super.getAll(params);
  }

  async create(customerId: number, message: string) : Promise<void> {
    await this._helper().request(`${this._helper().options.url}/customers/${customerId}/notifications`, 'POST', this._generateProperties({ name: message }));

    return;
  }

  /**
   * Not supported for notifications - use updateByCustomerId instead
   */
  async updateById(id: number, properties: Partial<NotificationProperties>) : Promise<void> {
    throw new Error(`updateById method not supported for notifications`);
  }

  async updateByCustomerAndNotificationId(customerId: number, notificationId: number, properties: Partial<NotificationProperties>) {
    await this._helper().request(`${this._helper().options.url}/customers/${customerId}/notifications`, 'PUT', {
      notification_id : notificationId,
      ...this._generateProperties(properties)
    });

    return;
  }

  /**
   * Not supported for notifications - use getByCustomerAndNotificationId instead
   */
   async getById(id: number) : Promise<void> {
    throw new Error(`getById method not supported for notifications`);
  }

  async getByCustomerAndNotificationId(customerId: number, notificationId: number) : Promise<Notification> {
    return await this._helper().request(`${this._helper().options.url}/customers/${customerId}/notifications?notification_id=${notificationId}`);
  }
}