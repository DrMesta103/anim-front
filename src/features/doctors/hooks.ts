import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { DoctorDataType } from "./types";

export const fetchAllDoctorsthunk = createAsyncThunk("/doctor/getall", async () => {
  return await axios
    .get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/users/doctors`, { withCredentials: true })
    .then((res) => res.data.data)
    .catch(() => false);
});

export const addDoctorThunk = createAsyncThunk("/doctor/add", async (data: DoctorDataType) => {
  return await axios
    .post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/users/doctors`, data, { withCredentials: true })
    .then((res) => res.data)
    .catch(() => false);
});

export const updateDoctorThunk = createAsyncThunk("/doctor/update", async ({ id, data }: { id: string; data: DoctorDataType }) => {
  return await axios
    .put(`${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/users/doctors/${id}`, data, { withCredentials: true })
    .then((res) => res.data)
    .catch(() => false);
});

export const deleteDoctorThunk = createAsyncThunk("/doctor/delete", async (id: string) => {
  return await axios
    .delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/users/doctors/${id}`, { withCredentials: true })
    .then(() => id)
    .catch(() => false);
});
