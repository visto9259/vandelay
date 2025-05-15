function DeviceStatus(data) {
  this.status = data.status;
  this.updateDate = data.updateDate;
  this.getStatus = () => this.status;
  this.getUpdateDate = () => this.updateDate;

  this.serialize = () => {
    return {
      status: this.status,
      updateDate: this.updateDate
    }
  }
}

export default DeviceStatus;