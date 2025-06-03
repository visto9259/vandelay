import {Device} from "./index.js";
import BaseService from "./BaseService.js";
import dayjs from "dayjs";

const baseService = new BaseService();
function DeviceService() {
  /**
   *
   * @return {Promise<array>}
   */
  this.getDevice = function (deviceId) {
    return baseService.get('/api/v1/devices/'+deviceId).then((response) => {
        if (response.ok) {
          if (response.status === 200) {
            return response.json().then(data => {
              const devices = [];
              data.forEach(d => {
                devices.push(new Device(d));
              })
              return devices;
            });
          }
        }
    }, (error) => {
      console.error(error);
    });
  }

  /**
   *
   * @return {Promise<Array | void>}
   */
  this.getDevices = function () {
    return baseService.get('/api/devices').then((response) => {
      return response.getData();
    }, (error) => {
      console.error(error);
    });
  }

  /**
   *
   * @param deviceId {string}
   * @return {Promise<Array>}
   */
  this.getTelemetry = function (deviceId) {
    return baseService.get(`/api/v1/devices/${deviceId}/telemetry`).then(response => {
      return response.getData();
    });
  }

  this.getForecast = function (deviceId) {
    return baseService.get(`/api/v1/devices/${deviceId}/forecast`).then( response => {
      return response.getData();
    });
  }

  this.getHistory = function (deviceId, options = {}) {
    const params = new URLSearchParams(options);
    params.append('fromDate', options.fromDate ?? dayjs().add(-1, 'hour').format('YYYY-MM-DDTHH:mm:ss.SSS[Z]'));
    params.append('toDate', options.toDate ?? dayjs().format('YYYY-MM-DDTHH:mm:ss.SSS[Z]'));
    if (options.pageSize) {
      params.append('pageSize', options.pageSize);
    }
    if (options.continuationToken) {
      params.append('continuationToken', options.continuationToken);
    }
    return baseService.get(`/api/v1/devices/${deviceId}/history/telemetry?`+params.toString()).then( response => {
      return response.getData();
    })
  }
}

export default DeviceService;
