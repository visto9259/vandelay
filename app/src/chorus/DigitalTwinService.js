import BaseService from "./BaseService.js";

const baseService = new BaseService();
function DigitalTwinService() {
    /**
     *
     * @param deviceId{string}
     * @returns {Promise<array>}
     */
    this.getDigitalTwinState = function (deviceId) {
        return baseService.get(`/api/v1/digitaltwin/${deviceId}/state`).then(response => {
            return response.getData();
        });
    }

    this.updateDigitalTwinState = function (deviceId, state) {
        return baseService.patch(`/api/v1/digitaltwin/${deviceId}/state`, state).then(response => {
            return response.getData();
        });
    }
}

export default DigitalTwinService;
