import { NotificationProperties } from "../property-definitions";
import { KohoApiHelper } from "..";
import { Resource } from '../resource'; 

export class Notification extends Resource {
  constructor (properties: NotificationProperties, helper: KohoApiHelper) {
    super(properties, helper, 'customers/notifications');
  }
}