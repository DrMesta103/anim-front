import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthState } from "./types";

const initialState: AuthState = {
  type: "login",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthType: (state, action: PayloadAction<"login" | "register">) => {
      state.type = action.payload;
    },
  },
});

export const { setAuthType } = authSlice.actions;
export default authSlice.reducer;
