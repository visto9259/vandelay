import {createSlice} from "@reduxjs/toolkit";
import {ApplicationService} from "../chorus/index.js";

const applicationService = new ApplicationService();

export const ApplicationSlice = createSlice({
  name: "ApplicationSlice",
  initialState: {
    loaded: false,
    applications: [],
  },
  reducers: {
    setLoaded: (state, action) => {
      state.loaded = action.payload;
    },
    setApplications: (state, action) => {
      state.applications = action.payload;
    },
  }
});

/**
 *
 * @param devices {string[]}
 * @return {function(*): *}
 */
export const getApplications = (devices = []) => {
  return (dispatch) => {
    dispatch(setLoaded(false));
    const apps = [];
    const promises = [];
    devices.forEach((device) => {
      promises.push(applicationService.getApplications(device).then(applications => {
        applications.forEach(application => {
          apps.push(application);
        })
      }));
    });
    return Promise.all(promises).then(() => {
      dispatch(setApplications(apps));
      dispatch(setLoaded(true));
    })
    /*
    return applicationService.getApplications().then(applications => {
      dispatch(setApplications(applications));
      dispatch(setLoaded(true));
    });

     */
  }
}

export const {
  setLoaded,
  setApplications,
} = ApplicationSlice.actions;
export default ApplicationSlice.reducer;