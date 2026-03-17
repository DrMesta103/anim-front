import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAllDoctorsthunk = createAsyncThunk("/doctor/getall", async () => {
  return await axios
    .get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/users/doctors`, { withCredentials: true })
    .then((res) => res.data.data)
    .catch(() => false);
});
