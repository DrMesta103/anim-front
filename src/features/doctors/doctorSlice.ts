import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Doctor, DoctorState } from "./types";
import { fetchAllDoctorsthunk } from "./hooks";
import StatusType from "@/shared/types/status.type";
import { convertToEnglishDigits } from "@/shared/lib/persianToEnglish";

const initialState: DoctorState = {
  status: "idle",
  doctors: [],
  search: "",
};

const doctorSlice = createSlice({
  name: "doctor",
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
      .addCase(fetchAllDoctorsthunk.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllDoctorsthunk.fulfilled, (state, action: PayloadAction<Doctor[]>) => {
        state.status = "success";
        if (action.payload) {
          state.doctors = [...action.payload];
        }
      })
      .addCase(fetchAllDoctorsthunk.rejected, (state) => {
        state.status = "error";
      }),
});

export const { setSearch, setStatus } = doctorSlice.actions;
export default doctorSlice.reducer;
