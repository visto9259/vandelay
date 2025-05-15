import Configuration from "./Configuration.js";

export default function Installation(data) {
  this.appId = data.appId;
  this.deviceId = data.deviceId;
  this.id = data.id;
  this.installDate = data.installDate;
  this.status = data.status;
  this.uninstallDate = data.uninstallDate;
  this.version = data.version;
  this.versionId = data.versionId;
  this.configuration = data.configuration ? new Configuration(data.configuration) : null;
}