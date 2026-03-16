import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "@/features/login/loginSlice";
import adminSlice from "@/features/admin_panel/adminSlice";
import specialtySlice from "@/features/specialties/specialtySlice";

export const store = configureStore({
  reducer: {
    login: loginSlice,
    admin: adminSlice,
    specialty: specialtySlice,
  },
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
