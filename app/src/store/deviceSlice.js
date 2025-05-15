import {createSlice} from "@reduxjs/toolkit";
import {DeviceService, GroupService} from "../chorus/index.js";

const groupService = new GroupService();
const deviceService = new DeviceService();

export const deviceSlice = createSlice({
  name: "device",
  initialState: {
    loaded: false,
    devices: [],
  },
  reducers: {
    setLoaded: (state, action) => {
      state.loaded = action.payload;
    },
    setDevices: (state, action) => {
      state.devices = action.payload;
    },
    addDevices: (state, action) => {
      state.devices = [...state.devices, ...action.payload];
    },
    setDevice: (state, action) => {
      const {id} = action.payload;
      state.devices[id] = action.payload;
    }
  }
});

export const getDevices = () => {
  return (dispatch, getState) => {
    const groups = getState().groups.groups;
    dispatch(setLoaded(false));
    dispatch(setDevices([]));
    return deviceService.getDevices().then((devices) => {
      dispatch(setDevices(devices));
      dispatch(setLoaded(true));
    })
  }
}


export const {
  setLoaded,
  setDevices,
  addDevices,
} = deviceSlice.actions;
export default deviceSlice.reducer;