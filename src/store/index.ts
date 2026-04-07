import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "@/features/login/slice";
import adminSlice from "@/features/admin_panel/slice";
import specialtySlice from "@/features/specialties/specialtySlice";
import doctorSlice from "@/features/doctors/slice";
import roomSlice from "@/features/rooms/slice";
import secretarySlice from "@/features/secretaries/slice";
import patientSlice from "@/features/patients/slice";
import secretaryPanelSlice from "@/features/secretary_panel/slice";
import scheduleSlice from "@/features/schedules/slice";

export const store = configureStore({
  reducer: {
    login: loginSlice,
    admin: adminSlice,
    specialty: specialtySlice,
    doctor: doctorSlice,
    room: roomSlice,
    secretary: secretarySlice,
    patient: patientSlice,
    secretaryPanel: secretaryPanelSlice,
    schedules: scheduleSlice,
  },
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
