import {createSlice} from "@reduxjs/toolkit";
import {ManifestService} from "../chorus/index.js";

const manifestService = new ManifestService();

const chorusSlice = createSlice({
  name: "chorus",
  initialState: {
    loaded: false,
    manifest: null,
    applicationId: null,
  },
  reducers: {
    setManifest: (state, action) => {
      state.manifest = action.payload;
    },
    setLoaded: (state, action) => {
      state.loaded = action.payload;
    }
  }
});

export const getManifest = () => {
  return (dispatch) => {
    return manifestService.getManifest().then(manifest => {
      dispatch(setManifest(manifest));
      dispatch(setLoaded(true));
    });
  }

}

export const {
    setManifest,
    setLoaded,
} = chorusSlice.actions;
export default chorusSlice.reducer;
