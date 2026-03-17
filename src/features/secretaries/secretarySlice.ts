import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SecretaryState, SecretaryDataType, Secretary } from "./types";
import ModeType from "@/shared/types/mode.type";
import { fetchAllSecretariesthunk } from "./hooks";
import { initialMode } from "@/shared/constants/mode.constant";

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
      state.search = action.payload;
    },
    setStatus: (state, action: PayloadAction<SecretaryState["status"]>) => {
      state.status = action.payload;
    },
    setMode: (state, action: PayloadAction<ModeType>) => {
      state.mode = action.payload;
    },
    setData: (state, action: PayloadAction<Partial<SecretaryDataType>>) => {
      state.data = { ...state.data, ...action.payload };
    },
    resetSecretaryForm: (state) => {
      state.mode = { method: "READ", id: null } as any;
      state.data = initialData;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllSecretariesthunk.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllSecretariesthunk.fulfilled, (state, action: PayloadAction<Secretary[]>) => {
        state.status = "success";
        if (action.payload) {
          state.secretaries = [...action.payload];
        }
      })
      .addCase(fetchAllSecretariesthunk.rejected, (state) => {
        state.status = "error";
      });
  },
});

export const { setSearch, setStatus, setMode, setData, resetSecretaryForm } = secretarySlice.actions;
export default secretarySlice.reducer;
