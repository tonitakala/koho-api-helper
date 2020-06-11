import { KohoApiHelper } from './index'

export class Methods {
  [x: string]: any;
  _helper: KohoApiHelper;
  _uri: string;
  private _type: string;
  private _resourceRef: any;

  constructor (helper: KohoApiHelper, uri: string, resourceRef: any) {
    if (!helper || typeof helper !== 'object') {
      throw new Error('Incorrect or missing helper in resource initialization');
    }

    if (!uri || typeof uri !== 'string') {
      throw new Error('Incorrect or missing type in resource initialization');
    }

    if (!resourceRef || typeof resourceRef !== 'function') {
      throw new Error('Incorrect or missing ResourceReference in resource initialization');
    }

    this._helper = helper;
    this._uri = uri;

    // work_session/assignments = assignment || contracts = contract
    this._type = (uri.indexOf('/') === -1) ? uri.slice(0, -1) : uri.substring(uri.indexOf('/') + 1).slice(0, -1);

    this._resourceRef = resourceRef;
  }

  // Prefix post body with object type
  private _generateProperties(properties: any) {
    const object : any = {}; object[this._type] = properties;

    return object;
  }

  async request(uri: string, method?: string, data?: any, params?: any, options?: any) {
    return await this._helper.request(`${this._helper.options.url}/${uri}`, method, data, params, options);
  }

  async create(properties: any, ...args: any) {
    // may be needed later
    if (typeof this._validateProperties === 'function') {
      this._validateProperties(properties);
    }

    const result = await this.request(this._uri, 'POST', this._generateProperties(properties));
    const resultId = result.data.id;
    const resource = await this.getById(resultId);

    return resource;
  }

  async getAll(params: object = {}) {
    const result = await this.request(this._uri, 'GET', null, params);
    const resources = result.data.map((r: any) => new this._resourceRef(r, this._helper));

    return resources;
  }

  async getById(resourceId: number) {
    const result = await this.request(`${this._uri}/${resourceId}`);

    return new this._resourceRef(result.data, this._helper);
  }

  async updateById(resourceId: number, properties: any) {
    if ( ! resourceId) {
      throw new Error(`Cannot update ${this._type}: No ${this._type}.id specified`);
    }

    const result = await this.request(`${this._uri}/${resourceId}`, 'PUT', this._generateProperties(properties));

    return;
  }

  async deleteById(resourceId: number) {
    if ( ! resourceId) {
      throw new Error(`Cannot delete ${this._type}: No ${this._type}.id specified`);
    }

    const result = await this.request(`${this._uri}/${resourceId}`, 'DELETE');

    return;
  }
}