import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AdminState } from "./types";

const initialState: AdminState = {
  selectedTab: "dashboard",
  isNavbarOpen: false,
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setSelectedTab: (state, action: PayloadAction<(typeof state)["selectedTab"]>) => {
      state.selectedTab = action.payload;
    },
    setNavbarOpen: (state, action: PayloadAction<boolean>) => {
      state.isNavbarOpen = action.payload;
    },
  },
});

export const { setSelectedTab, setNavbarOpen } = adminSlice.actions;
export default adminSlice.reducer;
