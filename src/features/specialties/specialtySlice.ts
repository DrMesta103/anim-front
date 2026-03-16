import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Specialty, SpecialtyState } from "./types";
import { fetchAllSpecialtiesthunk } from "./hooks";

const initialState: SpecialtyState = {
  status: "idle",
  specialties: [],
};

const specialtySlice = createSlice({
  name: "specialty",
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(fetchAllSpecialtiesthunk.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllSpecialtiesthunk.fulfilled, (state, action: PayloadAction<Specialty[]>) => {
        state.status = "success";
        if (action.payload) {
          state.specialties = [...action.payload];
        }
      })
      .addCase(fetchAllSpecialtiesthunk.rejected, (state) => {
        state.status = "error";
      }),
});

export const {} = specialtySlice.actions;
export default specialtySlice.reducer;
