import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LoginState } from "./types";
import { convertToEnglishDigits } from "@/shared/lib/persianToEnglish";
import { loginThunk } from "./hooks";

const initialState: LoginState = {
  status: "idle",
  data: {
    username: "",
    password: "",
  },
};

const loginSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setStatus: (state, action: PayloadAction<(typeof state)["status"]>) => {
      state.status = action.payload;
    },
    setUsername: (state, action: PayloadAction<string>) => {
      state.data.username = convertToEnglishDigits(action.payload);
    },
    setPassword: (state, action: PayloadAction<string>) => {
      state.data.password = convertToEnglishDigits(action.payload);
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(loginThunk.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        if (action.payload) {
          const token = action.payload?.data?.token || action.payload?.token;
          if (token && typeof document !== "undefined") {
            const isSecure = location.protocol === "https:";
            document.cookie = `token=${token}; path=/; max-age=86400; SameSite=Lax${isSecure ? "; Secure" : ""}`;
          }
          state.status = "success";
          location.replace("/admin");
        }
        state.data.password = "";
      })
      .addCase(loginThunk.rejected, (state) => {
        state.status = "error";
      }),
});

export const { setStatus, setPassword, setUsername } = loginSlice.actions;
export default loginSlice.reducer;
