import { createSlice } from "@reduxjs/toolkit";

// const initialState: any | null = null;

const initialState: any | null = {
  name: null,
  birth: null,
  phone: null,
};

const signUpDataSlicer = createSlice({
  name: "signUp",
  initialState,
  reducers: {
    setSignUpData: (state, action) => {
      state.name = action.payload.name;
      state.birth = action.payload.birth;
      state.phone = action.payload.phone;
    },
    removeSignUpData: (state) => {
      state.name = null;
      state.birth = null;
      state.phone = null;
    },
  },
});

export default signUpDataSlicer.reducer;
export const { setSignUpData, removeSignUpData } = signUpDataSlicer.actions;
