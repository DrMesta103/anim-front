import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Specialty, SpecialtyState } from "./types";
import { fetchAllSpecialtiesthunk } from "./hooks";
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

export const { setSearch, setStatus, setDescription, setMode, setSpecialtyCode, setTitle } = specialtySlice.actions;
export default specialtySlice.reducer;
