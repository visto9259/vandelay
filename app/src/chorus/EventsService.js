import BaseService from "./BaseService.js";
import {ControlEvent} from "./index.js";

const baseService = new BaseService();

export default function EventsService() {
  this.getEvents = function() {
    return baseService.get('/api/events').then(response => {
      const a = response.getData();
      return a.map((item) => {
        return new ControlEvent(item);
      });
    });
  }
  this.clearEvents = function() {
    return baseService.post('/api/events/clear').then(response => {
      return response.getData();
    });
  }
}

