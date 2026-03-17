import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Doctor, DoctorDataType, DoctorState } from "./types";
import { fetchAllDoctorsthunk, addDoctorThunk, updateDoctorThunk, deleteDoctorThunk } from "./hooks";
import StatusType from "@/shared/types/status.type";
import { convertToEnglishDigits } from "@/shared/lib/persianToEnglish";
import { initialMode } from "@/shared/constants/mode.constant";
import ModeType from "@/shared/types/mode.type";

const initialData: DoctorDataType = {
  firstname: "",
  lastname: "",
  medicalCode: "",
  password: "",
  phone: "",
  username: "",
  specialtyId: "",
};

const initialState: DoctorState = {
  status: "idle",
  doctors: [],
  search: "",
  mode: initialMode,
  data: initialData,
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
    setMode: (state, action: PayloadAction<ModeType>) => {
      state.mode = action.payload;
    },
    setData: (state, action: PayloadAction<Partial<DoctorDataType>>) => {
      state.data = { ...state.data, ...action.payload };
    },
    resetDoctorForm: (state) => {
      state.mode = initialMode;
      state.data = initialData;
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
      })
      .addCase(addDoctorThunk.fulfilled, (state) => {
        state.mode = initialMode;
        state.data = initialData;
      })
      .addCase(updateDoctorThunk.fulfilled, (state) => {
        state.mode = initialMode;
        state.data = initialData;
      })
      .addCase(deleteDoctorThunk.fulfilled, (state) => {
        state.mode = initialMode;
        state.data = initialData;
      }),
});

export const { setSearch, setStatus, setMode, setData, resetDoctorForm } = doctorSlice.actions;
export default doctorSlice.reducer;
