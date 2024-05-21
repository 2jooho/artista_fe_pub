import { createSlice } from "@reduxjs/toolkit";
import { UserDataForm } from "../../types/user";

// const initialState: any | null = null;

const initialState: any | null = {
  userId: null,
  nickname: null,
  profileUrl: null,
  instaId: null,
  isStar:null,
  accessToken: null,
  refreshToken: null,
};

const userDataSlicer = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserData: (state, action) => {
      state.userId = action.payload.userId;
      state.nickname = action.payload.nickname;
      state.profileUrl = action.payload.profileUrl;
      state.instaId = action.payload.instaId;
      state.isStar = action.payload.isStar;
      //   state.userData = action.payload;
    },
    setToken: (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    },
    removeUserData: (state) => {
      return initialState;
    },
  },
});

export default userDataSlicer.reducer;
export const { setUserData, setToken, removeUserData } = userDataSlicer.actions;
