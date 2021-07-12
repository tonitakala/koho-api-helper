import { KohoApiHelper } from '../index';
import { Methods } from '../methods';
import { Notification, NotificationProperties } from '../resources/notification.resource';

export class NotificationMethods extends Methods {
  constructor (helper: KohoApiHelper) {
    super(helper, 'notifications', Notification);
  }

  /**
   * Get all customer targeted notifications
   */
  async getAll(params: { start_date?: string; end_date?: string; [propName: string]: any; } = {}) : Promise<Notification[]> {
    
    // force object_type to Customer for backwards compatibility
    return await super.getAll({ ...params, object_type : 'Customer' });
  }

  /**
   * Get all offer targeted notifications (from different endpoint)
   */
  async getAllOfferNotifications(params: { start_date?: string; end_date?: string; [propName: string]: any; } = {}) : Promise<Notification[]> {
    // force object_type to NOffer for backwards compatibility
    return await super.getAll({ ...params, object_type : 'Offer' });
  }

  /**
   * Create customer targeted notification
   */
  async create(customerId: number, message: string) : Promise<void> {
    await this._helper().request(`${this._helper().options.url}/customers/${customerId}/notifications`, 'POST', this._generateProperties({ name: message }));

    return;
  }

  async updateById(id: number, properties: Partial<NotificationProperties>) : Promise<void> {
    return await super.updateById(id, properties);
  }

  async updateByCustomerAndNotificationId(customerId: number, notificationId: number, properties: Partial<NotificationProperties>) {
    await this._helper().request(`${this._helper().options.url}/customers/${customerId}/notifications`, 'PUT', {
      notification_id : notificationId,
      ...this._generateProperties(properties)
    });

    return;
  }

   async getById(id: number) : Promise<Notification> {
    const notifications = await this._helper().request(`${this._helper().options.url}/notifications`, 'GET', null, {
      notification_id : id
    });

    if ( ! notifications.length) {
      throw new Error(`Could not find notification with ID ${id}`)
    }

    return new Notification(notifications[0], this._helper());
  }
}