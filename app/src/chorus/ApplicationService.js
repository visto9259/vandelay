import BaseService from "./BaseService.js";
import {Application, Control, Group} from "./index.js";
import Version from "./schema/Version.js";

const baseService = new BaseService();

export default function ApplicationService() {
  /**
   * @param deviceId {string|null}
   * @return {Promise<Application[]>}
   */
  this.getApplications = (deviceId = null) => {
    let url = '/api/applications';
    if (deviceId) {
      url += `?deviceId=${deviceId}`;
    }
    return baseService.get(url).then(response => {
      return response.getData();
    });
  }

  /**
   *
   * @param appId {string}
   * @return {Promise<Version[]>}
   */
  this.getVersions = (appId) => {
    return baseService.get(`/api/applications/${appId}/versions`).then(response => {
      const a = response.getData();
      return a.map((item) => {
        return new Version(item);
      })
    })
  }

  /**
   *
   * @param appId {string}
   * @param installationId {string}
   * @param params {URLSearchParams|n}
   * @return {Promise<Control[]>}
   */
  this.getControls = (appId, installationId, params = null) => {

    let url = `/api/controls/${appId}/installations/${installationId}`;
    if (params !== null) {
      url += `?${params.toString()}`;
    }
    return baseService.get(url).then(response => {
      const a = response.getData();
      return a.map((item) => {
        return new Control(item);
      })
    })
  }

  /**
   *
   * @param appId {string}
   * @param installationId {string}
   * @param state {string}
   */
  this.updateInstallationState = (appId, installationId, state) => {
    let url = `/api/v1/applications/${appId}/installations/${installationId}`;
    return baseService.patch(url, {state: state}).then(response => {
      return response.getData();
    }, (error) => {
      console.error('Failed to change state:');
    });
  }

  /**
   *
   *
   * @param appId {string}
   * @param installationId {string}
   * @param control {Object}
   */
  this.submitControl = (appId, installationId, control) => {
    const url = `/api/v1/applications/${appId}/installations/${installationId}/controls`;
    return baseService.post(url, control).then(response => {
      return response.getData();
    }, (error) => {
      console.error('Failed to submit control')
    })
  }

  this.submitEarnings = (appId, installationId, controlId, earnings) => {
    const url = `/api/v1/applications/${appId}/installations/${installationId}/controls/${controlId}/earnings`;
    return baseService.patch(url, earnings).then(response => {
      return response.getData();
    }, (error) => {
      console.error('Failed to submit earnings');
    })
  }

}