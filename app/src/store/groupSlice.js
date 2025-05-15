import {createSlice} from "@reduxjs/toolkit";
import {GroupService} from "../chorus/index.js";

const groupService = new GroupService();

export const groupSlice = createSlice({
  name: "groupSlice",
  initialState: {
    loaded: false,
    groups: [],
  },
  reducers: {
    setLoaded: (state, action) => {
      state.loaded = action.payload;
    },
    setGroups: (state, action) => {
      state.groups = action.payload;
    }
  }
});

export const getGroups = () => {
  return (dispatch) => {
    dispatch(setLoaded(false));
    return groupService.getGroups().then((groups) => {
      dispatch(setGroups(groups.map((group) => group.serialize())));
      dispatch(setLoaded(true));
    })
  }
}

export const {setLoaded, setGroups} = groupSlice.actions;
export default groupSlice.reducer;