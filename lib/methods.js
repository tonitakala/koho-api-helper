'use strict';

const axios = require('axios');

module.exports = class Methods {
  constructor (helper, uri, resourceRef) {
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

  get _authParams() {
    return {
      company_id : this._helper.options.companyId,
      token : this._helper.options.token
    }
  }

  // Prefix post body with
  _generateProperties(properties) {
    const object = {}; object[this._type] = properties;

    return object;
  }

  async request(uri, method, data, params, options) {
    if ( ! uri) {
      throw new Error('Missing URI for request');
    }

    method = method || 'GET';
    data = data || {};

    return await axios.request({
      url    : `${this._helper.options.url}/${uri}`,

      method : method,
      data   : data,

      // concatenate auth params + original params
      params : { ...this._authParams, ...params },

      ...options
    });
  }

  async create(properties) {
    // may be needed later
    if (typeof this._validateProperties === 'function') {
      this._validateProperties(properties);
    }

    const result = await this.request(this._uri, 'POST', this._generateProperties(properties));
    const resultId = result.data.id;
    const resource = await this.getById(resultId);

    return resource;
  }

  async getAll() {
    const result = await this.request(this._uri);
    const resources = result.data.map(r => new this._resourceRef(r, this._helper));

    return resources;
  }

  async getById(resourceId) {
    const result = await this.request(`${this._uri}/${resourceId}`);

    return new this._resourceRef(result.data, this._helper);
  }

  async updateById(resourceId, properties) {
    if ( ! resourceId) {
      throw new Error(`Cannot update ${this._type}: No ${this._type}.id specified`);
    }

    const result = await this.request(`${this._uri}/${resourceId}`, 'PUT', this._generateProperties(properties));

    return;
  }

  async deleteById(resourceId) {
    if ( ! resourceId) {
      throw new Error(`Cannot delete ${this._type}: No ${this._type}.id specified`);
    }

    const result = await this.request(`${this._uri}/${resourceId}`, 'DELETE');

    return;
  }
}