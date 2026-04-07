import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GroupOfDoctors, ScheduleState } from "./types";
import { fetchAllGroupsOfSpecialtiesThunk } from "./hooks";

const initialState: ScheduleState = {
  status: "idle",
  groups: [],
  search: "",
  selectedSpecialtyId: "",
};

const scheduleSlice = createSlice({
  name: "schedule",
  initialState,
  reducers: {
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
    setSelectedSpecialtyId: (state, action: PayloadAction<string>) => {
      state.selectedSpecialtyId = action.payload;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(fetchAllGroupsOfSpecialtiesThunk.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllGroupsOfSpecialtiesThunk.fulfilled, (state, action: PayloadAction<GroupOfDoctors[]>) => {
        state.status = "success";
        if (action.payload) {
          state.groups = [...action.payload];
        }
      })
      .addCase(fetchAllGroupsOfSpecialtiesThunk.rejected, (state) => {
        state.status = "error";
      }),
});

export const { setSearch, setSelectedSpecialtyId } = scheduleSlice.actions;
export default scheduleSlice.reducer;
