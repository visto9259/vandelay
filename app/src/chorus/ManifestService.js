import BaseService from "./BaseService.js";
import {data} from "react-router";

const baseService = new BaseService();

export function ManifestService() {
    this.manifest = null;
    this.getManifest = async () => {
        if (this.manifest === null) {
            const response = await baseService.get('/api/manifest');
            const data = response.getData();
            this.manifest = data;
        }
        return this.manifest;
    }
}
