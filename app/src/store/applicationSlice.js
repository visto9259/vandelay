import {createSlice} from "@reduxjs/toolkit";
import {ApplicationService} from "../chorus/index.js";

const applicationService = new ApplicationService();

export const ApplicationSlice = createSlice({
  name: "ApplicationSlice",
  initialState: {
    isLoading: false,
    loaded: false,
    applications: [],
  },
  reducers: {
    setIsLoading: (state, action) => {
        state.isLoading = action.payload;
    },
    setLoaded: (state, action) => {
      state.loaded = action.payload;
    },
    setApplications: (state, action) => {
      state.applications = action.payload;
    },
    updateInstallation: (state, action) => {
        const updatedInstallation = action.payload;

        state.applications = state.applications.map((application) => {
            if (application.id !== updatedInstallation.appId) {
                return application;
            }
            return  {
                ...application,
                installations: application.installations.map((installation) => {
                    if (installation.id !== updatedInstallation.id) {
                        return {...installation};
                    }
                    return updatedInstallation;
                }),
            };
        });
    }
  }
});

/**
 *
 * @param applicationId {string}
 * @return {function(*): *}
 */
export const getApplications = (applicationId) => {
  return (dispatch) => {
    dispatch(setLoaded(false));
    dispatch(setIsLoading(true));
    const apps = [];
    const promises = [];
    promises.push(applicationService.getApplications(applicationId).then(applications => {
      applications.forEach(application => {
        apps.push(application);
      })
    }));
    /*
    devices.forEach((device) => {
      promises.push(applicationService.getApplications(device).then(applications => {
        applications.forEach(application => {
          apps.push(application);
        })
      }));
    });

     */
    return Promise.all(promises).then(() => {
      dispatch(setApplications(apps));
      dispatch(setLoaded(true));
      dispatch(setIsLoading(false));
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
  updateInstallation,
  setIsLoading,
} = ApplicationSlice.actions;
export default ApplicationSlice.reducer;
