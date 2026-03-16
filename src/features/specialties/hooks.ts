import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAllSpecialtiesthunk = createAsyncThunk("/specialty/getall", async () => {
  return await axios
    .get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/specialties`, { withCredentials: true })
    .then((res) => res.data.data)
    .catch(() => false);
});
