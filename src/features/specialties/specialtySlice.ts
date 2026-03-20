import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Specialty, SpecialtyState } from "./types";
import { fetchAllSpecialtiesthunk, createSpecialtyThunk, updateSpecialtyThunk, deleteSpecialtyThunk } from "./hooks";
import StatusType from "@/shared/types/status.type";
import { convertToEnglishDigits } from "@/shared/lib/persianToEnglish";
import { initialMode } from "@/shared/constants/mode.constant";
import ModeType from "@/shared/types/mode.type";

const initialData: (typeof initialState)["data"] = {
  title: "",
  description: "",
  specialtyCode: "",
};

const initialState: SpecialtyState = {
  status: "idle",
  specialties: [],
  search: "",
  data: initialData,
  mode: initialMode,
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
    setMode: (state, action: PayloadAction<ModeType>) => {
      state.mode = action.payload;
    },
    setTitle: (state, action: PayloadAction<string>) => {
      state.data.title = convertToEnglishDigits(action.payload);
    },
    setDescription: (state, action: PayloadAction<string>) => {
      state.data.description = convertToEnglishDigits(action.payload);
    },
    setSpecialtyCode: (state, action: PayloadAction<string>) => {
      state.data.specialtyCode = convertToEnglishDigits(action.payload);
    },
    refreshData: (state) => {
      state.data = initialData;
    },
    refreshState: (state) => {
      state.data = initialData;
      state.mode = initialMode;
      state.specialties = [];
      state.status = "idle";
      state.search = "";
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
      })

      .addCase(createSpecialtyThunk.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createSpecialtyThunk.fulfilled, (state, action: PayloadAction<Specialty>) => {
        state.status = "success";
        if (action.payload) {
          state.specialties = [...state.specialties, action.payload];
          state.data = initialData;
          state.mode = initialMode;
        }
      })
      .addCase(createSpecialtyThunk.rejected, (state) => {
        state.status = "error";
      })

      .addCase(updateSpecialtyThunk.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateSpecialtyThunk.fulfilled, (state, action: PayloadAction<Specialty>) => {
        state.status = "success";
        if (action.payload) {
          state.specialties = state.specialties.map((specialty) => (specialty.id === action.payload.id ? action.payload : specialty));
          state.data = initialData;
          state.mode = initialMode;
        }
      })
      .addCase(updateSpecialtyThunk.rejected, (state) => {
        state.status = "error";
      })

      .addCase(deleteSpecialtyThunk.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteSpecialtyThunk.fulfilled, (state, action: PayloadAction<string>) => {
        state.status = "success";
        if (action.payload) {
          state.specialties = state.specialties.filter((specialty) => specialty.id !== action.payload);
          state.data = initialData;
          state.mode = initialMode;
        }
      })
      .addCase(deleteSpecialtyThunk.rejected, (state) => {
        state.status = "error";
      }),
});

export const { setSearch, setStatus, setDescription, setMode, setSpecialtyCode, setTitle, refreshData, refreshState } = specialtySlice.actions;
export default specialtySlice.reducer;
