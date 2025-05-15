import {TransactionDefinitionApiModelResponseModel} from "./index.js";
import {data} from "react-router";
import {isDev} from "../helpers/index.js";

function BaseService() {
//  this.baseUrl = 'http://localhost:8081/api/v1';
  this.baseUrl = isDev() ? 'http://localhost:8081' : '/';

  /**
   *
   * @param url {string}
   * @return {Promise<TransactionDefinitionApiModelResponseModel>}
   */
  this.get = (url) => {
    return fetch(this.baseUrl+url, {
      method: 'GET',
      withCredentials: true,
    }).then((response) => {
      if (response.ok) {
        if (response.status === 200) {
          return response.json().then(data => {
            if (response.headers['x-ms-continuation-token']) {
              data['continuationToken'] = response.headers['x-ms-continuation-token'];
            }
            return new TransactionDefinitionApiModelResponseModel(data);
          });
        } else {
          return response.json().then(data => {
            return Promise.reject(new TransactionDefinitionApiModelResponseModel(data));
          });
        }
      }
    }, (reason) => {
      console.log(reason);
    });
  }

  /**
   *
   * @param url {string}
   * @param data {Object}
   * @return {Promise<TransactionDefinitionApiModelResponseModel>}
   */
  this.post = (url, data = null) => {
    return fetch(this.baseUrl+url, {
      method: 'POST',
//      credentials: 'include',
      withCredentials: true,
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((response) => {
      if (response.ok) {
        if (response.status === 200) {
          return response.json().then(data => {
            if (response.headers['x-ms-continuation-token']) {
              data['continuationToken'] = response.headers['x-ms-continuation-token'];
            }
            return new TransactionDefinitionApiModelResponseModel(data);
          });
        } else {
          return response.json().then(data => {
            return Promise.reject(new TransactionDefinitionApiModelResponseModel(data));
          });
        }
      }
    }, (reason) => {
      console.log(reason);
    });
  }

  /**
   *
   * @param url {string}
   * @param data {Object}
   * @return {Promise<TransactionDefinitionApiModelResponseModel>}
   */
  this.patch = (url, data = null) => {
    return fetch(this.baseUrl+url, {
      method: 'PATCH',
      credentials: 'include',
      withCredentials: true,
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((response) => {
      if (response.ok) {
        if (response.status === 200) {
          return response.json().then(data => {
            return new TransactionDefinitionApiModelResponseModel(data);
          });
        } else {
          return response.json().then(data => {
            return Promise.reject(new TransactionDefinitionApiModelResponseModel(data));
          });
        }
      }
    }, (reason) => {
      console.log(reason);
    });
  }
}

export default BaseService;