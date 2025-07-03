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

  this.getHistory = async function (deviceId, options = {}) {
    const params = new URLSearchParams();
    params.append('fromDate', options.fromDate ?? dayjs().add(-1, 'hour').format('YYYY-MM-DDTHH:mm:ss.SSS[Z]'));
    params.append('toDate', options.toDate ?? dayjs().format('YYYY-MM-DDTHH:mm:ss.SSS[Z]'));
    if (options.pageSize) {
      params.append('pageSize', options.pageSize);
    }
    if (options.continuationToken) {
      params.append('continuationToken', options.continuationToken);
    }
    const type = options.type ?? 'telemetry';
    let done = false;
    let responseData = [];
    while (! done) {
      const response = await baseService.get(`/api/v1/devices/${deviceId}/history/${type}?`+params.toString());
      responseData = [...responseData, ...response.getData()];
      if (response.getContinuationToken()) {
        params.append('continuationToken', response.getContinuationToken());
      } else {
        done = true;
      }
    }
    return responseData;
  }
}

export default DeviceService;
