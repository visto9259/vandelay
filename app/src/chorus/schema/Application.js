import Version from "./Version.js";
import Installation from "./Installation.js";

export default function (data) {
  this.id = data.id;
  this.category = data.category;
  this.appType = data.appType;
  this.versions = (data.versions && data.versions instanceof Array) ?
    data.versions.map((item) => new Version(item)) : [];
  this.installations = (data.installations  && data.installations instanceof Array) ?
    data.installations.map((item) => new Installation(item)) : [];
  this.serialize = function () {
    return {
      id: this.id,
      category: this.category,
      appType : this.appType,
      versions : this.versions.map((item) => item.serialize()),
    }
  }
  this.getId = () => this.id;
  this.getCategory = () => this.category;
  this.getAppType = () => this.appType;
  this.getVersions = () => this.versions;
  this.getInstallations = () => this.installations;
}