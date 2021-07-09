import { KohoApiHelper } from '../index';
import { Methods } from '../methods';
import { Notification, NotificationProperties } from '../resources/notification.resource';

export class NotificationMethods extends Methods {
  constructor (helper: KohoApiHelper) {
    super(helper, 'customers/notifications', Notification);
  }

  /**
   * Get all customer targeted notifications
   */
  async getAll(params: { start_date?: string; end_date?: string; [propName: string]: any; } = {}) : Promise<Notification[]> {
    return await super.getAll(params);
  }

  /**
   * Get all offer targeted notifications (from different endpoint)
   */
  async getAllOfferNotifications(params: { start_date?: string; end_date?: string; [propName: string]: any; } = {}) : Promise<Notification[]> {
    const result = await this.request('offers/notifications', 'GET', null, params);

    const resources = result.map((r: any) => new Notification(r, this._helper()));

    return resources;
  }

  /**
   * Create customer targeted notification
   */
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

  async updateByOfferAndNotificationId(offerId: number, notificationId: number, properties: Partial<NotificationProperties>) {
    await this._helper().request(`${this._helper().options.url}/offers/${offerId}/notifications`, 'PUT', {
      notification_id : notificationId,
      ...this._generateProperties(properties)
    });

    return;
  }

   async getById(id: number) : Promise<Notification> {
    const notifications = await this._helper().request(`${this._helper().options.url}/customers/notifications`, 'GET', null, {
      notification_id : id
    });

    if ( ! notifications.length) {
      throw new Error(`Could not find notification with ID ${id}`)
    }

    return new Notification(notifications[0], this._helper());
  }

  async getByIdOfferNotification(id: number) : Promise<Notification> {
    const notifications = await this._helper().request(`${this._helper().options.url}/offers/notifications`, 'GET', null, {
      notification_id : id
    });

    if ( ! notifications.length) {
      throw new Error(`Could not find notification with ID ${id}`)
    }

    return new Notification(notifications[0], this._helper());
  }
}