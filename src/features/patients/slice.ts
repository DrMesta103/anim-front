import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchPatientsThunk, fetchMorePatientsThunk, createPatientThunk, updatePatientThunk, deletePatientThunk } from "./hooks";
import { Patient, PatientDataType, PatientState, FetchPatientsResponse } from "./types";
import ModeType from "@/shared/types/mode.type";
import StatusType from "@/shared/types/status.type";
import { initialMode } from "@/shared/constants/mode.constant";
import { convertToEnglishDigits } from "@/shared/lib/persianToEnglish";

const initialData: PatientDataType = {
  firstname: "",
  lastname: "",
  nationalCode: "",
  phone: "",
  email: "",
  gender: "male",
  dateOfBirth: "",
  address: "",
};

const initialState: PatientState = {
  status: "idle",
  patients: [],
  search: "",
  data: initialData,
  mode: initialMode,
  page: 1,
  hasMore: true,
};

const patientSlice = createSlice({
  name: "patient",
  initialState,
  reducers: {
    setStatus: (state, action: PayloadAction<StatusType>) => {
      state.status = action.payload;
    },
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = convertToEnglishDigits(action.payload);
      state.patients = [];
      state.page = 1;
      state.hasMore = true;
    },
    setMode: (state, action: PayloadAction<ModeType>) => {
      state.mode = action.payload;
    },
    setData: (state, action: PayloadAction<Partial<PatientDataType>>) => {
      state.data = { ...state.data, ...action.payload };
    },
    refreshData: (state) => {
      state.data = initialData;
    },
    refreshState: () => initialState,
  },

  extraReducers: (builder) =>
    builder
      // fetch (replace)
      .addCase(fetchPatientsThunk.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPatientsThunk.fulfilled, (state, action: PayloadAction<FetchPatientsResponse | false>) => {
        state.status = "success";
        if (!action.payload) return;
        state.patients = [...action.payload.data];
        state.hasMore = action.payload.hasMore;
        state.page = 1;
      })
      .addCase(fetchPatientsThunk.rejected, (state) => {
        state.status = "error";
      })

      // fetchMore (append)
      .addCase(fetchMorePatientsThunk.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMorePatientsThunk.fulfilled, (state, action: PayloadAction<FetchPatientsResponse | false>) => {
        state.status = "success";
        if (!action.payload) return;
        state.patients = [...state.patients, ...action.payload.data];
        state.hasMore = action.payload.hasMore;
        if (action.payload.hasMore) state.page += 1;
      })
      .addCase(fetchMorePatientsThunk.rejected, (state) => {
        state.status = "error";
      })

      // create
      .addCase(createPatientThunk.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createPatientThunk.fulfilled, (state, action: PayloadAction<Patient | false>) => {
        state.status = "success";
        if (!action.payload) return;
        state.patients = [action.payload, ...state.patients];
        state.data = initialData;
        state.mode = initialMode;
      })
      .addCase(createPatientThunk.rejected, (state) => {
        state.status = "error";
      })

      // update
      .addCase(updatePatientThunk.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updatePatientThunk.fulfilled, (state, action: PayloadAction<Patient | false>) => {
        state.status = "success";
        if (!action.payload) return;
        state.patients = state.patients.map((p) => (p.id === (action.payload as Patient).id ? (action.payload as Patient) : p));
        state.data = initialData;
        state.mode = initialMode;
      })
      .addCase(updatePatientThunk.rejected, (state) => {
        state.status = "error";
      })

      // delete
      .addCase(deletePatientThunk.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deletePatientThunk.fulfilled, (state, action: PayloadAction<string | false>) => {
        state.status = "success";
        if (!action.payload) return;
        state.patients = state.patients.filter((p) => p.id !== action.payload);
        state.data = initialData;
        state.mode = initialMode;
      })
      .addCase(deletePatientThunk.rejected, (state) => {
        state.status = "error";
      }),
});

export const { setMode, setStatus, setSearch, setData, refreshData, refreshState } = patientSlice.actions;

export default patientSlice.reducer;
