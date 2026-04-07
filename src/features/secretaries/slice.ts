import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SecretaryState, SecretaryDataType, Secretary } from "./types";
import ModeType from "@/shared/types/mode.type";
import { fetchAllSecretariesthunk, addSecretaryThunk, updateSecretaryThunk, deleteSecretaryThunk } from "./hooks";
import { initialMode } from "@/shared/constants/mode.constant";
import StatusType from "@/shared/types/status.type";
import { convertToEnglishDigits } from "@/shared/lib/persianToEnglish";

const initialData: SecretaryDataType = {
  username: "",
  password: "",
  phone: "",
  firstname: "",
  lastname: "",
};

const initialState: SecretaryState = {
  status: "idle",
  secretaries: [],
  search: "",
  mode: initialMode,
  data: initialData,
};

const secretarySlice = createSlice({
  name: "secretary",
  initialState,
  reducers: {
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = convertToEnglishDigits(action.payload);
    },
    setStatus: (state, action: PayloadAction<StatusType>) => {
      state.status = action.payload;
    },
    setMode: (state, action: PayloadAction<ModeType>) => {
      state.mode = action.payload;
    },
    setData: (state, action: PayloadAction<Partial<SecretaryDataType>>) => {
      state.data = { ...state.data, ...action.payload };
    },
    resetSecretaryForm: (state) => {
      state.mode = initialMode;
      state.data = initialData;
    },
    refreshData: (state) => {
      state.data = initialData;
    },
    refreshState: (state) => {
      state.data = initialData;
      state.mode = initialMode;
      state.secretaries = [];
      state.status = "idle";
      state.search = "";
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(fetchAllSecretariesthunk.fulfilled, (state, action: PayloadAction<Secretary[]>) => {
        state.status = "success";
        if (action.payload) {
          state.secretaries = [...action.payload];
        }
      })
      .addCase(addSecretaryThunk.fulfilled, (state, action: PayloadAction<Secretary>) => {
        if (action.payload) {
          state.secretaries.push(action.payload);
          state.mode = initialMode;
          state.data = initialData;
        }
      })
      .addCase(updateSecretaryThunk.fulfilled, (state, action: PayloadAction<Secretary>) => {
        if (action.payload) {
          state.secretaries = state.secretaries.map((secretary) => (secretary.id === action.payload.id ? action.payload : secretary));
          state.mode = initialMode;
          state.data = initialData;
        }
      })
      .addCase(deleteSecretaryThunk.fulfilled, (state, action: PayloadAction<any>) => {
        if (action.payload) {
          state.secretaries = state.secretaries.filter((s) => s.id !== action.payload);
          state.mode = initialMode;
          state.data = initialData;
        }
      }),
});

export const { setSearch, setStatus, setMode, setData, resetSecretaryForm, refreshData, refreshState } = secretarySlice.actions;
export default secretarySlice.reducer;
