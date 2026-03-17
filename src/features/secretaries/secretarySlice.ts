import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Secretary, SecretaryState } from "./types";
import { fetchAllSecretariesthunk } from "./hooks";
import StatusType from "@/shared/types/status.type";
import { convertToEnglishDigits } from "@/shared/lib/persianToEnglish";

const initialState: SecretaryState = {
  status: "idle",
  secretaries: [],
  search: "",
};

const secretarySlice = createSlice({
  name: "secretary",
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
      }),
});

export const { setSearch, setStatus } = secretarySlice.actions;
export default secretarySlice.reducer;
