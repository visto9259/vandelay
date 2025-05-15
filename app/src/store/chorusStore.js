import {configureStore} from "@reduxjs/toolkit";
import deviceReducer  from "./deviceSlice.js";
import groupReducer  from "./groupSlice.js";
import applicationReducer from "./applicationSlice.js";

export default configureStore({
  reducer: {
    devices: deviceReducer,
    groups: groupReducer,
    applications: applicationReducer,
  }
});