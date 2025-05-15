import {Device, Group} from "./index.js";
import BaseService from "./BaseService.js";
const baseService = new BaseService();

function GroupService() {
  /**
   *
   * @return {Promise<Group[]>}
   */
  this.getGroups = function (): Promise<Group[]> {
    return baseService.get('/api/v1/groups').then(response => {
      const a = response.getData();
      return a.map((item) => {
        return new Group(item);
      });
    });
  }

  /**
   *
   * @param groupId {string}
   * @return {Promise<Device[]>}
   */
  this.getDevices = function (groupId: string): Promise<Device[]> {
    return baseService.get(`/api/v1/groups/${groupId}/devices`).then(response => {
      const a = response.getData();
      return a.map((item) => {
        return new Device(item);
      });
    });
  }
}

export default GroupService;