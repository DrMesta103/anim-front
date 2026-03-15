import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "@/features/login/loginSlice";

export const store = configureStore({
  reducer: {
    login: loginSlice,
  },
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
