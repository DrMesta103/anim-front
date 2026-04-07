import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AdminState } from "./types";

const initialState: AdminState = {
  selectedTab: "patients",
  isNavbarOpen: false,
};

const secretaryPanelSlice = createSlice({
  name: "secretary",
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

export const { setSelectedTab, setNavbarOpen } = secretaryPanelSlice.actions;
export default secretaryPanelSlice.reducer;
