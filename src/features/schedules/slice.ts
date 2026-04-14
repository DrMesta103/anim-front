import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GroupOfDoctors, ScheduleState } from "./types";
import { fetchAllGroupsOfSpecialtiesThunk, fetchSelectedDoctorThunk } from "./hooks";
import { Doctor } from "../doctors/types";

const initialState: ScheduleState = {
  status: "idle",
  groups: [],
  search: "",
  selectedSpecialtyId: "",
  selectedDoctor: null,
  doctorSchedules: [],
  schedulePage: 0,
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
    setSelectedDoctor: (state, action: PayloadAction<Doctor | null>) => {
      state.selectedDoctor = action.payload;
    },
    setSchedulePage: (state, action: PayloadAction<number>) => {
      state.schedulePage = action.payload;
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
      })
      .addCase(fetchSelectedDoctorThunk.pending, (state) => {
        state.status = "pending";
      })
      .addCase(fetchSelectedDoctorThunk.fulfilled, (state, action: PayloadAction<Doctor>) => {
        state.status = "success";
        if (action.payload) {
          state.selectedDoctor = action.payload;
        }
      })
      .addCase(fetchSelectedDoctorThunk.rejected, (state) => {
        state.status = "error";
      }),
});

export const { setSearch, setSelectedSpecialtyId, setSelectedDoctor, setSchedulePage } = scheduleSlice.actions;
export default scheduleSlice.reducer;
