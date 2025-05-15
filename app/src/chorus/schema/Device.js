import DeviceStatus from "./DeviceStatus.js";


function Device(data) {
  this.id = data.id;
  this.serialNumber = data.serialNumber;
  this.status = new DeviceStatus(data.status);
  this.getId = () => this.id;
  this.getStatus = () => this.status;
  this.getSerialNumber = () => this.serialNumber;
  this.bootDate = data.bootDate;
  this.color = data.color;
  this.model = data.model;

  this.serialize = () => {
    return {
      status: this.status.serialize(),
      id: this.id,
      serialNumber: this.serialNumber
    }
  }
}
export default Device;