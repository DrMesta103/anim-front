import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AdminState } from "./types";

const initialState: AdminState = {
  selectedTab: "dashboard",
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setSelectedTab: (state, action: PayloadAction<(typeof state)["selectedTab"]>) => {
      state.selectedTab = action.payload;
    },
  },
});

export const { setSelectedTab } = adminSlice.actions;
export default adminSlice.reducer;
