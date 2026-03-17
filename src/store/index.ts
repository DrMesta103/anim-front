import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "@/features/login/loginSlice";
import adminSlice from "@/features/admin_panel/adminSlice";
import specialtySlice from "@/features/specialties/specialtySlice";
import doctorSlice from "@/features/doctors/doctorSlice";
import roomSlice from "@/features/rooms/roomSlice";
import secretarySlice from "@/features/secretaries/secretarySlice";

export const store = configureStore({
  reducer: {
    login: loginSlice,
    admin: adminSlice,
    specialty: specialtySlice,
    doctor: doctorSlice,
    room: roomSlice,
    secretary: secretarySlice,
  },
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
