import {Device} from "./index.js";
import BaseService from "./BaseService.js";

const baseService = new BaseService();
function DeviceService() {
  /**
   *
   * @return {Promise<array>}
   */
  this.getDevice = function (deviceId) {
    return fetch('http://localhost:8081/api/v1/devices/'+deviceId, {
      withCredentials: true,
    }).then((response) => {
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
    return fetch('http://localhost:8081/api/devices', {
      withCredentials: true,
    }).then((response) => {
      if (response.ok) {
        if (response.status === 200) {
          return response.json();
        }
      }
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
}

export default DeviceService;