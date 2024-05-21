import { createSlice } from "@reduxjs/toolkit";

// const initialState: any | null = null;

const initialState: any | null = {
  isOpen: false,
  content: null,
  isCheckOpen:false,
  checkContent:null,
};

const modalDataSlicer = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state, action) => {
      state.isOpen = true;
      state.content = action.payload;
    },
    openCheckModal: (state, action) => {
      state.isCheckOpen = true;
      state.checkContent = action.payload;
    },
    closeModal: (state) => {
      state.isOpen = false;
      state.content = null;
    },
    closeCheckModal: (state) => {
      state.isCheckOpen = false;
      state.checkContent = null;
    },
  },
});

export default modalDataSlicer.reducer;
export const { openModal, openCheckModal, closeModal, closeCheckModal } = modalDataSlicer.actions;
