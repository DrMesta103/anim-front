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
    refreshData: (state) => {
      state.data = initialData;
    },
    refreshState: (state) => {
      state.data = initialData;
      state.mode = initialMode;
      state.doctors = [];
      state.status = "idle";
      state.search = "";
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
      .addCase(addDoctorThunk.pending, (state) => {
        state.status = "pending";
      })
      .addCase(addDoctorThunk.fulfilled, (state, action: PayloadAction<Doctor>) => {
        if (action.payload) {
          state.doctors.push(action.payload);
          state.mode = initialMode;
          state.data = initialData;
        }
      })
      .addCase(addDoctorThunk.rejected, (state) => {
        state.status = "error";
      })
      .addCase(updateDoctorThunk.pending, (state) => {
        state.status = "pending";
      })
      .addCase(updateDoctorThunk.fulfilled, (state, action: PayloadAction<Doctor>) => {
        if (action.payload) {
          state.doctors = state.doctors.map((doctor) => (doctor.id === action.payload.id ? action.payload : doctor));
          state.mode = initialMode;
          state.data = initialData;
        }
      })
      .addCase(updateDoctorThunk.rejected, (state) => {
        state.status = "error";
      })
      .addCase(deleteDoctorThunk.pending, (state) => {
        state.status = "pending";
      })
      .addCase(deleteDoctorThunk.fulfilled, (state, action: PayloadAction<any>) => {
        if (action.payload) {
          state.doctors = state.doctors.filter((d) => d.id !== action.payload);
          state.mode = initialMode;
          state.data = initialData;
        }
      })
      .addCase(deleteDoctorThunk.rejected, (state) => {
        state.status = "error";
      }),
});

export const { setSearch, setStatus, setMode, setData, resetDoctorForm, refreshData, refreshState } = doctorSlice.actions;
export default doctorSlice.reducer;
