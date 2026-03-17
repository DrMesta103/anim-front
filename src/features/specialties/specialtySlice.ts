import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Specialty, SpecialtyState } from "./types";
import { fetchAllSpecialtiesthunk } from "./hooks";
import StatusType from "@/shared/types/status.type";
import { convertToEnglishDigits } from "@/shared/lib/persianToEnglish";

const initialState: SpecialtyState = {
  status: "idle",
  specialties: [],
  search: "",
};

const specialtySlice = createSlice({
  name: "specialty",
  initialState,
  reducers: {
    setStatus: (state, action: PayloadAction<StatusType>) => {
      state.status = action.payload;
    },
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = convertToEnglishDigits(action.payload);
    },
  },
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

export const { setSearch, setStatus } = specialtySlice.actions;
export default specialtySlice.reducer;
