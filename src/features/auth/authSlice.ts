import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthState } from "./types";
import { convertToEnglishDigits } from "@/shared/lib/persianToEnglish";

const initialState: AuthState = {
  type: "login",
  status: "idle",
  data: {
    firstname: "",
    lastname: "",
    phone: "",
    otp: ["", "", "", ""],
  },
  isCodeSent: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthType: (state, action: PayloadAction<(typeof state)["type"]>) => {
      state.type = action.payload;
    },
    setStatus: (state, action: PayloadAction<(typeof state)["status"]>) => {
      state.status = action.payload;
    },
    setIsCodeSent: (state, action: PayloadAction<(typeof state)["isCodeSent"]>) => {
      state.isCodeSent = action.payload;
    },
    setFirstname: (state, action: PayloadAction<(typeof state)["data"]["firstname"]>) => {
      state.data.firstname = action.payload;
    },
    setLastname: (state, action: PayloadAction<(typeof state)["data"]["lastname"]>) => {
      state.data.lastname = action.payload;
    },
    setPhone: (state, action: PayloadAction<(typeof state)["data"]["phone"]>) => {
      if (action.payload === "") {
        state.data.phone = "";
        return;
      }

      action.payload = convertToEnglishDigits(action.payload);

      if (isNaN(Number(action.payload))) return;

      if (action.payload[0] !== "0") action.payload = "0" + action.payload;

      if (action.payload.length > 1 && action.payload[1] !== "9") return;

      if (action.payload.length > 11) return;

      state.data.phone = action.payload;
    },
    setOtp: (state, action: PayloadAction<{ value: string; index: number }>) => {
      if (action.payload.value === "") {
        if (state.data.otp[action.payload.index] === "") {
          state.data.otp[action.payload.index - 1] = "";
          document.getElementById(`otp_${action.payload.index - 1}`)?.focus();
          return;
        }
        state.data.otp[action.payload.index] = "";
        return;
      }

      action.payload.value = convertToEnglishDigits(action.payload.value);
      const { index, value } = action.payload;
      if (value.length > 1) return;

      state.data.otp[index] = value;

      if (index < 3) {
        document.getElementById(`otp_${index + 1}`)?.focus();
      }
    },
    removeOtp: (state, action: PayloadAction<number>) => {
      if (state.data.otp[action.payload] === "") {
        state.data.otp[action.payload - 1] = "";
        document.getElementById(`otp_${action.payload - 1}`)?.focus();
        return;
      }
      state.data.otp[action.payload] = "";
    },
  },
});

export const { setAuthType, setFirstname, setIsCodeSent, setLastname, setPhone, setStatus, setOtp, removeOtp } = authSlice.actions;
export default authSlice.reducer;
