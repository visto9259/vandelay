export default function (data) {
  this.appName = data.appName;
  this.latest = data.latest;
  this.id = data.id;
  this.release = data.release;
  this.status = data.status;
  this.version = data.version;
  this.getId = () => this.id;
  this.getAppName = () => this.appName;
  this.getRelease = () => this.release;
  this.getVersion = () => this.version;
  this.getLatest = () => this.latest;
  this.getRelease = () => this.release;
  this.serialize = () => {
    return {
      id: this.id,
      appName: this.appName,
      latest: this.latest,
      release: this.release,
      version: this.version,
      status: this.status,
    }
  }
}