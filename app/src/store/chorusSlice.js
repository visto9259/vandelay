import {createSlice} from "@reduxjs/toolkit";
import {ManifestService} from "../chorus/index.js";

const manifestService = new ManifestService();

const chorusSlice = createSlice({
  name: "chorus",
  initialState: {
    loading: false,
    manifest: null,
  },
  reducers: {
    setManifest: (state, action) => {
      state.manifest = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    }
  }
});

export const getManifest = () => {
  return (dispatch) => {
    dispatch(setLoading(true));
    return manifestService.getManifest().then(manifest => {
      dispatch(setManifest(manifest));
      dispatch(setLoading(false));
    });
  }

}

export const {
    setManifest,
    setLoading,
} = chorusSlice.actions;
export default chorusSlice.reducer;
